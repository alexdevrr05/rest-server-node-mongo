const { Schema, model } = require('mongoose');

const AgradecimientoSchema = Schema({
  userName: {
    type: String,
    required: true,
  },
  agradecimientos: {
    type: String,
    required: true,
  },
});

module.exports = model('Agradecimiento', AgradecimientoSchema);
