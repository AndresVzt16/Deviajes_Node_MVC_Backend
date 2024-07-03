import Aerolineas from "../models/Aerolineas.js";



const registrarAerolinea = async (req, res) =>{
    const {nombre} = req.body;
    if([nombre].includes('')){
        return res.json({msg: "Debes proporcionar el nombre de la aerolinea"});
    }
    try{
        // Evitar aerolineas duplicadas con (nombre)
        const existeAerolinea = await Aerolineas.findOne({ where: {nombre}})
        if(existeAerolinea){
            const error = new Error('La Aerolinea ya esta registrada')
            return res.status(401).json({msg:error.message, error: true})
        }
        const aerolinea = await Aerolineas.create({
            nombre
        })
        res.json({msg: "Aerolinea registrada correctamente", aerolinea});
    } catch (error){

    }
}

const getAerolineas = async (req, res) => {
    const aerolineas = await Aerolineas.findAll()
    res.json(aerolineas)
}

const editarAerolinea = async(req, res) => {
    const{id} = req.params
    const{nombre} = req.body
    const aerolinea = await Aerolineas.findOne({where:{id}})

    aerolinea.nombre = nombre || aerolinea.nombre
    
    aerolinea.email = email || aerolinea.email
    aerolinea.telefono = telefono || aerolinea.telefono
    await aerolinea.save()
    res.json(aerolinea)
}

export {
    registrarAerolinea,
    getAerolineas,
    editarAerolinea
}