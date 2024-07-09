import { Op, where } from "sequelize";
import { Destino, Testimonial, Usuario, Viaje } from "../models/index.js";

const crearTestimonial = async(req, res) => {
    const {mensaje, valoracion} = req.body
    const usuarioId = req.usuario.id
    const{viaje:viajeId} = req.params

    const existeTestimonial = await Testimonial.findOne({
        include: {
            model: Usuario,
            attributes: ['nombre', 'email','telefono', 'createdAt', 'updatedAt'], // Incluir solo estos campos en Post
            
        },
        where:{
            viajeId,
            usuarioId
        }
    })
    if(existeTestimonial) {
        return res.status(400).json({msg:"Ya publicaste un testimonial en este viaje"});
    }
    const testimonial = await Testimonial.create({
        mensaje,
        usuarioId,
        viajeId,
        valoracion
    })
    res.json({msg:"Testimonial creado correctamente"})
    
}
const verTestimoniales = async(req, res) => {
    const testimoniales = await Testimonial.findAll({
        attributes:['mensaje', 'createdAt', 'updatedAt'],
        include:[
            {
            model:Usuario,
            attributes: ['nombre', 'email']
        },
        {
            model:Viaje,
            attributes:['fecha_salida', 'disponibles'],
            include:{
                model:Destino,
                attributes:['nombre']
            }
        }
    ]
    })

    if(!testimoniales ) {
        return res.status(404).json({msg:"No se encontraron testimoniales"})
    }
    res.json(testimoniales)
}
const verTestimonialesPorViaje = async(req, res) => {
    const{viaje:viajeId} = req.params
    const testimoniales = await Testimonial.findAll({where:{
        viajeId
    },
    attributes:['mensaje', 'createdAt', 'updatedAt'],
        include:[
            {
            model:Usuario,
            attributes: ['nombre', 'email']
        },
        {
            model:Viaje,
            attributes:['fecha_salida', 'disponibles'],
            include:{
                model:Destino,
                attributes:['nombre']
            }
        }
    ]
})
    if(!testimoniales ) {
        return res.status(404).json({msg:"No se encontraron testimoniales"})
    }
    res.json(testimoniales)
}
const misTestimoniales = async(req, res) => {
    const testimoniales = await Testimonial.findAll({where:{usuarioId:req.usuario.id}})
    if(!testimoniales ) {
        return res.status(404).json({msg:"No se encontraron testimoniales"})
    }
    res.json(testimoniales)
}   
const editarTestimonial = async(req, res) => {
    const{id} = req.params
    const testimonial = await Testimonial.findOne({where:{id}})
    if(!testimonial){
        return res.status(404).json({msg:"No se encontraron testimoniales"})
    }
    testimonial.mensaje = mensaje || testimonial.mensaje
    testimonial.valoracion = valoracion || testimonial.valoracion
    await testimonial.save()
    res.json({msg:"Testimonial actualizado correctamente"})
}
const eliminarTestimonial = async(req, res) => {
    const{id} = req.params
    const testimonial = await Testimonial.findOne({where:{id}})
    if(!testimonial){
        return res.status(404).json({msg:"No se encontraron testimoniales"})
    }

    await testimonial.destroy()
    res.json({msg:"El testimonial se elimino correctamente"})
}

export { crearTestimonial,
    verTestimoniales,
    verTestimonialesPorViaje,
    editarTestimonial,
    eliminarTestimonial,
    misTestimoniales
}