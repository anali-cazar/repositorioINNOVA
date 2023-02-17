import Recursos from "../models/recursos.js";
import User from "../models/User.js";
import Prueba from "../models/prueba.js";
import Examen from "../models/Examen.js";
import path from "path";
import fs from "fs-extra";
import { ADDRGETNETWORKPARAMS } from "dns";
import prueba from "../models/prueba.js";


//contactos
export const renderpagconta = async (req, res) => {
  res.render("pages/Contactos");
}
export const renderpageForm = async (req, res) => {
  const recursos = await Recursos.find()
    .sort({ date: "desc" })
    .lean();
  if (req.user.tipo == "estudiante") {
    res.render("pages/recursos", { recursos });
  }
  if (req.user.tipo == "docente") {
    res.render("pages/recursosadmin", { recursos });
  }

};



export const renderREAForm = (req, res) => res.render("pages/FormularioREA");
export const renderquiz = async (req, res) => {
  const recurso = await Recursos.findById(req.params.id).lean();
  const prueba = await Prueba.find({ rea_id: req.params.id }).lean();
  res.render("pages/evaluacion", { recurso, prueba })

};
export const verEvaluacion = async (req, res) => {
  const id = req.params.id
  const evaluacion = await Examen.find().lean();
  var arreglo = []
  for (var i = 0; i < evaluacion.length; i++) {
    if (evaluacion[i]['rea_id'] == id) {
      arreglo.push(evaluacion[i])
    }
  }
  console.log(arreglo)
  res.render("pages/resultadosDocente", { arreglo })
};
export const verResultadoEvaluacion = async (req, res) => {
  const id = req.params.id
  const evaluacion = await Examen.find().lean();
  var arregloevaluacion = []
  for (var i = 0; i < evaluacion.length; i++) {
    if (evaluacion[i]['rea_id'] == id) {
      if (evaluacion[i]['user_id'] == req.user.id) {
        arregloevaluacion.push(evaluacion[i])
      }
    }
  }
  
  res.render("pages/resultadosEstudiante",{arregloevaluacion})
};
export const salvarEvaluacion = async (req, res) => {
  const opcion1 = JSON.parse(JSON.stringify(req.body.respuesta0))
  const opcion2 = JSON.parse(JSON.stringify(req.body.respuesta1))
  const opcion3 = JSON.parse(JSON.stringify(req.body.respuesta2))
  const opcion4 = JSON.parse(JSON.stringify(req.body.respuesta3))
  const opcion5 = JSON.parse(JSON.stringify(req.body.respuesta4))
  const id = req.params.id
  const prueba = await Prueba.find().lean();
  var suma = 0
  for (var i = 0; i < prueba.length; i++) {
    if (prueba[i]['rea_id'] == id) {
      if (prueba[i]['correcta'] == opcion1 || prueba[i]['correcta'] == opcion2
        || prueba[i]['correcta'] == opcion3 || prueba[i]['correcta'] == opcion4 || prueba[i]['correcta'] == opcion5) {
        suma = suma + 2
      }
    }
  }
  console.log('suma',suma)
  
  const nombreUsuario = await User.findById(req.user.id).lean();
  var arregloprueba=[]
  for (var i = 0; i < prueba.length; i++) {
    if (prueba[i]['rea_id'] == id) {
        arregloprueba.push(prueba[i])
      
    }
  }
  const newExamen = new Examen({nombre: nombreUsuario.name, paralelo: nombreUsuario.paralelo, respuesta1: opcion1,
    respuesta2: opcion2, respuesta3: opcion3, respuesta4: opcion4, respuesta5: opcion5, user_id: req.user.id, rea_id: id,
    nota: suma, op1pregunta1:arregloprueba[0]['opcion_a'],op1pregunta2:arregloprueba[0]['opcion_b'],op1pregunta3:arregloprueba[0]['opcion_c'],
    op2pregunta1:arregloprueba[1]['opcion_a'],op2pregunta2:arregloprueba[1]['opcion_b'],op2pregunta3:arregloprueba[1]['opcion_c'],
    op3pregunta1:arregloprueba[2]['opcion_a'],op3pregunta2:arregloprueba[2]['opcion_b'],op3pregunta3:arregloprueba[2]['opcion_c'],
    op4pregunta1:arregloprueba[3]['opcion_a'],op4pregunta2:arregloprueba[3]['opcion_b'],op4pregunta3:arregloprueba[3]['opcion_c'],
    op5pregunta1:arregloprueba[4]['opcion_a'],op5pregunta2:arregloprueba[4]['opcion_b'],op5pregunta3:arregloprueba[4]['opcion_c'],
    pregunta1:arregloprueba[0]['pregunta'], pregunta2:arregloprueba[1]['pregunta'],pregunta3:arregloprueba[2]['pregunta'],
    pregunta4:arregloprueba[3]['pregunta'],pregunta5:arregloprueba[4]['pregunta'],correcta1:arregloprueba[0]['correcta'],
    correcta2:arregloprueba[1]['correcta'],correcta3:arregloprueba[2]['correcta'],correcta4:arregloprueba[3]['correcta'],
    correcta5:arregloprueba[4]['correcta']
  });
  await newExamen.save();
  const evaluacion = await Examen.find().lean();
  var arregloevaluacion = []
  for (var i = 0; i < evaluacion.length; i++) {
    if (evaluacion[i]['rea_id'] == id) {
      if (evaluacion[i]['user_id'] == req.user.id) {
        arregloevaluacion.push(evaluacion[i])
      }
    }
  }
  res.render("pages/resultadosEstudiante", { suma,arregloevaluacion })
};

