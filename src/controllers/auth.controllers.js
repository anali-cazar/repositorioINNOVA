import User from "../models/User.js";
import passport from "passport";

export const renderSignUpForm = (req, res) => res.render("auth/signup");

export const signup = async (req, res) => {
  let errors = [];
  const { name, email, tipo, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    errors.push({ text: "Contraseña no coincide" });
  }

  if (password.length < 4) {
    errors.push({ text: "La contraseña debe tener mas de 4 letras" });
  }

  if (errors.length > 0) {
    return res.render("auth/signup", {
      errors,
      name,
      email,
      tipo,
      password,
      confirm_password,
    });
  }

  // Look for email coincidence
  const userFound = await User.findOne({ email: email });
  if (userFound) {
    req.flash("error_msg", "Este correo ya existe");
    return res.redirect("/auth/signup");
  }

  // Saving a New User
  const newUser = new User({ name, email,tipo, password });
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();
  req.flash("success_msg", "Usuario registrado");
  res.redirect("/");
};

export const renderSigninForm = (req, res) => res.render("/");





export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Sesión cerrada");
    res.redirect("/");
  });
};
