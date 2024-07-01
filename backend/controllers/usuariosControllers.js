

import Usuario from "../models/Usuario.js"
import { generarId } from "../helpers/token.js";

const registrarUsuario = async(req, res) => {
    const{nombre, email, password} = req.body
    if([nombre, email, password].includes('')){
        return res.json({msg: "Hay campos vacios"});
    }

    try {
        //Evitar usuarios duplicados con (email)

        const existeUsuario = await Usuario.findOne({where:{email}})
        if(existeUsuario){
            const error = new Error('El usuario ya esta registrado')
            return res.status(401).json({msg:error.message})
        }
        const usuario = await Usuario.create({
            nombre,
            email,
            password,
            token: generarId()
          });
          
          res.json(usuario)
          


    } catch (error) {
        
    }
    

}
const autenticarUsuario = async(req, res) => {
    const{email, password} = req.body
    if([nombre, email, password].includes('')){
        return res.json({msg: "Hay campos vacios"});
    }

    try {
        //Evitar usuarios duplicados con (email)

        const existeUsuario = await Usuario.findOne({where:{email}})
        if(!existeUsuario){
            const error = new Error('Accion no valida')
            return res.status(404).json({msg:error.message})
        }
        existeUsuario.nombre = nombre || existeUsuario.nombre;
        existeUsuario.email = email || existeUsuario.email;
        const usuarioEditar = await existeUsuario.save()
        res.json(usuarioEditar)


    } catch (error) {
        
    }
    

}

const editarUsuario = (req, res) => {

}

const obtenerPerfil = (req, res) => {
    
}





export {
    registrarUsuario,
    editarUsuario,
    obtenerPerfil,
    autenticarUsuario
}