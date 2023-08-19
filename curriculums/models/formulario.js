const mongoose = require('mongoose');

const formularioSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  telefono: String,
  puesto: String,
  experiencia: String,
  educacion: String,
  habilidades: String,
  referencias: String,
  mensaje: String,
  cvPath: String,
  cartaPath: String,
}, { timestamps: true });

const Formulario = mongoose.model('Formulario', formularioSchema);

module.exports = Formulario;
