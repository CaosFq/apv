import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Extraer el token
            token = req.headers.authorization.split(" ")[1];

            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscar el veterinario y excluir la contraseña, token y confirmado
            const veterinario = await Veterinario.findById(decoded.id).select(
                "-password -token -confirmado"
            );

            if (!veterinario) {
                const error = new Error("Veterinario no encontrado");
                return res.status(404).json({ msg: error.message });
            }

            // Asignar el veterinario al objeto req
            req.veterinario = veterinario;

            return next(); // Pasar al siguiente middleware o controlador
        } catch (error) {
            const e = new Error("Token inválido");
            return res.status(403).json({ msg: e.message });
        }
    }

    if (!token) {
        const error = new Error("Token no válido o inexistente");
        return res.status(403).json({ msg: error.message });
    }
};

export default checkAuth;

