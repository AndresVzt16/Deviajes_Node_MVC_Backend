import Aerolinea from "../models/Aerolinea.js";



const obtenerAerolinea = async(req, res) => {
    const{id} = req.params
    const aerolinea = await Aerolinea.findOne({chere:{id}})
    if(!aerolinea){
        const error = new Error('No se obtuvo la aerolinea')
        return res.status(404).json({msg:error.message})
    }
    res.json(aerolinea)
}

const obtenerAerolineas = async(req, res) => {

    const aerolineas = await Aerolinea.findAll()
    if(!aerolineas){
        return res.status(404).json({msg:"Error al obtener las aerolineas"});
    }
    res.json(aerolineas)
}

const editarAerolinea = async(req, res) => {
    const{id} = req.params
    const{nombre} = req.body
    const aerolinea = await Aerolinea.findOne({where:{id}})
    if(!aerolinea){
        const error = new Error('No se obtuvo la aerolinea')
        return res.status(404).json({msg:error.message})
    }
    aerolinea.nombre = nombre || aerolinea.nombre

    await aerolinea.save()

    res.json({msg:"Cambios guardados exitosamente"})

}

const eliminarAerolinea = async(req, res) => {
    const{id} = req.params
    const aerolinea = await Aerolinea.findOne({chere:{id}})
    if(!aerolinea){
        const error = new Error('No se obtuvo la aerolinea')
        return res.status(404).json({msg:error.message})
    }

    await aerolinea.destroy()

    res.json({msg:"Aerolinea eliminada exitosamente"})
}

const registrarAerolinea = async(req, res) => {
    const {nombre} = req.body
    const aerolineaExiste = await Aerolinea.findOne({where:{nombre}})
    if(aerolineaExiste){
        return res.status(400).json({msg:"La aerolinea ya esta registrada"});
    }
    try {
        const aerolinea = await Aerolinea.create({nombre})
        res.json(aerolinea)
    } catch (error) {
        console.log(error)
        /* const e = new Error('No se pudo almacenar la aerolinea')
        return res.status(400).json({msg:e.message}) */
    }
}

export {
    obtenerAerolinea,
    obtenerAerolineas,
    editarAerolinea,
    eliminarAerolinea,
    registrarAerolinea
}