import "dotenv/config";
import jwt from "jsonwebtoken";

let verificarToken = (req, res, next) => {
    let token = req.get('auth');
    jwt.verify(token, process.env.SEED, (error, decoded) => {
        if (error) {
            res.status(400).json("No autenticado")
        }
        req.usuario = decoded.usuario;
        next()
    })
}

export default verificarToken;