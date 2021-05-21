const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
  esRoleValido,
  emailExiste,
  existeUsuaroiPorId,
} = require('../helpers/db-validators');

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require('../controllers/usuarios');

/**
 *  TODO: Siempre que usemos check, tendremos que usar
 * validarCampos ya que ahí se guardan los erroes  y nos
 * permite no ejecutar la ruta, o no llegar a ella
 * */

const router = Router();

router.get('/', usuariosGet);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check(
      'password',
      'El password es obligatorio y debe de ser mayor a 6 caracteres'
    )
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExiste),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom((rol) => esRoleValido(rol)),
    validarCampos,
  ],
  usuariosPost
);
router.put(
  '/:id',
  [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuaroiPorId),
    // Evita que el usuario ingrese roles no válidos
    check('rol').custom((rol) => esRoleValido(rol)),
    validarCampos,
  ],
  usuariosPut
);
router.patch('/', usuariosPatch);
router.delete(
  '/:id',
  [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuaroiPorId),
    validarCampos,
  ],

  usuariosDelete
);

module.exports = router;
