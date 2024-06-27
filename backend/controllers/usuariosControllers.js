

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







export {
    registrarUsuario
}