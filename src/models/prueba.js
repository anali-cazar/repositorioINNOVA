import mongoose from "mongoose";
const PruebaSchema = new mongoose.Schema(
  {
    pregunta: {
      type: String,
      required: true,
    },
    opcion_a: {
      type: String,
      required: true,
    },
    opcion_b: {
      type: String,
      required: true,
    },
    opcion_c: {
      type: String,
      required: true,
    },
    correcta: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    rea_id: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


export default mongoose.model("Prueba", PruebaSchema);
