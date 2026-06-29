const { Router } = require('express');
const controller = require('../controllers/productController');

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.post('/seed', controller.seed);
router.delete('/:id', controller.remove);

module.exports = router;
