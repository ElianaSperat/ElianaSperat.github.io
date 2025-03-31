import express from "express"
import path from "path"
import mongoose from "mongoose"
import "dotenv/config"
import usuariosRoutes from "./routes/usuarios_routes.js"
import nosotrosRoutes from "./routes/nosotros_routes.js"
import gastosRoutes from "./routes/gastos_routes.js"
import listaRoutes from "./routes/lista_routes.js"
import climaRoutes from "./routes/clima_routes.js"
import destinosRoutes from "./routes/destinos_routes.js"
import auth from "./routes/auth_routes.js"
import cors from "cors"

mongoose
	.connect("mongodb://127.0.0.1:27017/tripting", { useUnifiedTopology: true })
	.then(() => { console.log('Conectado a la base de datos') })
	.catch((err) => { console.log('Error al conectar con la base de datos: ' + err) })

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'))

app.get('/', (req, res) => {
	res.sendFile('./views/index.html', { root: path.resolve() })
})

app.get('/mi-perfil', (req, res) => {
	res.sendFile('./views/mi-perfil.html', { root: path.resolve() })
})
app.use('/usuarios', usuariosRoutes)
app.use('/nosotros', nosotrosRoutes)
app.use('/gastos', gastosRoutes)
app.use('/listas', listaRoutes)
app.use('/clima', climaRoutes)
app.use('/destinos', destinosRoutes)
app.use('/login', auth)


app.listen(PORT, () => console.log('Servidor corriendo en el puerto 3000'))