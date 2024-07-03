import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import aerolineasRoutes from './routes/aerolineasRoutes.js'

// hablitar variables de entorno
dotenv.config();

// Conexion a Base de datos
try {
    await db.authenticate()
    await db.sync()
    console.log('Conexion a db correcta')
} catch (error) {
    console.log(error)
}

//inicializar app 
const app = express();

//habilitar los envios POST
app.use(express.json())

// definicion de rutas base
app.use('/usuario', usuarioRoutes);
app.use('/aerolineas', aerolineasRoutes);

app.use('/administrador', (req, res) => {

})
app.use('/testimoniales', (req, res) => {

})
app.use('/viajes', (req, res) => {

})
app.use('/destinos', (req, res) => {

})

//Subida del servidor
app.listen(process.env.PORT, (req, res ) => {
    console.log('Servidor funcionando en el puerto',  process.env.PORT);

})
