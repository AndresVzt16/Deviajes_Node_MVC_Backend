

import Administrador from "../models/Administrador.js"
import { generarId, generarJWT } from "../helpers/token.js";
import bcrypt from 'bcrypt'


const registrarAdministrador = async(req, res) => {
    const{nombre, email, password, telefono} = req.body
    if([nombre, email, password, telefono].includes('')){
        return res.json({msg: "Hay campos vacios", error: true});
    }

    try {
        //Evitar usuarios duplicados con (email)

        const existeAdministrador = await Administrador.findOne({where:{email}})
        if(existeAdministrador){
            const error = new Error('El usuario ya esta registrado')
            return res.status(401).json({msg:error.message, error: true})
        }
        const administrador = await Administrador.create({
            nombre,
            email,
            password,
            telefono,
            token: generarId()
          });
          
          res.json(administrador)
          


    } catch (error) {
     console.log(error)   
    }
    

}

//Confirmar cuenta

const confirmarCuenta = async(req, res) => {
    const{token} = req.params
    const administrador = await Administrador.findOne({where:{token}})
    if(!administrador) {
        return res.status(404).json({msg:'Token no valido', error:true})
    }
    try {
        administrador.token = null
        administrador.confirmado = true
        await administrador.save()
        res.json(administrador)
    } catch (error) {
        
    }
}

//Olvide Password

const generarCambio = async(req, res) => {
    const{email} = req.body
    const administrador = await Administrador.findOne({where:{email}})
    console.log(administrador)
    if(!administrador) {
        
        return res.status(404).json({msg:'El email no existe o no está confirmado', error:true})
 
    }
    if(!administrador.confirmado) {
        return res.status(400).json({msg:'El email no existe o no está confirmado', error:true})
    }
    try {
        administrador.token = generarId()
        await administrador.save()
        res.json({msg:`Se ha enviado a ${administrador.email} las instrucciones para el cambio de contraseña.`})
    } catch (error) {
        const e = new Error('No se pudo generar el cambio');
        res.status(400).json({msg:e.message})
    }

}

const validarCambio = async(req, res) => {
    const{token} = req.params
    const administrador = await Administrador.findOne({where:{token}});
    if(!administrador) {
        return res.status(404).json({msg:'Token no valido', error:true})
    }
    res.json({msg:"Validacion correcta, ya puedes ingresar tu nueva contraseña"})
}
const cambiarPassword = async(req, res) => {
    const{token} = req.params
    const{password} = req.body
    const administrador = await Administrador.findOne({where:{token}});
    if(!administrador) {
        return res.status(404).json({msg:'Token no valido', error:true})
    }
    const salt = await bcrypt.genSalt(10)
    administrador.password = await bcrypt.hash(password, salt)
    administrador.token = null;
    await administrador.save()

    res.json({msg:"Contraseña actualizada correctamente, ya puedes iniciar sesión"})
}




const autenticarAdministrador = async(req, res) => {
    const{email, password} = req.body
    if([email, password].includes('')){
        return res.json({msg: "Hay campos vacios"});
    }
        //Evitar usuarios duplicados con (email)

        const administrador = await Administrador.findOne({where:{email}})
        if(!administrador){
            const error = new Error('El email no existe o no esta confirmado')
            return res.status(404).json({msg:error.message})
        }
        if(!administrador.confirmado){
            const error = new Error('El email no existe o no esta confirmado')
            return res.status(404).json({msg:error.message})
        }

       
        if(!administrador.validarPassword(password)){
            const error = new Error('Email o contraseña no validos')
            return res.status(404).json({msg:error.message})
        }

        const token = generarJWT(administrador.id);

        res.json({ token });
        
}


const obtenerPerfil = (req, res) => {
    const{administrador} = req
    res.json(administrador)
}

const editarPerfil = async(req, res) => {
    const{id} = req.params
    const{nombre, email, telefono} = req.body


    const administrador = await Administrador.findOne({where:{id}})

    if(!administrador){
        const error = new Error('Accion no valida')
        return res.status(400).json({msg:error.message})
    }
    if(id !== req.administrador.id) {
        const error = new Error('Accion no valida')
        return res.status(400).json({msg:error.message})
    }
    administrador.nombre = nombre || administrador.nombre    
    administrador.email = email || administrador.email
    administrador.telefono = telefono || administrador.telefono
    try {
        await administrador.save()
    } catch (error) {
        return res.status(403).json({msg:"Hubo un error al guardar los cambios"})
    }
    
    res.json(administrador)

}

export {
    registrarAdministrador,
    obtenerPerfil,
    autenticarAdministrador,
    generarCambio,
    confirmarCuenta,
    validarCambio,
    cambiarPassword,
    editarPerfil
}