import { DataTypes } from "sequelize";
import db from '../config/db.js'

const Destino = db.define('destinos', {
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    imagen: {
        type:DataTypes.STRING,
    }
})
export default Destino

