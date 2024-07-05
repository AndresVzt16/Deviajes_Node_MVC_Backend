import { DataTypes } from "sequelize";
import db from '../config/db.js'

const Boleto = db.define('boletos', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    precio:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

export default Boleto