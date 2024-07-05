import { DataTypes } from "sequelize"
import db from "../config/db.js"

const Clase = db.define('clases', {

    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    }
})


export default Clase
