const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  // Solo quiero mostrar los usuarios que estén activos
  const query = { estado: true };

  // Se debe transformar a numero porque el limit espera un numero
  // Skip significa en este caso: comienza desde
  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await Usuario.countDocuments(query);

  /*
    Promise.all ejecuta ambas tareas de manera simultanea
    y si una falla, ambas fallan
  */

  // TODO referencia antes de la desesctructuración de arreglos
  // const resp = await Promise.all([
  //   Usuario.countDocuments(query),
  //   Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  // ]);

  // Podemos hacer una desesctructuración de arreglos

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, email, password, rol } = req.body;

  const usuario = new Usuario({ nombre, email, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en la db
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;

  /**
   * Excluimos password, google y email para que no se puedan
   * actualizar y lo demás "resto", si
   */
  const { _id, password, google, email, ...resto } = req.body;

  // TODO: validar contra base de datos
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    // Cuando se actualizan los datos (PUT) se vuelve a encriptar la password
    resto.password = bcryptjs.hashSync(password, salt);
  }

  // 1er argumento: Buscar por id
  // 2do argumento: ¿Qué va a actualizar?
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: 'usuariosPatch - Controlador',
  });
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;
  // Lo borramos fisicamente
  // const usuario = await Usuario.findByIdAndDelete(id);

  /**
   * Es más recomendable pasar el registro a false
   * que borrarlo fisicamente
   */

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
