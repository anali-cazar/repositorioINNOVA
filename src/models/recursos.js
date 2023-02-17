import mongoose from "mongoose";
const NoteSchema = new mongoose.Schema(
  {
    curso: {
      type: String,
      required: true,
    },
    asignatura: {
      type: String,
      required: true,
    },
    nombrerea: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    filename: { type: String 
    },
    path: { type: String 
    },
    compress: { type: String 
    },
    pathcompress: { type: String 
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


export default mongoose.model("Recursos", NoteSchema);
