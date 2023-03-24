const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  login
);

// Esto pertenece al proced. de google
// https://developers.google.com/identity/sign-in/web/backend-auth

router.post(
  '/google',
  [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);

module.exports = router;
