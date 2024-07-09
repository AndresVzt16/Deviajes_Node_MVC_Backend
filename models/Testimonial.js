import { DataTypes } from "sequelize";

import db from "../config/db.js";

const Testimonial = db.define('testimoniales', {
   
    mensaje:{
        type:DataTypes.STRING,
        allowNull:false
    },
    valoracion:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

export default Testimonial