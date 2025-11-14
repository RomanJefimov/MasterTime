const express = require('express');
const router = express.Router();

const { requireAdmin } = require('../middleware/auth');
const api = require('../controllers/productApiController');

// Чтение доступно всем, изменение только админу
router.get('/products', api.list);
router.get('/products/:id', api.getOne);
router.post('/products', requireAdmin, api.create);
router.put('/products/:id', requireAdmin, api.update);
router.delete('/products/:id', requireAdmin, api.remove);

module.exports = router;