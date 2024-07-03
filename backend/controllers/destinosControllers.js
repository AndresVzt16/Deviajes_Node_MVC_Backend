
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

}

const editarDestino = async(req, res) => {

}

const eliminarDestino = async(req, res) => {

}

const registrarDestino = async(req, res) => {
    const{nombre} = req.body
}

export {
    obtenerDestino,
    obtenerDestinos,
    editarDestino,
    eliminarDestino,
    registrarDestino
}