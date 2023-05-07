const { request, response } = require('express');
const Agradecimiento = require('../models/agradecimientos');

const colors = require('../helpers/colors');

const getAgradecimientos = async (req = request, res = response) => {
  const { limite = 6, desde = 0 } = req.query;

  // Se debe transformar a numero porque el limit espera un numero
  // Skip significa en este caso: comienza desde

  const foundAgradecimientos = await Agradecimiento.find({});
  const foundsAllsQty = foundAgradecimientos.length;
  const agradecimientos = await Agradecimiento.find({})
    .skip(Number(desde))
    .limit(Number(limite));

  const currentPageQty = agradecimientos.length;

  agradecimientos.forEach((agradecimiento, i) => {
    const colorIndex = i % colors.length;
    agradecimiento.color = colors[colorIndex];
  });

  res.json({
    agradecimientos,
    foundsAllsQty,
    currentPageQty,
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
