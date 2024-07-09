import Administrador from "./Administrador.js";
import Aerolinea from "./Aerolinea.js";
import Destino from "./Destino.js";
import Usuario from "./Usuario.js";
import Viaje from "./Viaje.js";
import Testimonial from "./Testimonial.js";
import Clase from "./Clase.js";
import Boleto from "./Boleto.js";


Viaje.belongsTo(Destino)
Viaje.belongsTo(Aerolinea)

Boleto.belongsTo(Clase)
Boleto.belongsTo(Viaje)
Boleto.belongsTo(Usuario)

Testimonial.belongsTo(Usuario)
Testimonial.belongsTo(Viaje)



export {
    Administrador,
    Aerolinea,
    Destino,
    Usuario,
    Viaje,
    Testimonial,
    Clase,
    Boleto

}