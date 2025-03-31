import express from "express";
import {promises} from "fs";
const router = express.Router();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('views'))

app.get('/', (req, res) => {
  res.send('<h1>Nosotros</h1>')
})

export default router