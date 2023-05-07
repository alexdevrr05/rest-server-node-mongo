const { request, response } = require('express');
// const Agradecimiento = require('../models/agradecimientos');

const getAgradecimientos = async (req = request, res = response) => {
  res.json({
    msg: 'getagradecimientos',
  });
};

const postAgradecimientos = async (req = request, res = response) => {
  res.json({
    msg: 'postAgradecimientos',
  });
};

module.exports = {
  getAgradecimientos,
  postAgradecimientos,
};
