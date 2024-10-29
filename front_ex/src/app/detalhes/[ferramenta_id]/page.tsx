// "use client"
// import { CarroI } from "@/utils/types/ferramentas";
// import { FotoI } from "@/utils/types/fotos";
// import { useParams } from "next/navigation"
// import { useEffect, useState } from "react";
// import { useClienteStore } from "@/context/cliente";
// import { useForm } from "react-hook-form"
// import { toast } from 'sonner'

// type Inputs = {
//   descricao: string
// }

// export default function Detalhes() {
//   const params = useParams()
//   const { cliente } = useClienteStore()

//   const [carro, setCarro] = useState<CarroI>()
//   const [fotos, setFotos] = useState<FotoI[]>([])

//   const { register, handleSubmit, reset } = useForm<Inputs>()

//   useEffect(() => {
//     async function buscaDados() {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/carros/${params.carro_id}`)
//       const dados = await response.json()
//       // console.log(dados)
//       setCarro(dados)
//     }
//     buscaDados()

//     async function buscaFotos() {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/fotos/${params.carro_id}`)
//       const dados = await response.json()
//       setFotos(dados)
//     }
//     buscaFotos()
//   }, [])

//   const listaFotos = fotos.map(foto => (
//     <div>
//       <img className="h-auto max-w-80 rounded-lg"
//         src={`data:image/jpg;base64, ${foto.codigoFoto}`}
//         alt={foto.descricao}
//         title={foto.descricao} />
//     </div>
//   ))

//   async function enviaProposta(data: Inputs) {

//     const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/propostas`, {
//       headers: {
//         "Content-Type": "application/json"
//       },
//       method: "POST",
//       body: JSON.stringify({
//         clienteId: cliente.id,
//         carroId: Number(params.carro_id),
//         descricao: data.descricao
//       })
//     })

//     if (response.status == 201) {
//       toast.success("Obrigado. Sua proposta foi enviada. Aguarde retorno")
//       reset()
//     } else {
//       toast.error("Erro... Não foi possível enviar sua proposta")
//     }
//   }

//   return (
//     <>
//       <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
//         <img className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
//           src={carro?.foto} alt="Foto do Carro" />
//         <div className="flex flex-col justify-between p-4 leading-normal">
//           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//             {carro?.marca.nome} {carro?.modelo}
//           </h5>
//           <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
//             Ano: {carro?.ano} - {carro?.km.toLocaleString("pt-br")} km
//           </h5>
//           <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
//             Preço R$: {Number(carro?.preco)
//               .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
//           </h5>
//           <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//             {carro?.acessorios}
//           </p>

//           {cliente.id ?
//             <>
//               <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Gostou deste Veículo? Faça uma Proposta!</h3>
//               <form onSubmit={handleSubmit(enviaProposta)}>
//                 <input type="text" className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${cliente.nome} (${cliente.email})`} disabled readOnly />
//                 <textarea id="message" className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
//                   placeholder="Descreva a sua proposta" 
//                   required
//                   {...register("descricao")}></textarea>
//                 <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar Proposta</button>
//               </form>
//             </>
//             :
//             <h3 className="text-xl font-bold tracking-tight text-orange-700 dark:text-white">** Faça login para fazer proposta para este veículo</h3>
//           }

//         </div>
//       </section>

//       <div className="mt-4 md:max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
//         {listaFotos}
//       </div>

//     </>
//   )
// }

"use client"
import { useParams } from "next/navigation"

import { Ferramenta } from "@/utils/types/ferramentas"; // Alterado para FerramentaI
import { FotoI } from "@/utils/types/fotos";

import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";

import { useForm } from "react-hook-form"
import { toast } from 'sonner'

import { Comentario } from "@/utils/types/comentarios";

import Comentarios from "./comentarios";


type Inputs = {
  descricao: string
}

