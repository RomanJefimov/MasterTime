// Контроллер авторизации: вход/выход пользователей

const bcrypt = require('bcryptjs');
const { getModels } = require('../models');

// GET /login - форма логина
async function getLogin(req, res) {
    //Если уже вошел - отправим на главную
    if (req.session.user) return res.redirect('/');
    const showError = Boolean(req.query.error);
        res.render('login', { title: 'Enter', showError });
}

// POST /login - обработка логина
async function postLogin(req, res) {
    const { email, password } = req.body;
    const { User } = getModels();

    // Ищем пользователя по enail
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.redirect('/login?error=1');
    }

    // Сверяем пароль
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.redirect('/login?error=1');
    }

    // Успешный вход - сохраняем нужны поля в сессию
    req.session.user = { id: user.id, name: user.name, email: user.email, rule: user.rule };
    res.redirect('/');
}

// POST /logout - выход
async function postLogout(req, res) {
    req.session.destroy(() => {
        res.redirect('/');
    });
}

module.exports = { getLogin, postLogin, postLogout };