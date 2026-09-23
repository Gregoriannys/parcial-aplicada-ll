import { Router} from "express";
import { pedirPrestado } from "../controllers/prestamos.controller.js"
import { verificarToken} from "../middlewares/auth.middleware.js"

const router = Router()
router.post("/", verificarToken, pedirPrestado)
export default router