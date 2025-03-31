import Gasto from "../models/gastos_models.js"
import { actualizarPresupuestoRestante } from "../controllers/destinos_controllers.js";

async function obtenerGastos(idDestino) {
    let gasto = await Gasto.find({ idDestino: idDestino });
    return gasto;
}

async function obtenerGastoPorId(idGasto) {
    let gasto = await Gasto.findById(idGasto);
    return gasto;
}

async function crearGasto(body) {
    let gasto = new Gasto({
        descripcion: body.descripcion,
        monto: body.monto,
        fecha: body.fecha,
        idUsuario: body.idUsuario,
        idDestino: body.idDestino,
    });
    await gasto.save();
    await actualizarPresupuestoRestante(gasto.idDestino); 

    return gasto;
}

async function actualizarGasto(idGasto, body) {
    let gasto = await Gasto.findByIdAndUpdate(idGasto, body, { new: true });
    if (gasto) await actualizarPresupuestoRestante(gasto.idDestino);
    return gasto;
}

async function eliminarGasto(idGasto) {
    let gasto = await Gasto.findByIdAndDelete(idGasto);
    if (gasto) await actualizarPresupuestoRestante(gasto.idDestino);
    return gasto;
}

export {
    obtenerGastos,
    obtenerGastoPorId,
    crearGasto,
    actualizarGasto,
    eliminarGasto,
}