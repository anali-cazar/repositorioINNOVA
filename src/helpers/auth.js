export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.toastr.error('Primero debes iniciar sesión', "Error al acceder");
  res.redirect("/");
};
