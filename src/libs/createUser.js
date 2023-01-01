import User from "../models/User.js";

export const createAdminUser = async () => {
  const userFound = await User.findOne({ email: "admin@localhost" });

  if (userFound) return;

  const newUser = new User({
    name: "admin",
    tipo:"docente",
    email: "admin@localhost",
    filename:"https://res.cloudinary.com/ddysuykam/image/upload/v1671764124/UNL3_mxihbz.png",
    public_id:"UNL3_mxihbz",
  });

  newUser.password = await newUser.encryptPassword("admin");

  const admin = await newUser.save();

  console.log("Usuario Administrador creado", admin);
};
