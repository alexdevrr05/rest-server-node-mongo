const { Schema, model } = require('mongoose');

const MembresiaSchema = Schema({
  id: {
    type: String,
  },

  propietario: {
    type: String,
    required: [true, 'El propietario es obligatorio'],
  },

  tipo_membresia: {
    type: String,
    required: true,
  },

  fecha: {
    type: String,
    required: [true, 'La fecha_inicio es obligatoria'],
  },

  costo: {
    type: String,
    required: [true, 'El costo es obligatorio'],
  },

  fecha_vecimiento: {
    type: String,
  },
});

module.exports = model('Membresia', MembresiaSchema);
