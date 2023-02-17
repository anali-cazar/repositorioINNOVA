import Recursos from "../models/recursos.js";
import User from "../models/User.js";
import Prueba from "../models/prueba.js";
export const renderIndex =async (req, res) => {
  const recursos = await Recursos.find()
  .sort({ date: "desc" })
  .lean();
  if (!req.user){
    res.render("index",{recursos});
  }else{
    if (req.user.tipo =="estudiante") {
      res.redirect('/pages/recursos');
    }
    if (req.user.tipo == "docente") {
      res.redirect('/pages/recursosadmin');
    }
  }
};

export const renderAbout = (req, res) => {
  res.render("about");
};