export const renderpageadminForm = async (req, res) => {
  const recursos = await Recursos.find()
    .sort({ date: "desc" })
    .lean();
  if (req.user.tipo == "estudiante") {
    res.render("pages/recursos", { recursos });
  }
  if (req.user.tipo == "docente") {
    res.render("pages/recursosadmin", { recursos });
  }

};


export const createNewREA = async (req, res) => {
  const { curso, asignatura, nombrerea, link, descripcion } = req.body;
  const img = req.files['image'][0];
  const reazip = req.files['compress'][0];
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
      errors, nombrerea, link,
    });
  console.log(req.file);
  const newRecursos = new Recursos({ curso, asignatura, nombrerea, link, descripcion, filename: img.filename, path: img.path, compress: reazip.filename, pathcompress: reazip.path });
  newRecursos.user = req.user.id;
  await newRecursos.save();
  req.toastr.success('Recurso agregado correctamente', "¡Exito!");
  res.redirect("/pages/recursosadmin");
};

//borrar
export const deleterea = async (req, res) => {
  const recurso = await Recursos.findById(req.params.id).lean();
  if (recurso.user != req.user.id) {
    req.toastr.error('Solo el autor del recurso puede editarlo', "Acción denegada");
    return res.redirect("/pages/recursosadmin");
  }
  await fs.unlink(recurso.path);
  await Recursos.findByIdAndDelete(req.params.id);
  req.toastr.success('Recurso eliminadocorrectamente', "¡Exito!");
  res.redirect("/pages/recursosadmin");
};

export const deleteanswer = async (req, res) => {
  const pregunta = await Prueba.findById(req.params.id).lean();
  if (pregunta.user != req.user.id) {
    req.toastr.error('Solo el autor del recurso puede editarlo', "Acción denegada");
    return res.redirect("/pages/agregarpregunta/" + pregunta.rea_id);
  }
  await Prueba.findByIdAndDelete(req.params.id);
  req.toastr.success('Recurso eliminadocorrectamente', "¡Exito!");
  res.redirect("/pages/agregarpregunta/" + pregunta.rea_id);
};
// editar rea

export const Editrea = async (req, res) => {
  const recurso = await Recursos.findById(req.params.id).lean();
  if (recurso.user != req.user.id) {
    req.toastr.error('Solo el autor del recurso puede editarlo', "Acción denegada");
    return res.redirect("/pages/recursosadmin");
  }
  res.render("pages/editarrea", { recurso });
};

