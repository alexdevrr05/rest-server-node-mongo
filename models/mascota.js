const { Schema, model } = require('mongoose');

const MascotaSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },

  fecha_nacimiento: {
    type: String,
    required: [true, 'La fecha nacimiento es obligatoria'],
  },

  especie: {
    type: String,
    required: [true, 'La especie es obligatorio'],
  },

  raza: {
    type: String,
    required: [true, 'La raza es obligatorio'],
  },

  sexo: {
    type: String,
    required: [true, 'El sexo es obligatorio'],
  },

  imagen: {
    type: String,
  },
});


/*
 Remueve __v y password al mostrar   
  res.json({
    usuario,
  }); 
*/

module.exports = model('Mascota', MascotaSchema);
