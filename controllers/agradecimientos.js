const { request, response } = require('express');
const Agradecimiento = require('../models/agradecimientos');

const getAgradecimientos = async (req = request, res = response) => {
  const agradecimientos = await Agradecimiento.find({});

  res.json({
    data: agradecimientos,
  });
};

const postAgradecimientos = async (req = request, res = response) => {
  const { nombre, agradecimientos } = req.body;

  try {
    const agradecimiento = new Agradecimiento({
      userName: nombre,
      agradecimientos,
    });
    await agradecimiento.save();

    res.json({
      msg: 'Agradecimientos guardados con éxito',
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = {
  getAgradecimientos,
  postAgradecimientos,
};
