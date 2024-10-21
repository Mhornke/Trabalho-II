import { Ferramenta } from "./ferramentas"

export interface OrdemDeCompraI {
  id: number
  clienteId: string
  FerramenteId: number
  Ferramenta: Ferramenta
  descricao: string
  resposta: string | null
  createdAt: string
  updatedAt: string | null
}