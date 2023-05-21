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
  color: {
    type: String,
  },
  userImage: {
    type: String,
  },
  email: {
    type: String,
  },
});

AgradecimientoSchema.methods.toJSON = function () {
  const { __v, ...agradecimiento } = this.toObject();
  return agradecimiento;
};

module.exports = model('Agradecimiento', AgradecimientoSchema);