export const updaterea = async (req, res) => {
  const { nombrerea, descripcion } = req.body;
  console.log(req.files)
  const recurso1 = await Recursos.findById(req.params.id).lean();
  if (recurso1.user != req.user.id) {
    req.toastr.error('Solo el autor del recurso puede editarlo', "Acción denegada");
    return res.redirect("/pages/recursosadmin");
  };
  
  if(req.files){
    await Recursos.findByIdAndUpdate(req.params.id, { nombrerea, descripcion });
    req.toastr.success('Recurso actualizado', "¡Exito!");
  res.redirect("/pages/recursosadmin");
  }

 
  
};





export const updatefondorea = async (req, res) => {
  const recurso1 = await Recursos.findById(req.params.id).lean();
  if (recurso1.user != req.user.id) {
    req.toastr.error('Solo el autor del recurso puede editarlo', "Acción denegada");
    return res.redirect("/pages/recursosadmin");
  };
  await fs.unlink(recurso1.path);
  await Recursos.findByIdAndUpdate(req.params.id, { filename: req.file.filename, path: req.file.path });
  res.redirect("/pages/edit/" + req.params.id);
  req.toastr.success('Imagen de fondo actualizada', "¡Exito!");
};

//cambiar contraseña_________________________________________________________________________________________________________________
export const rendercambiacontra = async (req, res) => {
  const users = await User.find()
    .sort({ date: "desc" })
    .lean();
  res.render("pages/Formulariocc", { users });
};

export const cambiacontra = async (req, res) => {
  const { email } = req.body;
  // verifica si existe el usuario
  const userFound = await User.findOne({ email: email });
  console.log(userFound);
  res.render("pages/Formulariocc-edit", { userFound });
  req.toastr.success('Usuario encontrado con exito', "¡Exito!");
};


export const updatecontra = async (req, res) => {
  console.log("en consola: " + req.params.id)
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
      errors, password, confirm_password,
    });
  }
  // Actualizar contraseña
  const update = new User({ password });
  update.password = await update.encryptPassword(password);
  const password1 = update.password;
  console.log("contra: " + password1);
  await User.findByIdAndUpdate(req.params.id, { password: password1 });
  req.toastr.success('Contraseña actualizada', "¡Exito!");
  res.redirect("/");
};

//________________________________________________________----
export const renderapregunta = async (req, res) => {
  const recurso = await Recursos.findById(req.params.id).lean();
  const prueba = await Prueba.find({ rea_id: req.params.id }).lean();
  res.render("pages/agregarpregunta", { prueba, recurso })
};
//________________________________________________________________________________
export const crearpregunta = async (req, res) => {
  const recurso = await Recursos.findById(req.params.id).lean();
  const prueba = await Prueba.find({ rea_id: req.params.id }).lean();
  const { pregunta, opcion_a, opcion_b, opcion_c, correcta } = req.body;
  const errors = [];
  if (!pregunta) {
    errors.push({ text: "Ingrese una pregunta" });
  }
  if (!opcion_a) {
    errors.push({ text: "Ingrese la opción A" });
  }
  if (!opcion_b) {
    errors.push({ text: "Ingrese la opción B" });
  }
  if (!opcion_c) {
    errors.push({ text: "Ingrese la opción C" });
  }
  if (!correcta) {
    errors.push({ text: "Idique la opción correcta" });
  }
  if (errors.length > 0)
    return res.render("pages/agregarpregunta", {
      errors, pregunta, opcion_a, opcion_b, opcion_c, correcta,
    });
  console.log(prueba.length);
  if (prueba.length == 5) {
    req.toastr.error('No se puede agregar mas de 5 preguntas', "¡Error!");
    return res.redirect("/pages/agregarpregunta/" + req.params.id);
  }
  const newpregunta = new Prueba({ pregunta, opcion_a, opcion_b, opcion_c, correcta });
  newpregunta.user = req.user.id;
  newpregunta.rea_id = req.params.id;
  await newpregunta.save();
  req.toastr.success('pregunta guardada correctamente', "¡Exito!");
  res.redirect("/pages/agregarpregunta/" + req.params.id);
};

