import jwt from "jsonwebtoken";
import { prisma} from "../db.js"
import bcrypt from "bcryptjs"

export const registro = async (req, res) => {
    const { nombre, email, password } = req.body

    if(!nombre || !email || !password){
        return res.status(400).json({ error: "Datos faltantes" })

    }

    const existe = await prisma.Usuario.findUnique({ where: { email}})
    if(existe) return res.status(400).json({error: "Email ya registrado"})

        const hash = await bcrypt.hash(password, 10)
        const usuario = await prisma.usuario.Create({
            data: { nombre, email, password: hash}
        })
    
    res.status(201).json({ id: usuario.id, email: usuario.email})

}

export const login = async (req, res) => {
    const { email, password} = req.body
    if(!email || !password){
        return res.status(400).json({ error: "Datos faltantes"})

    }

    const usuario = await prisma.usuario.findUnique({ where: { email}})
    if(!usuario || !(await bcrypt.compare(password, usuario.password))) {
        return res.status(401).json({ error: "Credenciales invalidas"})

    }

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol},
        process.env.JWT_SECRET, { expiresIn: "2h"}

    )
    res.json({ token })
}