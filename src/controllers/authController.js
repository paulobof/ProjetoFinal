const authService = require('../services/authService');

function renderLoginPage(req, res) {
    res.render('login.ejs');
};

function login(req, res, next) {    
    const {email, password} = req.body;    

    let cookieString = authService.login(email, password);

    const produtos = [
        { nome: 'Produto 1', descricao: 'Descrição do Produto 1' },
        { nome: 'Produto 2', descricao: 'Descrição do Produto 2' },
      ];

    if(cookieString == null){
        return res.redirect('/');
    } else {
        res.setHeader('Set-Cookie', cookieString);
        res.render('profile.ejs', { produtos });
    }

};

function logout(req, res, next) {
    authService.logout(req, res);
};

module.exports = {
    renderLoginPage,
    login,
    logout
};