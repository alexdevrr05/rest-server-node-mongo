const { Router } = require('express');
const { getProjects, postProjects } = require('../controllers/projects');

const router = Router();

router.get('/', getProjects);
router.post('/', postProjects);

module.exports = router;
