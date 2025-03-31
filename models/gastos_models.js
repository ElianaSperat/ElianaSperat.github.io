import mongoose from "mongoose"

const gastosSchema = new mongoose.Schema({
    descripcion:{
        type: String,
        required: true
    },
    monto:{
        type: Number,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    },
    idUsuario: {
        type: String,
        required: true
    },
    idDestino: {
        type: String,
        required: true
    }
    
})

export default mongoose.model('Gasto', gastosSchema)