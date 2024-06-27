import  Sequelize  from "sequelize";
import dotenv from 'dotenv'


dotenv.config({path: '.env'})

const db = new Sequelize('deviajes','root', 'root', {
    host: 'localhost',
    dialect:'mysql',
    define: {
        timestamps: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

export default db