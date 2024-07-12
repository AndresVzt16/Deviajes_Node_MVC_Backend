import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import db from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import aerolineaRoutes from './routes/aerolineaRoutes.js'
import administradorRoutes from './routes/administradorRoutes.js'
import destinoRoutes from './routes/destinoRoutes.js'
import claseRoutes from './routes/claseRoutes.js'
import viajeRoutes from './routes/viajeRoutes.js'
import testimonialRoutes from './routes/testimonialRoutes.js'
import boletosRoutes from './routes/boletosRoutes.js'

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
const dominiosPermitidos = ['https://deviajesmvc.netlify.app']

const corsOptions = {
    origin : function ( origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}


//inicializar app 
const app = express();


app.use(cors(corsOptions))
//habilitar los envios POST
app.use(express.json())

// definicion de rutas base
app.use('/usuario', usuarioRoutes)
app.use('/aerolinea', aerolineaRoutes)
app.use('/admin', administradorRoutes)
app.use('/destinos', destinoRoutes)
app.use('/clase', claseRoutes)
app.use('/testimoniales', testimonialRoutes)
app.use('/viajes', viajeRoutes)
app.use('/boletos', boletosRoutes)

//Subida del servidor

app.listen(process.env.PORT, (req, res ) => {
    console.log('Servidor funcionando en el puerto',  process.env.PORT);

})
