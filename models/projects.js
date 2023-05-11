const { Schema, model } = require('mongoose');

const ProjectSchema = Schema({
  ownerProject: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

ProjectSchema.methods.toJSON = function () {
  const { __v, ...project } = this.toObject();
  return project;
};

module.exports = model('Project', ProjectSchema);
