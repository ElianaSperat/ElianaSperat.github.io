import express from "express";
import { obtenerLista, crearElementoLista, editarItem, eliminarElementoLista, obtenerItem } from "../controllers/lista_controller.js";
import Joi from "joi";

const ruta = express.Router();

const schema = Joi.object({
    nombreItem: Joi.string().min(3).max(50).required(),
    asignadoA: Joi.string().min(3).max(50).optional(),
    fechaLimite: Joi.date().iso().optional(),
    estado: Joi.string().valid("Pendiente", "Listo").default("Pendiente"),
    idDestino: Joi.string().min(3).max(50).required(),
});

ruta.get("/:idDestino", (req, res) => {
    let idDestino = req.params.idDestino;

    obtenerLista(idDestino)
        .then(lista => {
            res.json({ items: lista });
        })
        .catch(err => {
            res.status(400).json({ err });
        });
});

ruta.get("/item/:idItem", async (req, res) => {
    try {
        const item = await obtenerItem(req.params.idItem);
        if (!item) {
            return res.status(404).json({ error: "Ítem no encontrado en la base de datos" });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el ítem", detalle: error.message });
    }
});

ruta.put('/item/:idItem', async (req, res) => {
    try {
        const { idItem } = req.params;
        const datosActualizados = req.body;

        const itemActualizado = await editarItem(idItem, datosActualizados);

        if (!itemActualizado) {
            return res.status(404).json({ error: "Ítem no encontrado" });
        }

        res.json(itemActualizado);
    } catch (error) {
        console.error("Error al actualizar el ítem:", error);
        res.status(500).json({ error: "Error al actualizar el ítem", detalle: error.message });
    }
});


ruta.post("/", (req, res) => {
    console.log("Body recibido:", req.body);
    const { error, value } = schema.validate(req.body);
    if (!error) {
        let resultado = crearElementoLista(req.body);
        resultado
            .then((elemento) => {
                res.json({ elemento });
            })
            .catch((err) => {
                res.status(400).json({ err });
            });
    } else {
        console.error("Error de validación:", error);
        res.status(400).json(error);
    }
});

ruta.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    if (estado !== "Pendiente" && estado !== "Listo") {
        return res.status(400).json({ error: "Estado inválido." });
    }

    actualizarEstado(id, estado)
        .then(elementoActualizado => {
            res.json({ elementoActualizado });
        })
        .catch(err => {
            res.status(400).json({ err });
        });
});

ruta.delete("/:id", (req, res) => {
    const { id } = req.params;

    eliminarElementoLista(id)
        .then(() => {
            res.json({ message: "Elemento eliminado correctamente." });
        })
        .catch(err => {
            res.status(400).json({ err });
        });
});

export default ruta;
