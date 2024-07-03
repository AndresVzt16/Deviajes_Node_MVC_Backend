import { DataTypes } from "sequelize";
import db from '../config/db.js'

const Aerolineas = db.define('aerolineas', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoincrement:true,
        allowNull:false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Aerolineas