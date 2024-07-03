import { DataTypes } from "sequelize";
import db from '../config/db.js'

const Aerolinea = db.define('aerolineas', {
    nombre:{
        type:DataTypes.STRING
    }
})

export default Aerolinea