const { Router } = require("express");
const { insertMascota, insertMembresia } = require("../controllers/mascotas");

const router = Router();

router.post('/insertMascota', insertMascota);
router.post('/insertMembresia', insertMembresia);


module.exports = router;