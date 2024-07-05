import { DataTypes } from "sequelize";

import db from "../config/db.js";

const Testimonial = db.define('testimoniales', {
   
    Mensaje:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

export default Testimonial