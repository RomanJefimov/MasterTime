// Промежуточные обработчики для проверки авторизации и роли

function requireAuth(req, res, next) {
    //Если пользователь не в сессии - отправляем на страницу логина
    if (!req.session.user) {
        return res.redirect('/login');
    } 
    next();
}

function requireAdmin(req,res, next) {
    // Доступ только для роли admin
    if (!req.session.user || req.session.user.rule !== 'admin') {
        return res.status(403).send('Forbidden');
    }
    next();
}

module.exports = { requireAuth, requireAdmin };