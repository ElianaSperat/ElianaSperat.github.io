import mongoose from "mongoose";

const listaSchema = new mongoose.Schema({
    nombreItem: {
        type: String,
        required: true,
    },
    asignadoA: {
        type: String,
        required: false,
    },
    fechaLimite: {
        type: Date,
        required: false,
    },
    estado: {
        type: String,
        enum: ["Pendiente", "Listo"],
        default: "Pendiente",
    },
    idDestino: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Lista", listaSchema);