const express = require('express');
const router = express.Router();
const multer = require('multer'); // Para manejar la subida de archivos
const path = require('path'); // Importa el módulo path

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre único del archivo
  },
});

const upload = multer({ storage: storage });

const Formulario = require('../models/formulario'); // Reemplaza con el nombre de tu modelo

// Ruta para manejar la solicitud GET del formulario
router.get('/', function(req, res) {
  res.render('index'); // Renderiza index.pug
});

// Ruta para manejar la solicitud POST del formulario
router.post('/submit', upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'carta', maxCount: 1 }]), async function (req, res, next) {
  try {
    // Crear una instancia del modelo Formulario con los datos del cuerpo de la solicitud
    const formulario = new Formulario({
      nombre: req.body.nombre,
      correo: req.body.correo,
      telefono: req.body.telefono,
      puesto: req.body.puesto,
      experiencia: req.body.experiencia,
      educacion: req.body.educacion,
      habilidades: req.body.habilidades,
      referencias: req.body.referencias,
      mensaje: req.body.mensaje,
      cvPath: req.files['cv'][0].path, // Ruta del archivo CV
      cartaPath: req.files['carta'][0].path, // Ruta del archivo Carta
    });

    // Guardar el formulario en la base de datos
    await formulario.save();

    res.redirect('/'); // Redirigir a la página principal o a donde desees

  } catch (error) {
    next(error);
  }
});

module.exports = router;
