import { Router } from "express";
import passport from "passport";
import {
  renderSignUpForm,
  signup,
  renderSigninForm,
  logout,
} from "../controllers/auth.controllers.js";

const router = Router();

// Routes
router.get("/auth/signup", renderSignUpForm);

router.post("/auth/signup", signup);

router.get("/auth/signin", renderSigninForm);

router.get("/auth/logout", logout);

router.post(
  "/auth/signin",
  passport.authenticate('local', {
    failureRedirect: '/',failureFlash: true,
  }), (req, res) => {
    if (req.user.tipo =="estudiante") {
      res.redirect('/pages/recursos');
    }
    if (req.user.tipo == "docente") {
      res.redirect('/pages/recursosadmin');
    }
  });




export default router;
