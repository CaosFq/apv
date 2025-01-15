import mongoose from 'mongoose';
import bcrypt from'bcrypt';
import generarId from '../helpers/generarId.js';

// Definir el esquema
const veterinarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  telefono: {
    type: String,
    default: null,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  web: {
    type: String,
    default: null,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  token:{
    type: String,
    default: generarId(),
  },
  confirmado: {
    type: Boolean,
    default: false,
  },
});

// Encriptar la contraseña antes de guardarla en la base de datos
veterinarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
veterinarioSchema.methods.comprobarPassword = async function(
  passwordFormulario
) {
  return await bcrypt.compare(passwordFormulario, this.password);
};


// Crear el modelo a partir del esquema
const Veterinario = mongoose.model('Veterinario', veterinarioSchema);

// Exportar el modelo correctamente
export default Veterinario;
