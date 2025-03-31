import express from "express";
import { obtenerGastos, crearGasto, obtenerGastoPorId, actualizarGasto, eliminarGasto } from "../controllers/gastos_controllers.js";
import Joi from "joi"

const ruta = express.Router();

const schema = Joi.object({
    descripcion: Joi.string().min(3).max(50).required(),
    monto: Joi.number().required(),
    fecha: Joi.date().iso().required(),
    idUsuario: Joi.string().min(3).max(50).required(),
    idDestino: Joi.string().min(3).max(50).required(),
});


ruta.get('/:idDestino', (req, res) => {
    let idDestino = req.params.idDestino;
    let resultado = obtenerGastos(idDestino);

    resultado.then(gastos => {
        res.json({ gastos });
    })
        .catch(err => {
            res.status(400).json({ err });
        });
});

ruta.get('/detalle/:idGasto', (req, res) => {
    let idGasto = req.params.idGasto;
    let resultado = obtenerGastoPorId(idGasto);

    resultado.then(gasto => {
        if (!gasto) {
            return res.status(404).json({ error: "Gasto no encontrado" });
        }
        res.json(gasto);
    })
        .catch(err => {
            res.status(400).json({ err });
        });
});

ruta.put('/:idGasto', (req, res) => {
    let idGasto = req.params.idGasto;
    let body = req.body;

    const { error, value } = schema.validate(body);

    if (!error) {
        let resultado = actualizarGasto(idGasto, body);
        resultado
            .then(gasto => {
                res.json(gasto);
            })
            .catch(err => {
                res.status(400).json({ err });
            });
    } else {
        res.status(400).json(error);
    }
});

ruta.post('/', async (req, res) => {
    let body = req.body;

    const { error, value } = schema.validate({
        descripcion: body.descripcion,
        monto: body.monto,
        fecha: body.fecha,
        idUsuario: body.idUsuario,
        idDestino: body.idDestino
    });

    if (!error) {
        try {
            let gasto = await crearGasto(body);
            res.status(201).json(gasto);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    } else {
        res.status(400).json({ error: error.details[0].message });
    }
});

ruta.delete('/:idGasto', (req, res) => {
    let idGasto = req.params.idGasto;
    let resultado = eliminarGasto(idGasto);

    resultado
        .then(gasto => {
            if (!gasto) {
                return res.status(404).json({ error: "Gasto no encontrado" });
            }
            res.json({ message: "Gasto eliminado con éxito" });
        })
        .catch(err => {
            res.status(400).json({ err });
        });
});

export default ruta;
