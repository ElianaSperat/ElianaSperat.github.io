import Usuario from "../models/usuarios_models.js"
import bcrypt from 'bcrypt';

async function obtenerUsuarios() {
    let usuarios = await Usuario.find()
    return usuarios;
}

async function crearUsuarios(body){
    let usuario = new Usuario ({
        nombre: body.nombre,
        apellido: body.apellido,
        mail: body.mail,
        contrasena: body.contrasena,
    })
    return await usuario.save();
}

async function actualizarUsuario(id, body){
    let usuario = await Usuario.findByIdAndUpdate( id, {
        $set: {
            nombre: body.nombre,
            contrasena: body.contrasena
        }
    });
    
    return usuario;
}

async function obtenerUsuarioPorId(idUsuario) {
    let usuario = await Usuario.findById(idUsuario);
    return usuario;
}

export {
    obtenerUsuarios,
    crearUsuarios,
    actualizarUsuario,
    obtenerUsuarioPorId
}