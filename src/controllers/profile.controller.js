import Recursos from "../models/recursos.js";
import User from "../models/User.js";
import path from "path";
import fs from "fs-extra";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'ddysuykam', 
    api_key: '871329316697633', 
    api_secret: 'f-sPWm9qZ4j2ErmSj5EFb4aqQqo' 
  });


export const renderREAForm = (req, res) => res.render("pages/FormularioREA");

export const renderprofile = async (req, res) => {
  const recursos = await Recursos.find()
    .sort({ date: "desc" })
    .lean();
  res.render("profile/perfil", { recursos });
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


