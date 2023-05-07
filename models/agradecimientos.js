const { Schema, model } = require('mongoose');

const AgradecimientoSchema = Schema({
  userName: {
    type: String,
    required: true,
  },
  agradecimiento: {
    type: String,
    required: true,
  },
});

module.exports = model('Agradecimiento', AgradecimientoSchema);
