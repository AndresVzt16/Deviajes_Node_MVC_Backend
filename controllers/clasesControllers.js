import { Clase } from "../models/index.js"

const verClases = async(req,res)  => {
    const clases = await Clase.findAll()
    if(!clases) {
        return res.status(403).json({msg:"No se obtuvieron clases"})
    }
    res.json(clases)
}
const crearClase = async(req,res)  => {
    const{nombre} = req.body
    if([nombre].includes('')){
        return res.json({msg: "Hay campos vacios", error: true});
    }

    try {
        //Evitar usuarios duplicados con (email)

        const existeClase = await Clase.findOne({where:{nombre}})
        if(existeClase){
            const error = new Error('La clase ya esta registrada')
            return res.status(401).json({msg:error.message, error: true})
        }
        const clase = await Clase.create({
            nombre
          });
          
          res.json(clase)
          


    } catch (error) {
        console.log(error)
    }
}

const editarClase = async(req, res) => {
    const{id} = req.params
    const{nombre} = req.body
    const clase = await Clase.findOne({where:{id}})
    if(!clase){
        const error = new Error('No se encontro la clase')
        return res.status(404).json({msg:error.message, error: true})
    }

    clase.nombre = nombre || clase.nombre
    await clase.save()
    res.json(clase)

}
const eliminarClase = async(req, res) => {
    const{id} = req.params
    
    const clase = await Clase.findOne({where:{id}})
    if(!clase){
        const error = new Error('No se encontro la clase')
        return res.status(404).json({msg:error.message, error: true})
    }

    await clase.destroy()
    res.json({msg:"Clase eliminada correctamente"})
}


export{
    verClases,
    crearClase,
    editarClase,
    eliminarClase
}