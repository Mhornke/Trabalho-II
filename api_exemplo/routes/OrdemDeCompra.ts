import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import nodemailer from "nodemailer"

const prisma = new PrismaClient()
const router = Router()
// Rota para listar todas as ordens de compra
// router.get("/", async (req, res) => {
//   try {
//     const propostas = await prisma.proposta.findMany({
//       include: {
//         cliente: true,
//         carro: true
//       }
//     })
//     res.status(200).json(propostas)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// router.post("/", async (req, res) => {
//   const { clienteId, carroId, descricao } = req.body

//   if (!clienteId || !carroId || !descricao) {
//     res.status(400).json({ erro: "Informe clienteId, carroId e descricao" })
//     return
//   }

//   try {
//     const proposta = await prisma.proposta.create({
//       data: { clienteId, carroId, descricao }
//     })
//     res.status(201).json(proposta)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// async function enviaEmail(nome: string, email: string,
//   descricao: string, resposta: string) {

//   const transporter = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "968f0dd8cc78d9",
//       pass: "89ed8bfbf9b7f9"
//     }
//   });

//   const info = await transporter.sendMail({
//     from: 'edeciofernando@gmail.com', // sender address
//     to: email, // list of receivers
//     subject: "Re: Proposta Revenda Avenida", // Subject line
//     text: resposta, // plain text body
//     html: `<h3>Estimado Cliente: ${nome}</h3>
//            <h3>Proposta: ${descricao}</h3>
//            <h3>Resposta da Revenda: ${resposta}</h3>
//            <p>Muito obrigado pelo seu contato</p>
//            <p>Revenda Avenida</p>`
//   });

//   console.log("Message sent: %s", info.messageId);
// }

// router.patch("/:id", async (req, res) => {
//   const { id } = req.params
//   const { resposta } = req.body

//   if (!resposta) {
//     res.status(400).json({ "erro": "Informe a resposta desta proposta" })
//     return
//   }

//   try {
//     const proposta = await prisma.proposta.update({
//       where: { id: Number(id) },
//       data: { resposta }
//     })

//     const dados = await prisma.proposta.findUnique({
//       where: { id: Number(id) },
//       include: {
//         cliente: true
//       }
//     })

//     enviaEmail(dados?.cliente.nome as string,
//       dados?.cliente.email as string,
//       dados?.descricao as string,
//       resposta)

//     res.status(200).json(proposta)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// router.get("/:clienteId", async (req, res) => {
//   const { clienteId } = req.params
//   try {
//     const propostas = await prisma.proposta.findMany({
//       where: { clienteId },
//       include: {
//         carro: true
//       }
//     })
//     res.status(200).json(propostas)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })


router.get("/", async (req, res) => {
  try {
    const ordensDeCompra = await prisma.ordemDeCompra.findMany({
      include: {
        cliente: true,
        ferramenta: true // Alterado para 'ferramenta'
      }
    });
    res.status(200).json(ordensDeCompra);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Rota para criar uma nova ordem de compra
router.post("/", async (req, res) => {
  const { clienteId, ferramentaId, descricao } = req.body; // Alterado para 'ferramentaId'

  if (!clienteId || !ferramentaId || !descricao) {
    res.status(400).json({ erro: "Informe clienteId, ferramentaId e descricao" });
    return;
  }

  try {
    const ordemDeCompra = await prisma.ordemDeCompra.create({
      data: { clienteId, ferramentaId, descricao } // Alterado para 'ferramentaId'
    });
    res.status(201).json(ordemDeCompra);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Função para enviar email de resposta
async function enviaEmail(nome: string, email: string, descricao: string, resposta: string) {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
      user: "968f0dd8cc78d9",
      pass: "89ed8bfbf9b7f9"
    }
  });

  const info = await transporter.sendMail({
    from: 'edeciofernando@gmail.com', // Endereço do remetente
    to: email, // Destinatário
    subject: "Re: Ordem de Compra Revenda Avenida", // Assunto
    text: resposta, // Texto simples
    html: `<h3>Estimado Cliente: ${nome}</h3>
           <h3>Ordem de Compra: ${descricao}</h3>
           <h3>Resposta da Revenda: ${resposta}</h3>
           <p>Muito obrigado pelo seu contato</p>
           <p>Revenda Avenida</p>`
  });

  console.log("Message sent: %s", info.messageId);
}

// Rota para responder uma ordem de compra
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { resposta } = req.body;

  if (!resposta) {
    res.status(400).json({ erro: "Informe a resposta desta ordem de compra" });
    return;
  }

  try {
    const ordemDeCompra = await prisma.ordemDeCompra.update({
      where: { id: Number(id) },
      data: { resposta }
    });

    const dados = await prisma.ordemDeCompra.findUnique({
      where: { id: Number(id) },
      include: {
        cliente: true
      }
    });

    enviaEmail(dados?.cliente.nome as string, dados?.cliente.email as string, dados?.descricao as string, resposta);

    res.status(200).json(ordemDeCompra);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Rota para listar todas as ordens de compra de um cliente específico
router.get("/:clienteId", async (req, res) => {
  const { clienteId } = req.params;
  try {
    const ordensDeCompra = await prisma.ordemDeCompra.findMany({
      where: { clienteId },
      include: {
        ferramenta: true // Alterado para 'ferramenta'
      }
    });
    res.status(200).json(ordensDeCompra);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router