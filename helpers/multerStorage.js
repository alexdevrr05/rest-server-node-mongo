const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now(); // Genera un identificador único basado en la fecha actual en milisegundos
    const fileExtension = path.extname(file.originalname); // Obtiene la extensión del archivo original
    const fileName = uniqueFilename + fileExtension; // Concatena el identificador con la extensión del archivo original

    cb(null, fileName); // Asigna el
  },
  fileFilter: function (req, file, cb) {
    // Verifica la extensión del archivo
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error(
          'Solo se permiten archivos de imagen con extensiones .jpg, .jpeg y .png'
        )
      );
    }
    cb(null, true);
  },
});

module.exports = {
  storage,
};
