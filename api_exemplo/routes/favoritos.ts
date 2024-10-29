import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()

const router = Router()
router.post("/", async (req, res) => {
    const { clienteId, ferramentaId} = req.body;
  
    if (!clienteId || !ferramentaId ) {
      res.status(400).json({ erro: "Informe clienteId, ferramentaId e descricao" });
      return;
    }
  
    try {
      const favorito = await prisma.favorito.create({
        data: {
          cliente: {
            connect: { id: clienteId }
          },
          ferramenta: {
            connect: { id: ferramentaId }
          }
    
        }
      });
  
      res.status(201).json(favorito);
    } catch (error) {
      res.status(400).json(error);
    }
  });
  export default router;