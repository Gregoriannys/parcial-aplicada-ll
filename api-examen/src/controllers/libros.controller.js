
import { prisma} from "../db.js"

export const getLibros = async (req, res) => {
    const libros = await prisma.libro.findMany()
    res.json(libros)
}

export const createLibro = async (req, res) => {
    const {titulo, autor} = req.body
    if(!titulo || !autor) return res.status(400).json({error: "titulo y autor son obligatorios"})


}

const libro = await prisma.libro.create({data: {titulo, autor}})
res.status(201).json(libro)