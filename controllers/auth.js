const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-JWT');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Password son incorrectos - correo',
      });
    }

    // Si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario / Password son incorrectos - estado: false',
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password son incorrectos - password',
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    // 500: internal server error
    return res.status(500).json({
      msg: 'Hable con el administrador de la DB',
    });
  }
};

// Esto pertenece al proced. de google
// https://developers.google.com/identity/sign-in/web/backend-auth

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const googleUser = await googleVerify(id_token);

    console.log(googleUser);

    res.json({
      msg: 'Google Signin exitoso!',
    });
  } catch (error) {
    res.status(400).json({
      msg: 'Token de google no reconocido',
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
