import express from 'express'
import cors from 'cors'

import fabricantesRoutes from './routes/fabricante'
import ferramentasRoutes from './routes/ferramentas'
import fotosRoutes from './routes/fotos'
import clientesRoutes from './routes/clientes'
import OrdemDeComprasRoutes from './routes/OrdemDeCompra'

const app = express()
const port = 3004

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/fabricante", fabricantesRoutes)
app.use("/ferramentas", ferramentasRoutes)
app.use("/fotos", fotosRoutes)
app.use("/clientes", clientesRoutes)
app.use("/OrdemDeCompra", OrdemDeComprasRoutes)


app.get('/', (req, res) => {
  res.send('API: Sistema de Controle de Ferramentas')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})