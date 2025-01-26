import express from "express";
import {
    registrar, 
    perfil, 
    confirmar, 
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
} from "../controllers/veterinarioController.js"
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

//área pública
router.post('/',registrar);
router.get("/perfil",perfil);
router.get('/confirmar/:token',confirmar);
router.post('/olvide-password', olvidePassword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:tokrn', nuevoPassword);

//área privada
router.post('/login',checkAuth, autenticar);

    
export default router;