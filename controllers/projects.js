const { request, response } = require('express');
const Project = require('../models/projects');

const getProjects = async (req = request, res = response) => {
  const { limite = 6, desde = 0 } = req.query;

  const foundProjects = await Project.find({});
  const foundsAllsQty = foundProjects.length;
  const projects = await Project.find({})
    .skip(Number(desde))
    .limit(Number(limite));

  const currentPageQty = projects.length;

  res.json({
    agradecimientos,
    foundsAllsQty,
    currentPageQty,
  });
};

const postProjects = async (req = request, res = response) => {
  const { ownerProject, image, title, description } = req.body;

  try {
    const project = new Project({
      ownerProject,
      image,
      title,
      description,
    });
    await project.save();

    res.json({
      msg: 'Your project has been successfully published',
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = {
  getProjects,
  postProjects,
};
