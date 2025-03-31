import express from "express"
import { obtenerUsuarios, crearUsuarios, actualizarUsuario, obtenerUsuarioPorId } from "../controllers/usuarios_controllers.js";
import Joi from "joi"
import jwt from "jsonwebtoken";

const ruta = express.Router();

const schema = Joi.object({
    nombre: Joi.string().alphanum().min(3).max(15).required(),
    contrasena: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    mail: Joi.string().email({minDomainSegments: 2, tlds: {allow: ["com", "net", "org", "edu"]}}),
    apellido: Joi.string().alphanum().min(3).max(15).required(),
    contrasena: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

ruta.get('/', (req, res) => {
    let resultado = obtenerUsuarios()
    resultado
    .then(usuarios => {
        res.json({usuarios})
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.get('/:idUsuario', (req, res) => {
    let idUsuario = req.params.idUsuario;
    let resultado = obtenerUsuarioPorId(idUsuario);

    resultado.then(usuario => {
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(usuario);
    })
    .catch(err => {
        res.status(400).json({err});
    });
});


ruta.post('/', async (req, res) => {
    let body = req.body;

    const {error, value} = schema.validate({
        nombre: body.nombre,
        apellido: body.apellido,
        mail: body.mail,
        contrasena: body.contrasena
    })

    if(!error){
        try{
            const nuevoUsuario = await crearUsuarios(body);
            const jwToken = jwt.sign(
                { usuario: { _id: nuevoUsuario._id, nombre: nuevoUsuario.nombre, mail: nuevoUsuario.mail } },
                process.env.SEED,
                { expiresIn: process.env.EXPIRATION }
            );

            res.json({usuario: nuevoUsuario, jwToken});
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }else{
        res.status(400).json(error)
    }
})

ruta.put('/:idUsuario', (req, res) => {
    let body = req.body;
    let resultado = actualizarUsuario(req.params.id, body)
    resultado
    .then(usuario => {
        res.json(usuario)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

export default ruta;