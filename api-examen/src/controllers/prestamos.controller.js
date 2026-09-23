import { prisma} from "../db.js"

export const pedirPrestamos = async (req, res) =>{
    const { libroId} = req.body
    if(!libroId) return res.status(400).json({ error: "libroId es obligatorio"})

        const libro = await prisma.libro.findUnique({ where: { id: Number(libroId)}})
        if(!libro ) return res.status(400).json({ error: "Libro no encontrado"})
        if(!libro.disponible) return res.status(400).json({error: "Libro no disponible"})
     
            const prestamo = await prisma.prestamo.create({
                data: {usuarioId: req.usuario.id, libroId: libro.id}

            })
           await prisma.libro.update({where: {id: libro.id}, data: {disponible: false} })
           return res.status(201).json(prestamo)


}