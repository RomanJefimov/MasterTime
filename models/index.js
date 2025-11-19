const bcrypt = require('bcryptjs');  
const { Sequelize } = require('sequelize');  
const { createSequelize } = require('../config/database');
const defineUser = require('./User');         
const defineProduct = require('./Product');
const users_data = require('./users_data'); 

let sequelize;
let User;
let Product;

async function initDb() {

sequelize = await createSequelize(); 
User = defineUser(sequelize);

    Product = defineProduct(sequelize);

    //Синхронизируем модели (создаем таблицы при отсутствии)
    await sequelize.sync();

    await users_data(User);
    // Начальные товары: добавим 6, если их меньше 6
    const productsCount = await Product.count();
    if (productsCount < 6) {
        const needed = 6 - productsCount;
        const baseDesc = 'Sample product description for demo purposes.';
        const pic = '/img/pic.jpg';
        const existing = await Product.findAll({ attributes: ['name'] });
        const existingNames = new Set(existing.map((p) => p.name));

        const items = [];
        for (let i = 1; i <= 6; i++) {
            const name = `Demo Product ${i}`;
            const brand = `Demo brand ${i}`; 
            if (!existingNames.has(name)) {
                items.push({ name, brand, desc: baseDesc, price: (i * 10).toFixed(2), pic });
            }
        }
        if (items.length) {
            await Product.bulkCreate(items);
        }
    }

    return sequelize;
}

function getModels() {
    if (!sequelize) throw new Error('DB not initialized yet');
    return { sequelize, User, Product };
}

module.exports = { initDb, getModels };