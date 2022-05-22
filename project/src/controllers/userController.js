var userModel = require('../models/userModel');

function signUp(request, response) {
    var name = request.body.nameServer;
    var email = request.body.emailServer;
    var nickname = request.body.nicknameServer;
    var password = request.body.passwordServer;

    if (name == undefined) {
        response.status(403).send('Nome está indefinido!');
    } else if (email == undefined) {
        response.status(403).send('Email está indefinido!');
    } else if (nickname == undefined) {
        response.status(403).send('Apelido está indefinido!');
    } else if (password == undefined) {
        response.status(403).send('Senha está indefinido!');
    } else {
        userModel.createUser(name, email, nickname, password).then(result => {
            response.json(result);
        }).catch(error => {
            var wasUKNickname = error.sqlMessage.includes('UK_Usuario_apelido');
            var wasUKEmail = error.sqlMessage.includes('UK_Usuario_email');

            console.log(error);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", error.sqlMessage);

            if (wasUKNickname) {
                response.status(403).send('Apelido já está em uso!');
            } else if (wasUKEmail) {
                response.status(403).send('Email já está em uso!');
            } else {
                response.status(500).json(error.sqlMessage);
            }
        });
    }
}

module.exports = {
    signUp
}