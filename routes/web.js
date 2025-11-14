const express = require('express');
const router = express.Router();

const { requireAuth, requireAdmin } = require('../middleware/auth');
const auth = require('../controllers/authController');
const product = require('../controllers/productController');

//Главная страница
router.get('/', product.listPage);

// Логин/Логаут
router.get('/login', auth.getLogin);
router.post('/login', auth.postLogin);
router.post('/logout', auth.postLogout);

// CRUD товаров (веб)
router.get('/products/new', requireAdmin, product.newForm);
router.post('/products', requireAdmin, product.create);
router.get('/products/:id/edit', requireAdmin, product.editForm);
router.post('/products/:id', requireAdmin, product.update);
router.post('/products/:id/delete', requireAdmin, product.remove);

module.exports = router;