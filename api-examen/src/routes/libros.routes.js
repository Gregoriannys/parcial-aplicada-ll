import { Router } from "express"
import { getLibros, createLibro} from "../controllers/libros.controller.js"
import { verificarToken } from "../middlewares/auth.middleware.js"

const router = Router()
router.get("/", verificarToken, getLibros)
router.post("/", verificarToken, createLibro)

export default router