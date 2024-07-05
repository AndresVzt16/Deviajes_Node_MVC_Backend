import db from "../config/db.js";
import {Viaje, Usuario, Testimonial,Aerolinea, Destino} from '../models/index.js'

const importarDatos = async () => {
    try {
        await db.authenticate()
        await db.sync()
    } catch (error) {
        
    }
}