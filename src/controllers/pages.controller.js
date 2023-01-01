import Recursos from "../models/recursos.js";
import User from "../models/User.js";
import Prueba from "../models/prueba.js";
import path from "path";
import fs from "fs-extra";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'ddysuykam', 
    api_key: '871329316697633', 
    api_secret: 'f-sPWm9qZ4j2ErmSj5EFb4aqQqo' 
  });
export const renderpageForm  = async (req, res) => {
  const recursos = await Recursos.find()
  .sort({ date: "desc" })
  .lean();
res.render("pages/recursos", { recursos });
  };



export const renderREAForm = (req, res) => res.render("pages/FormularioREA");

export const renderpageadminForm = async (req, res) => {
  const recursos = await Recursos.find()
    .sort({ date: "desc" })
    .lean();
  res.render("pages/recursosadmin", { recursos });
};


export const createNewREA = async (req, res) => {
  const { curso, asignatura,nombrerea, link,descripcion } = req.body;
  const errors = [];
  if (!nombrerea) {
    errors.push({ text: "Ingrese un nombre de REA." });
  }
  if (!link) {
    errors.push({ text: "Ingrese un Link" });
  }
  
  if (!descripcion) {
    errors.push({ text: "Ingrese una descripción" });
  }
  if (errors.length > 0)
    return res.render("pages/FormularioREA", {
      errors,
      nombrerea,
      link,
    });
   const result = await cloudinary.uploader.upload(req.file.path);
   console.log(result);
  const newRecursos = new Recursos({curso,asignatura, nombrerea, link,descripcion,filename: result.url,public_id:result.public_id });
  newRecursos.user = req.user.id;
  await newRecursos.save();
  await fs.unlink(req.file.path);
  req.flash("success_msg", "Recurso agregado correctamente");
  res.redirect("/pages/recursosadmin");
};

//borrar
export const deleterea = async (req, res) => {
  const recurso = await Recursos.findById(req.params.id).lean();
  if (recurso.user != req.user.id) {
    req.flash("error_msg", "Solo el autor del recurso puede eliminarlo");
    return res.redirect("/pages/recursosadmin");
  }
  await Recursos.findByIdAndDelete(req.params.id);
  await cloudinary.uploader.destroy(recurso.public_id);
  req.flash("success_msg", "Recurso eliminado correctamente");
  res.redirect("/pages/recursosadmin");
};
// editar rea

export const Editrea = async (req, res) => {
  const recurso = await Recursos.findById(req.params.id).lean();
  if (recurso.user != req.user.id) {
    req.flash("error_msg", "Solo el autor del recurso puede editarlo");
    return res.redirect("/pages/recursosadmin");
  }
  res.render("pages/editarrea", { recurso });
};

export const updaterea = async (req, res) => {
  const { nombrerea, descripcion } = req.body;
  await Recursos.findByIdAndUpdate(req.params.id, { nombrerea, descripcion });
  req.flash("success_msg", "Recurso actualizado");
  res.redirect("/pages/recursosadmin");
};
export const updatefondorea = async (req, res) => {
  const recurso1 = await Recursos.findById(req.params.id).lean();
  await cloudinary.uploader.destroy(recurso1.public_id);
  const result = await cloudinary.uploader.upload(req.file.path);
   console.log(result);
  await Recursos.findByIdAndUpdate(req.params.id, { filename: result.url,public_id:result.public_id });
  await fs.unlink(req.file.path);
  const recurso = await Recursos.findById(req.params.id).lean();
  if (recurso.user != req.user.id) {
    req.flash("error_msg", "Solo el autor del recurso puede editarlo");
    return res.redirect("/pages/recursosadmin");
  }
  
  res.render("pages/editarrea", { recurso });
  req.flash("success_msg", "Imagen de fondo actualizada");
};


//cambiar contraseña_________________________________________________________________________________________________________________
export const rendercambiacontra= async (req, res) => {
  const users = await User.find()
    .sort({ date: "desc" })
    .lean();
  res.render("pages/Formulariocc", { users });
};

export const cambiacontra= async (req, res) => {
  const { email } = req.body;
  // verifica si existe el usuario
  const userFound = await User.findOne({ email: email });
  console.log(userFound);
  res.render("pages/Formulariocc-edit",{userFound});
  req.flash("success_msg", "Usuario encontrado con exito");
};


export const updatecontra = async (req, res) => {
  console.log("en consola: "+req.params.id)
  let errors = [];
  const { password, confirm_password } = req.body;
  if (password !== confirm_password) {
    errors.push({ text: "Contraseña no coincide" });
  }

  if (password.length < 4) {
    errors.push({ text: "La contraseña debe tener mas de 4 letras" });
  }

  if (errors.length > 0) {
    return res.render("pages/Formulariocc", {
      errors,
      password,
      confirm_password,
    });
  }

  // Actualizar contraseña
  const update= new User({password});
  update.password = await update.encryptPassword(password);
  const password1 = update.password;
  console.log("contra: "+password1);
  await User.findByIdAndUpdate(req.params.id,{password: password1});
  req.flash("success_msg", "Contraseña actualizada");
  res.redirect("/");
};

//________________________________________________________----
export const renderapregunta = async (req, res) => {
  const recurso = await Recursos.findById(req.params.id).lean();
  res.render("pages/agregarpregunta",{recurso});
};

export const renderlistado = async (req, res) => {
  const recurso = await Recursos.findById(req.params.id).lean();
  res.render("pages/listado",{recurso});
};
//________________________________________________________________________________
export const crearpregunta = async (req, res) => {
  const { pregunta, opcion_a,opcion_b, opcion_c,correcta} = req.body;
  const errors = [];
  if (!pregunta) {
    errors.push({ text: "Ingrese una pregunta" });
  }
  if (!opcion_a) {
    errors.push({ text: "Ingrese la opción A" });
  }
  
  if (!opcion_b) {
    errors.push({ text: "Ingrese la opción B"  });
  }
  if (!opcion_c) {
    errors.push({ text: "Ingrese la opción C"  });
  }
  if (!correcta) {
    errors.push({ text: "Idique la opción correcta" });
  }
  if (errors.length > 0)
    return res.render("pages/agregarpregunta", {
      errors,
      pregunta,
      opcion_a,
      opcion_b,
      opcion_c,
      correcta,
    });
  const newpregunta = new Prueba({pregunta,opcion_a, opcion_b, opcion_c,correcta });
  newpregunta.user = req.user.id;
  newpregunta.rea_id = req.params.id;
  await newpregunta.save();
  req.flash("success_msg", "pregunta guardada correctamente");
  res.redirect("/pages/agregarpregunta/"+req.params.id);
};
