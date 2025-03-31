import Destino from "../models/destinos_models.js"
import Gasto from "../models/gastos_models.js";

async function obtenerDestinos() {
    // Hacer filtro para que traiga solo los trips de ese usuario
    let destino = await Destino.find()
    return destino;
}

async function obtenerDestinoPorId(id) {
    const destino = await Destino.findById(id);
    if (!destino) {
        return 'Destino no encontrado.';
    }
    let gastos = await Gasto.find({ idDestino: id });
    let totalGastos = gastos.reduce((total, gasto) => total + gasto.monto, 0);
    destino.presupuestoRestante = destino.presupuestoTotal - totalGastos;
    return destino;
}

async function crearDestino(body) {
    let destino = new Destino({
        destino: body.destino,
        fechaInicio: body.fechaInicio,
        fechaFin: body.fechaFin,
        presupuestoTotal: body.presupuestoTotal,
        nombreDelViaje: body.nombreDelViaje,
        idUsuarios: body.idUsuarios
    });
    await destino.save();
    return destino;
}

async function buscarPorId(id){
    const destino = await Destino.findById(id);
    if(!destino){
        return ('Destino no encontrado.')
    }
    
    return destino;
}

async function actualizarDestino(id, body){
    let destino = await Destino.findByIdAndUpdate(id, {
        $set: {
            destino: body.destino,
            fechaInicio: body.fechaInicio,
            fechaFin: body.fechaFin,
            presupuestoTotal: body.presupuestoTotal,
            nombreDelViaje: body.nombreDelViaje,
            idUsuarios: body.idUsuarios
        }
    }, { new: true });

    return destino;
}

async function actualizarPresupuestoRestante(idDestino) {
    const destino = await Destino.findById(idDestino);
    if (!destino) {
        throw new Error('Destino no encontrado');
    }

    const gastos = await Gasto.find({ idDestino });
    const totalGastos = gastos.reduce((total, gasto) => total + gasto.monto, 0);

    destino.presupuestoRestante = destino.presupuestoTotal - totalGastos;
    await destino.save();
}

async function eliminarDestino(id){
    const destinoEliminado = await Destino.findByIdAndDelete(id);
    if (!destinoEliminado) {
        return ('Destino no encontrado.');
    }
    return destinoEliminado;
}

export {
    obtenerDestinos,
    obtenerDestinoPorId,
    crearDestino,
    buscarPorId,
    actualizarDestino,
    eliminarDestino,
    actualizarPresupuestoRestante
}