import mongoose from "mongoose";

const destinoSchema = new mongoose.Schema({
    destino: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    presupuestoTotal: {
        type: Number,
        required: true
    },
    presupuestoRestante: {
        type: Number,
        required: false
    },
    nombreDelViaje: {
        type: String,
        required: true,
    },
    idUsuarios: [{
        type: String,
        required: true
    }]
});

export default mongoose.model('Destino', destinoSchema);