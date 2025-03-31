import express from "express";
import Usuarios from "../models/usuarios_models.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const ruta = express.Router()

ruta.post('/', (req, res) =>{
    Usuarios.findOne({mail: req.body.mail})
    .then(data => {
        if(data){
            // contrasena: bcrypt.hashSync(req.body.contrasena, 10)
            const contValida = (req.body.contrasena == data.contrasena)
            if(!contValida)
                return res.status(400).json({msg: 'Contraseña Incorrecta.'})
            const jwToken = jwt.sign({
                usuario: {_id:data._id, nombre:data.nombre, mail:data.mail},
            }, process.env.SEED, {expiresIn: process.env.EXPIRATION})

            res.json({
                usuario: {
                    _id:data._id,
                    nombre:data.nombre,
                    mail:data.mail
                }, jwToken
            })
        }else{
            res.status(400).json({msg: 'Mail Incorrecto.'})
        }
    })
});

export default ruta;
