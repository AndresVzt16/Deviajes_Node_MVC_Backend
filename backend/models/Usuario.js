import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt'

import db from '../config/db.js'

const Usuario = db.define('usuarios', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    confirmado:{
        type: DataTypes.BOOLEAN,
    },
    token:{
        type: DataTypes.STRING,
    },
   
    
},
{
    hooks: {
        beforeCreate: async function(usuario) {
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password, salt)
        }
    }
}
)

export default Usuario
