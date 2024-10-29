"use client"
import { Ferramenta } from "@/utils/types/ferramentas";
import { Comentario } from "@/utils/types/comentarios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

type Inputs = {
  descricao: string
}
//const params = useParams()



export default function Comentarios() {
  const params = useParams()
  const { cliente } = useClienteStore()

  const [ferramenta, setFerramenta] = useState<Ferramenta>()
  //const [avaliacao, setAvaliacao] = useState<Comentario[]>([])

  const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas/${params.ferramenta_id}`) // Alterado para ferramentas
      const dados = await response.json()
      setFerramenta(dados)
    }
    buscaDados()
    console.log(ferramenta);



  }, [params.ferramenta_id])




  async function enviaAvaliacao(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacao`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        clienteId: cliente.id,
        ferramentaId: Number(params.ferramenta_id),
      })
    })

    if (response.status === 201) {
      toast.success("Obrigado. Sua proposta foi enviada. Aguarde retorno")
      reset()
    } else {
      toast.error("Erro... Não foi possível enviar sua proposta")
    }
  }

  return (
    <>
      <h3 className="text-xl font-bold tracking-tight text-gray-900">
        Deixe seu comentario!
      </h3> {/* Alterado */}
      <form onSubmit={handleSubmit(enviaAvaliacao)}>
        <input type="checkbox" name="estrela1" id="estrelaAvaliacao1" />
        <input type="checkbox" name="estrela2" id="estrelaAvaliacao2" />
        <input type="checkbox" name="estrela3" id="estrelaAvaliacao3" />
        <input type="checkbox" name="estrela4" id="estrelaAvaliacao4" />
        <input type="checkbox" name="estrela5" id="estrelaAvaliacao5" />
        <h3 className="mb-2 mt-4 bg-gray-100 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed " value={`${cliente.nome} (${cliente.email})`} disabled readOnly >{cliente.nome}</h3>
        <textarea
          id="message"
          className="mb-2 block p-2.5 w-full text-sm text-gray-900 
                bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
                 focus:border-blue-500 "
          placeholder="Descreva seu comentario"
          required
          {...register("descricao")}>

        </textarea>
        <button type="submit"
          className="text-white bg-blue-700
                 hover:bg-blue-800 focus:ring-4 focus:outline-none
                  focus:ring-blue-300 
                 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
                  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Enviar Avaliação
        </button>
      </form>

    </>
  )

} 