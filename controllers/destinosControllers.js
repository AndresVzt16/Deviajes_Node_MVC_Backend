
import Destino from "../models/Destino.js";
import { generarId } from "../helpers/token.js";



const obtenerDestino = async(req, res) => {
    const{id} = req.params
    const destino = await Destino.findOne({chere:{id}})
    if(!destino){
        const error = new Error('No se obtuvo el destino')
        return res.status(404).json({msg:error.message})
    }
    

}

const obtenerDestinos = async(req, res) => {
    const destinos = await Destino.findAll()
    if(!destinos){
        return res.status(404).json({msg:"No se encontraron destinos"})
    }
    res.json(destinos)
}

const editarDestino = async(req, res) => {
    const{id} = req.params
    const{nombre,pais} = req.body
    const destino = await Destino.findOne({where:{id}})
    if(!destino){
        const error = new Error('Accion no valida');
        return res.status(400).json({msg:error.message})
    }
    destino.nombre = nombre || destino.nombre
    destino.pais = pais || destino.pais
    destino.imagen = `${generarId()}.png` || destino.imagen
    await destino.save()

    res.json({msg:"Los cambios se guardaron correctamente"});
}

const eliminarDestino = async(req, res) => {
    const{id} = req.params
    const destino = await Destino.findOne({where:{id}})
    if(!destino){
        const error = new Error('Accion no valida');
        return res.status(400).json({msg:error.message})
    }
    await destino.destroy()


    res.json({msg:"El Destino se elimino correctamente"});
}

const registrarDestino = async(req, res) => {
    const{nombre, pais, precio} = req.body
    const destinoExiste = await Destino.findOne({where:{nombre}})
    if(destinoExiste){
        const error = new Error('El destino ya esta registrado');
        return res.status(400).json({msg:error.message})
    }
    const destino = await Destino.create({
        nombre,
        pais,
        imagen: `${generarId()}.png`,
        precio,
     
    })
    
    res.json(destino)
}

export {
    obtenerDestino,
    obtenerDestinos,
    editarDestino,
    eliminarDestino,
    registrarDestino
}