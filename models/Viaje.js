import { DataTypes } from "sequelize";

import db from "../config/db.js";

const Viaje = db.define('viajes', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    fecha_salida:{
        type:DataTypes.DATE
    },
    disponibles:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    precio:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})



export default Viaje