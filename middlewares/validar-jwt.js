const { request, response } = require('express');
const Usuario = require('../models/usuario');

const jwt = require('jsonwebtoken');

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No se ha mandando el token en la petición',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Leer al usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: 'Token no valido - usuario no existe en DB',
      });
    }

    // Verificar si el usuario tiene estado true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Token no valido - usuario con estado: false',
      });
    }

    req.usuario = usuario;

    res.json({
      usuario,
      token,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      msg: 'Token no válido',
    });
  }
};

module.exports = {
  validarJWT,
};
