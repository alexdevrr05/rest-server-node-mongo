const Mascota = require('../models/mascota');
const Membresia = require('../models/membresia');

const insertMascota = async (req = request, res = response) => {
  const {
    nombre,
    fecha_nacimiento,
    especie,
    raza,
    sexo,
    imagen = 'image',
  } = req.body;
  const mascota = new Mascota({
    nombre,
    fecha_nacimiento,
    especie,
    raza,
    sexo,
    imagen,
  });

  // Guardar en la db
  await mascota.save();

  res.json({
    mascota,
  });
};

const insertMembresia = async (req = request, res = response) => {
  const { id, propietario, fecha, costo, tipo_membresia } = req.body;

  const year = fecha.substring(fecha.length - 2);

  const yearNumber = Number(year) + 1;

  let fecha_vecimiento =
    fecha.substring(0, fecha.length - 2) + String(yearNumber);

  console.log(req.body);
  const membresia = new Membresia({
    id,
    propietario,
    fecha,
    costo,
    tipo_membresia,
    fecha_vecimiento,
  });

  // Guardar en la db
  await membresia.save();

  res.json({
    membresia,
  });
};

module.exports = {
  insertMascota,
  insertMembresia,
};
