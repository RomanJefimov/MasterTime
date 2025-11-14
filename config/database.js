// Инициализация подключения к MysQL и создание БД при необходимости
// Используем mysql2 для сохдания БД и Sequelize для ORM

const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

// Создаем (если нужно) БД и возвращаем инстанс Sequelize
async function createSequelize() {
    //Читаем конфиг из переменных окружения
    const host = process.env.DB_HOST || 'localhost';
    const port = Number(process.env.DB_PORT || 3306);
    const user = process.env.DB_USER || 'root';
    const pass = process.env.DB_PASS || '';
    const dbName = process.env.DB_NAME || 'MasterTime';

    // Сначала подключчаемся к серверу без указания базы
    const connection = await mysql.createConnection({ host, port, user, password: pass });
    // Создаем БД при отсутствии
    await connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await connection.end();

    // Инициализируем Sequelize к только что созданной (или существующей) БД
    const sequelize = new Sequelize(dbName, user, pass, {
        host,
        port,
        dialect: 'mysql',
        logging: false
    });

    return sequelize;
}

module.exports = { createSequelize };