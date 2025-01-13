import mongoose from 'mongoose';

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
  confirmado: {
    type: Boolean,
    default: false,
  },
});

// Crear el modelo a partir del esquema
const Veterinario = mongoose.model('Veterinario', veterinarioSchema);

// Exportar el modelo correctamente
export default Veterinario;
