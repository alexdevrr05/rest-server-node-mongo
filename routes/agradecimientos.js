const { Router } = require('express');
const {
  getAgradecimientos,
  postAgradecimientos,
} = require('../controllers/agradecimientos');

const router = Router();

router.get('/', getAgradecimientos);
router.post('/', postAgradecimientos);

module.exports = router;
