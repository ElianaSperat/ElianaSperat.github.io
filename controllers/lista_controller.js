import Lista from "../models/lista_models.js";

async function obtenerLista(idDestino) {
	return await Lista.find({ idDestino });
}

async function obtenerItem(idItem) {
    return await Lista.findById(idItem);
}

async function crearElementoLista(body) {
	const elemento = new Lista({
		nombreItem: body.nombreItem,
		asignadoA: body.asignadoA,
		fechaLimite: body.fechaLimite,
		estado: body.estado,
		idDestino: body.idDestino,
	});
	await elemento.save();
	return elemento;
}

async function editarItem(id, nuevosDatos) {
    return await Lista.findByIdAndUpdate(id, nuevosDatos, { new: true });
}

async function eliminarElementoLista(id) {
	return await Lista.findByIdAndDelete(id);
}

export {
	obtenerLista,
	crearElementoLista,
	editarItem,
	eliminarElementoLista,
	obtenerItem,
};
