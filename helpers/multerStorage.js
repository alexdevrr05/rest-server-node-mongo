const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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
