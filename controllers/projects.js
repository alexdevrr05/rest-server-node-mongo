const { request, response } = require('express');

const multer = require('multer');

const Project = require('../models/projects');
const { storage } = require('../helpers/multerStorage');

const getProjects = async (req = request, res = response) => {
  const { limite = 6, desde = 0 } = req.query;

  const foundProjects = await Project.find({});
  const foundsAllsQty = foundProjects.length;
  const projects = await Project.find({})
    .skip(Number(desde))
    .limit(Number(limite));

  const currentPageQty = projects.length;

  res.json({
    projects,
    foundsAllsQty,
    currentPageQty,
  });
};

const upload = multer({ storage });

const postProjects = async (req = request, res = response) => {
  try {
    // upload.single('file')(req, res, function (err)
    await upload.single('file')(req, res, () => {
      const { ownerProject, title, description } = req.body;
      // console.log('Archivo cargado correctamente:', req.file);

      const image = req.file.filename;

      const project = new Project({
        ownerProject,
        image,
        title,
        description,
      });

      project.save();

      res.json({
        project,
        msg: 'Proyecto publicado con éxito',
      });
    });
  } catch (err) {
    console.error('Error al cargar el archivo:', err);
    return res.status(500).json({
      msg: 'Error al cargar el archivo',
    });
  }
};

module.exports = {
  getProjects,
  postProjects,
};
