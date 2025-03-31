import express from "express";
import { obtenerDestinos, obtenerDestinoPorId, crearDestino, actualizarDestino, eliminarDestino } from "../controllers/destinos_controllers.js";
import Joi from "joi"
import verificarToken from "../middlewares/auth.js"

const ruta = express.Router();

const schema = Joi.object({
	destino: Joi.string().min(3).max(50).required(),
	fechaInicio: Joi.date().iso().required(),
	fechaFin: Joi.date().iso().min(Joi.ref('fechaInicio')).required(),
	presupuestoTotal: Joi.number().positive().required(),
	nombreDelViaje: Joi.string().min(3).max(50).required(),
	idUsuarios: Joi.array().items(Joi.string().min(3).max(50)).required()
});

ruta.get('/', verificarToken, (req, res) => {
	let resultado = obtenerDestinos();
	resultado.then(destinos => {
		res.json({ destinos })
	})
		.catch(err => {
			res.status(400).json({ err })
		})
});

ruta.post('/', (req, res) => {
	let body = req.body;

	const { error, value } = schema.validate({
		destino: body.destino,
		fechaInicio: body.fechaInicio,
		fechaFin: body.fechaFin,
		presupuestoTotal: body.presupuestoTotal,
		nombreDelViaje: body.nombreDelViaje,
		idUsuarios: body.idUsuarios
	});

	if (!error) {
		let resultado = crearDestino(body);
		resultado
			.then(destino => {
				res.json({ destino });
			})
			.catch(err => {
				res.status(400).json({ err });
			});
	} else {
		res.status(400).json(error);
	}
});

ruta.get('/:id', (req, res) => {
	let id = req.params.id;

	obtenerDestinoPorId(id)
        .then(destino => {
            res.json(destino);
        })
        .catch(error => {
            res.status(400).json({ error: error.message });
        });
});

ruta.put('/:id', (req, res) => {
	let body = req.body;
	let resultado = actualizarDestino(req.params.id, body)
	resultado
		.then(destino => {
			res.json(destino)
		})
		.catch(error => {
			res.status(400).json({ error })
		})
})

ruta.delete('/:id', (req, res) => {
	const id = req.params.id;
	eliminarDestino(id)
		.then(destinoEliminado => {
			res.json(destinoEliminado);
		})
		.catch(error => {
			res.status(400).json({ error: error.message });
		});
});

export default ruta;
