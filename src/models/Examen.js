import mongoose from "mongoose";
const ExamenSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    paralelo: {
      type: String,
      required: true,
    },
    respuesta1: {
      type: String,
      required: true,
    },
    respuesta2: {
      type: String,
      required: true,
    },
    respuesta3: {
      type: String,
      required: true,
    },
    respuesta4: {
      type: String,
      required: true,
    },
    respuesta5: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    rea_id: {
      type: String,
      required: true,
    },
    nota: {
      type: String,
      required: true,
    },
    op1pregunta1: {
      type: String,
      required: true,
    },
    op1pregunta2: {
      type: String,
      required: true,
    },
    op1pregunta3: {
      type: String,
      required: true,
    },
    op2pregunta1: {
      type: String,
      required: true,
    },
    op2pregunta2: {
      type: String,
      required: true,
    },
    op2pregunta3: {
      type: String,
      required: true,
    },
    op3pregunta1: {
      type: String,
      required: true,
    },
    op3pregunta2: {
      type: String,
      required: true,
    },
    op3pregunta3: {
      type: String,
      required: true,
    },
    op4pregunta1: {
      type: String,
      required: true,
    },
    op4pregunta2: {
      type: String,
      required: true,
    },
    op4pregunta3: {
      type: String,
      required: true,
    },
    op5pregunta1: {
      type: String,
      required: true,
    },
    op5pregunta2: {
      type: String,
      required: true,
    },
    op5pregunta3: {
      type: String,
      required: true,
    },
    pregunta1: {
      type: String,
      required: true,
    },
    pregunta2: {
      type: String,
      required: true,
    },
    pregunta3: {
      type: String,
      required: true,
    },
    pregunta4: {
      type: String,
      required: true,
    },
    pregunta5: {
      type: String,
      required: true,
    },
    correcta1: {
      type: String,
      required: true,
    },
    correcta2: {
      type: String,
      required: true,
    },
    correcta3: {
      type: String,
      required: true,
    },
    correcta4: {
      type: String,
      required: true,
    },
    correcta5: {
      type: String,
      required: true,
    },
    
  },

);
export default mongoose.model("Examen", ExamenSchema);