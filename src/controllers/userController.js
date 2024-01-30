const userService = require('../services/userService');

async function renderMenuPage(req, res, next) {
    res.render('menu.ejs');
}

async function renderUserRegistrationPage(req, res, next) {
    res.render('userRegister.ejs');
}

async function handleUserRegistration(req, res, next) {
    const { user, email, password } = req.body;

    const userModel = new User(user, email, password);

    try {
        const insertedUser = await userService.insertUser(userModel);
        // Responda conforme necessário, por exemplo, redirecionando para outra página
        res.redirect('/user/menu');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
async function getUserById(req, res, next) {
    const userId = req.params.id;

    try {
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function updateUser(req, res, next) {
    const userId = req.params.id;
    const updatedUserData = req.body;

    try {
        await userService.updateUser(userId, updatedUserData);
        res.status(200).send('User updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function deleteUser(req, res, next) {
    const userId = req.params.id;

    try {
        await userService.deleteUser(userId);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    renderMenuPage,
    renderUserRegistrationPage,
    handleUserRegistration
};