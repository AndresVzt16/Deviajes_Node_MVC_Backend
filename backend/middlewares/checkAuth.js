import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario.js";

const checkAuth = async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        try {
            const token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const usuario = await Usuario.findOne({where:{id:decoded.id},
                attributes: ['id', 'nombre', 'email']
            })
            
            if(!usuario) {
                const e = new Error('Token no valido o inexistente')
                return res.status(403).json({msg:e.message, error:true})
            }
           
            req.usuario = usuario
            return next()
           
        } catch (error) {
            const e = new Error('Token no valido o inexistente')
            res.status(403).json({msg:e.message, error:true})
        }
    }
    if(!token) {
        const errors = new Error('Token no valido o inexistente');
        res.status(403).json({msg: errors.message})
           
    }
    next();
}

export default checkAuth
