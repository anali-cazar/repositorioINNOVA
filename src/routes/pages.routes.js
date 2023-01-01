import { Router } from "express";
import {
  renderpageForm, renderpageadminForm, renderREAForm, createNewREA, deleterea, Editrea, updaterea,
  rendercambiacontra,
  cambiacontra,
  updatecontra,
  updatefondorea,
  renderapregunta,
  crearpregunta,
  renderlistado,
} from "../controllers/pages.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// cargar paginas
router.get("/pages/recursos", isAuthenticated, renderpageForm);
router.get("/pages/recursosadmin", isAuthenticated, renderpageadminForm );
router.get("/pages/FormularioREA", isAuthenticated, renderREAForm );
router.post("/pages/FormularioREA", isAuthenticated, createNewREA);

router.get("/pages/agregarpregunta", isAuthenticated,  renderapregunta);
router.get("/pages/listado/:id", isAuthenticated,  renderlistado);
router.get("/pages/agregarpregunta/:id", isAuthenticated,  renderapregunta);
router.put("/pages/agregarpregunta/:id", isAuthenticated,  crearpregunta);
// borrar rea
router.delete("/pages/delete/:id", isAuthenticated, deleterea);

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