export default function Detalhes() {
  const params = useParams()
  const { cliente } = useClienteStore()

  const [ferramenta, setFerramenta] = useState<Ferramenta>() // Alterado para ferramenta
  const [fotos, setFotos] = useState<FotoI[]>([])
  //const [avaliacao, setAvaliacao] = useState<Avaliacao[]>([])
  const [avaliacao, setAvaliacao] = useState<Comentario[]>([])
  const [resultado, setResultado] = useState<Comentario[]>([]);
 

  //const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas/${params.ferramenta_id}`) // Alterado para ferramentas
      const dados = await response.json()
      setFerramenta(dados)
    }
    buscaDados()
    console.log(ferramenta);


    async function buscaFotos() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/fotos/${params.ferramenta_id}`) // Alterado para ferramentas
      const dados = await response.json()

      setFotos(dados)
    }
    buscaFotos()
    console.log(fotos);

    async function buscaAvaliacao() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacao/${params.ferramenta_id}`) // Alterado para ferramentas
      const dados = await response.json()

      setAvaliacao(avaliacao)

      setResultado(resultado);
  
       
    }
    buscaAvaliacao()
    console.log(avaliacao);
  }, [params.ferramenta_id])


  const listaFotos = fotos.map((foto) => (
    <div key={foto.id}>
      <img className="h-auto max-w-80 rounded-lg"
        src={`data:image/jpg;base64, ${foto.codigoFoto}`}
        alt={foto.descricao}
        title={foto.descricao} />
    </div>
  ));
  const listaAvaliacao = avaliacao.map((avaliacao) => (
    <div key={avaliacao.id}>
      <p>{avaliacao.comentario}</p> {/* Alterado */}
      <p>{avaliacao.estrelas} estrelas</p> {/* Alterado */}
    </div>
  ));
  const listaEstrelas = (
    <div className="flex items-center space-x-1 rtl:space-x-reverse">
  {[...Array(Math.floor(resultado.mediaEstrelas))].map((_, index) => (
    <svg key={index} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="(link unavailable)" fill="currentColor" viewBox="0 0 22 20">
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  ))}
  {resultado.mediaEstrelas % 1 !== 0 && (
    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="(link unavailable)" fill="currentColor" viewBox="0 0 22 20">
      <path d="M15.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-2.515-.367a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-2.515.367A1.535 1.535 0 0 0 1.463 9.2l1.828 1.828.863-5.031a1.532 1.532 0 0 0 2.226 1.616L5 12.258l2.258 1.172a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L8.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  )}
  {[...Array(5 - Math.ceil(resultado.mediaEstrelas))].map((_, index) => (
    <svg key={index} className="w-4 h-4 text-gray-300" aria-hidden="true" xmlns="(link unavailable)" fill="currentColor" viewBox="0 0 22 20">
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  ))}
</div>
)
  



  return (
    <>
      <section >
        <div className=" mt-6 mx-auto border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl ">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
            src={ferramenta?.foto}
            alt="Foto da Ferramenta"
          /> {/* Alterado para ferramenta */}
          <div className="flex flex-col justify-between p-4 leading-normal">

            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                {ferramenta?.fabricante.nome} {ferramenta?.modelo}
              </h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 ">
                Ano: {ferramenta?.ano} - {ferramenta?.quantidadeEmEstoque} Estoque
              </h5><hr />
            </div>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {listaEstrelas}

              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"></span>
            </div>
            <h5 className="mb-2 text-3xl font-semibold tracking-tight text-gray-900 ">
              Preço R$: {Number(ferramenta?.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {ferramenta?.acessorios}
            </p>
          </div>
          <div>
            {cliente.id ? (
              <Comentarios />

            ) : (

              <h3 className="text-xl font-bold tracking-tight text-orange-700 ">
                ** Faça login para deixar um comentario</h3>
            )
            }

          </div>
        </div>
      </section>

      <div className="mt-4 md:max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {listaFotos}
      </div>
      <div className="mt-4 md:max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {listaAvaliacao}
      </div>

    </>
  )
}
