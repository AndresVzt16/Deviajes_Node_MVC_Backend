import { Boleto, Viaje, Clase, Usuario } from "../models/index.js"
import { Op } from "sequelize"
const verBoletos = async(req,res)  => {
    const boletos = await Boleto.findAll({where:{usuarioId:req.usuario.id}})
    if(!boletos) {
        return res.status(403).json({msg:"No se obtuvieron Boletos"})
    }
    res.json(boletos)
}
const crearBoleto = async(req,res)  => {
    const{clase: claseId, viaje : viajeId} = req.body
    const usuarioId = req.usuario.id
    if([ claseId, viajeId].includes('')){
        return res.json({msg: "Hay campos vacios", error: true});
    }

    try {
        const viaje = await Viaje.findOne({where:{id:viajeId}})
        const clase = await Clase.findOne({where:{id:claseId}})
        let precioViaje = viaje.precio
        
        let precio = 0;
        if(clase.nombre === "Premium"){
             precioViaje *= 2
        }
        if(clase.nombre === "A"){
            precioViaje *= 1.7
        }
        if(clase.nombre === "B"){
            precioViaje *= 1.5
        }
        if(clase.nombre === "C"){
            precioViaje *= 1
        }
        try {
            const boleto = await Boleto.create({
                claseId,
                viajeId,
                precio: precioViaje,
                usuarioId
              });
              
              viaje.disponibles -= 1
              await viaje.save()
              res.json(boleto)
        } catch (error) {
         res.json({msg:"Ocurrio un error interno, intenta mas tarde."})   
        }
        
          


    } catch (error) {
        console.log(error)
    }
}

const buscarBoleto =  async( req, res) => {
    const{ email } = req.body
    const boletos = await Boleto.findAll({
        include: {
        model: Usuario,
        attributes: ['nombre', 'email','telefono', 'createdAt', 'updatedAt'], // Incluir solo estos campos en Post
        where: {
            email
        }
    }})
    res.json(boletos)

}


const eliminarBoleto = async(req, res) => {
    const{id} = req.params
    
    const boleto = await Boleto.findOne({where:{id}})
    if(!boleto){
        const error = new Error('No se encontro el Boleto')
        return res.status(404).json({msg:error.message, error: true})
    }

    await boleto.destroy()
    res.json({msg:"Boleto eliminado correctamente"})

}


export{
    verBoletos,
    crearBoleto,
    eliminarBoleto,
    buscarBoleto
}