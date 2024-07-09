import { Router } from "express";
import { crearTestimonial, editarTestimonial, eliminarTestimonial, misTestimoniales, verTestimoniales, verTestimonialesPorViaje } from "../controllers/testimonialControllers.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = Router()


router.get('/', verTestimoniales)
router.get('/mis-testimoniales',checkAuth, misTestimoniales)


router.route('/:id')
    
    .put(checkAuth,editarTestimonial)
    .delete( checkAuth, eliminarTestimonial)
router.route('/:viaje')
    .get(verTestimonialesPorViaje)
    .post(checkAuth,crearTestimonial)




export default router
