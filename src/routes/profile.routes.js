import { Router } from "express";
import {
  renderprofile,
  renderREAForm,
  createNewREA,
  deleterea,
  Editrea ,
  updatefondorea,
} from "../controllers/profile.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// cargar paginas
router.get("/profile/perfil", isAuthenticated, renderprofile );
router.get("/pages/FormularioREA", isAuthenticated, renderREAForm );
router.post("/pages/FormularioREA", isAuthenticated, createNewREA);
// borrar rea
router.delete("/pages/delete/:id", isAuthenticated, deleterea);

// editar rea
router.get("/pages/edit/:id", isAuthenticated, Editrea );
router.put("/pages/edit-fondo-rea/:id", isAuthenticated, updatefondorea);

export default router;