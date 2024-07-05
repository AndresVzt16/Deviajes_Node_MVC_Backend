import { Destino, Viaje } from "../models/index.js";

const crearViaje = async(req, res) => {
    const{
        fechaSalida, 
        destino : destinoId,
        aerolinea : aerolineaId,
        disponibles,
        precio
    
    } = req.body

    try {

        const viaje = await Viaje.create({
            fecha_salida: fechaSalida,
            destinoId,
            aerolineaId,
            disponibles,
            precio

           
        })

     
        res.json(viaje)
        
        
    } catch (error) {
        console.log(error)
    }

}
const verViajes = async(req, res) => {
    const viajes = await Viaje.findAll()
    if(!viajes) {
        return res.status(404).json({msg:"No se encontraron viajes"})
    }
    res.json(viajes)
}
const verViaje = async(req, res) => {
    const{id} = req.params
    const viaje = await Viaje.findOne({where:{id}})
    if(!viaje) {
        return res.status(404).json({msg:"No se pudo eliminar el viaje"})
    }
    res.json(viaje)
}
const editarViaje = async(req, res) => {
    const{id} = req.params
    const {precio, disponibles, destino : destinoId, aerolinea : aerolineaId } = req.body
    const viaje = await Viaje.findOne({where:{id}})
    if(!viaje) {
        return res.status(404).json({msg:"No se pudo eliminar el viaje"})
    }
    viaje.precio = precio || viaje.precio
    viaje.disponibles = disponibles || viaje.disponibles
    viaje.destinoId = destinoId || viaje.destinoId
    viaje.aerolineaId = aerolineaId || viaje.aerolineaId

    await viaje.save()
    res.json({msg:"Viaje actualizado correctamente"})
}
const eliminarViaje = async(req, res) => {
    const{id} = req.params
    const viaje = await Viaje.findOne({where:{id}})
    if(!viaje) {
        return res.status(404).json({msg:"No se pudo eliminar el viaje"})
    }

    await viaje.destroy()
    const destino = await Destino.findOne({where:{id:viaje.destinoId}})
    destino.disponibles += 1
    await destino.save()
    res.json({msg:"El viaje se elimino correctamente"})

}

export {
    crearViaje,
    verViaje,
    verViajes,
    editarViaje,
    eliminarViaje
}