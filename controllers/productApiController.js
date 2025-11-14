// Контроллер REST API для товаров

const { getModels } = require('../models');

// GET /api/products
async function list(req, res) {
    const { Product } = getModels();
    const products = await Product.findAll({ order: [['id', 'ASC']] });
    res.json(products);
}

// GET /api/products/:id
async function getOne(req, res) {
    const { Product } = getModels();
    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'not found' });
    res.json(item);
}

// POST /api/products
async function create(req, res) {
    const { Product } = getModels();
    const { name, brand, desc, price } = req.body;
    let { pic } = req.body;
    if (!pic || !pic.trim()) pic = 'https://yshio.ru/upload/medialibrary/ba0/cczr2vqn0y2sdcaacvqph2pcga7r8ki3.jpg';
    const created = await Product.create({ name, brand, desc, price, pic });
    res.status(201).json(created);
}

// PUT /api/products/:id
async function update(req, res) {
    const { Product } = getModels();
    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    const { name, brand, desc, price } = req.body;
    let { pic } = req.body;
    if (!pic || !pic.trim()) pic = 'https://yshio.ru/upload/medialibrary/ba0/cczr2vqn0y2sdcaacvqph2pcga7r8ki3.jpg';
    await item.update({ name, brand, desc, price, pic });
    res.json(item);
}

// DELETE /api/products/:id
async function remove(req, res) {
    const { Product } = getModels();
    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.destroy();
    res.status(204).send();
}

module.exports = { list, getOne, create, update, remove };