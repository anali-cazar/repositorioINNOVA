import { Router } from "express";
import { renderpageForm, renderpageadminForm, renderpagconta, renderREAForm, createNewREA, deleterea, Editrea, updaterea,
  rendercambiacontra, cambiacontra, updatecontra, updatefondorea, renderapregunta, crearpregunta, deleteanswer, 
  renderquiz,salvarEvaluacion,verEvaluacion,verResultadoEvaluacion ,
} from "../controllers/pages.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// cargar paginas
router.get("/pages/recursos", isAuthenticated, renderpageForm);
router.get("/pages/recursosadmin", isAuthenticated, renderpageadminForm );
router.get("/pages/FormularioREA", isAuthenticated, renderREAForm );
router.get("/pages/evaluacion/:id", isAuthenticated, renderquiz );
router.post("/pages/FormularioREA", isAuthenticated, createNewREA);
router.get("/pages/Contactos", renderpagconta);
router.get("/pages/recursosadmin/resultadosDocente/:id",isAuthenticated, verEvaluacion);
router.get("/pages/recursos/resultadosEstudiante/:id",isAuthenticated, verResultadoEvaluacion );
router.post("/pages/evaluacion/save/:id",isAuthenticated, salvarEvaluacion);
router.get("/pages/agregarpregunta/:id", isAuthenticated,  renderapregunta);
router.put("/pages/agregarpregunta/:id", isAuthenticated,  crearpregunta);
// borrar rea
router.delete("/pages/delete/:id", isAuthenticated, deleterea);
router.delete("/pages/deleteanswer/:id", isAuthenticated, deleteanswer,);
// editar rea
router.get("/pages/edit/:id", isAuthenticated, Editrea );

router.put("/pages/edit-rea/:id", isAuthenticated, updaterea);
router.put("/pages/edit-fondo-rea/:id", isAuthenticated, updatefondorea);

// conraseña cambia
router.get("/pages/Formulariocc",  rendercambiacontra );
router.get("/pages/Formulariocc-edit", cambiacontra);
router.post("/pages/Formulariocc-edit", cambiacontra);
router.put("/pages/Formulariocc-edit/:id", updatecontra);
//_________________________________________________________________________________________

export default router;