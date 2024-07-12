

import Usuario from "../models/Usuario.js"
import { generarId, generarJWT } from "../helpers/token.js";
import bcrypt from 'bcrypt'

const registrarUsuario = async(req, res) => {
    const{nombre, email, password, telefono} = req.body
    if([nombre, email, password, telefono].includes('')){
        return res.json({msg: "Hay campos vacios", error: true});
    }

    try {
        //Evitar usuarios duplicados con (email)

        const existeUsuario = await Usuario.findOne({where:{email}})
        if(existeUsuario){
            const error = new Error('El usuario ya esta registrado')
            return res.status(401).json({msg:error.message, error: true})
        }

          const usuario = await Usuario.create({
            nombre,
            email,
            password,
            telefono,
            token: null,
            confirmado:true
          });
          res.json({msg:"Usuario creado exitosamente"})
          


    } catch (error) {
        
    }
    

}

//Confirmar cuenta

const confirmarCuenta = async(req, res) => {
    const{token} = req.params
    const usuario = await Usuario.findOne({where:{token}})
    if(!usuario) {
        return res.status(404).json({msg:'Token no valido', error:true})
    }
    try {
        usuario.token = null
        usuario.confirmado = true
        await usuario.save()
        res.json(usuario)
    } catch (error) {
        
    }
}

//Olvide Password

const generarCambio = async(req, res) => {
    const{email} = req.body
    const usuario = await Usuario.findOne({where:{email}})
    console.log(usuario)
    if(!usuario) {
        
        return res.status(404).json({msg:'El email no existe o no está confirmado', error:true})
 
    }
    if(!usuario.confirmado) {
        return res.status(400).json({msg:'El email no existe o no está confirmado', error:true})
    }
    try {
        usuario.token = generarId()
        await usuario.save()
        res.json({msg:`Se ha enviado a ${usuario.email} las instrucciones para el cambio de contraseña.`})
    } catch (error) {
        const e = new Error('No se pudo generar el cambio');
        res.status(400).json({msg:e.message})
    }

}

const validarCambio = async(req, res) => {
    const{token} = req.params
    const usuario = await Usuario.findOne({where:{token}});
    if(!usuario) {
        return res.status(404).json({msg:'Token no valido', error:true})
    }
    res.json({msg:"Validacion correcta, ya puedes ingresar tu nueva contraseña"})
}
const cambiarPassword = async(req, res) => {
    const{token} = req.params
    const{password} = req.body
    const usuario = await Usuario.findOne({where:{token}});
    if(!usuario) {
        return res.status(404).json({msg:'Token no valido', error:true})
    }
    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash(password, salt)
    usuario.token = null;
    await usuario.save()

    res.json({msg:"Contraseña actualizada correctamente, ya puedes iniciar sesión"})
}




const autenticarUsuario = async(req, res) => {
    const{email, password} = req.body
    if([email, password].includes('')){
        return res.json({msg: "Hay campos vacios"});
    }

   
        //Evitar usuarios duplicados con (email)

        const usuario = await Usuario.findOne({where:{email}})
        if(!usuario){
            const error = new Error('El email no existe o no esta confirmado')
            return res.status(404).json({msg:error.message})
        }
        if(!usuario.confirmado){
            const error = new Error('El email no existe o no esta confirmado')
            return res.status(404).json({msg:error.message})
        }

       
        if(!usuario.validarPassword(password)){
            const error = new Error('Email o contraseña no validos')
            return res.status(404).json({msg:error.message})
        }
        

        res.json({
            id:usuario.id, 
            nombre: usuario.nombre, 
            email : usuario.email, 
            token: generarJWT(usuario.id),
        });
        
}


const obtenerPerfil = (req, res) => {
    const{usuario} = req
    res.json(usuario)
    
}

const editarPerfil = async(req, res) => {
    const{id} = req.params
    const{nombre, email, telefono} = req.body
    const usuario = await Usuario.findOne({where:{id}})
    
    if(!usuario){
        const error = new Error('Accion no valida')
        return res.status(400).json({msg:error.message})
    }
    if(id !== req.usuario.id) {
        const error = new Error('Accion no valida')
        return res.status(400).json({msg:error.message})
    }
    usuario.nombre = nombre || usuario.nombre    
    usuario.email = email || usuario.email
    usuario.telefono = telefono || usuario.telefono
    try {
        await usuario.save()
    } catch (error) {
        return res.status(403).json({msg:"Hubo un error al guardar los cambios"})
    }
    
    res.json(usuario)

}

export {
    registrarUsuario,
    obtenerPerfil,
    autenticarUsuario,
    generarCambio,
    confirmarCuenta,
    validarCambio,
    cambiarPassword,
    editarPerfil
}