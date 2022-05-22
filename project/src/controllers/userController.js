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

function signIn(request, response) {
    var user = request.body.userServer;
    var password = request.body.passwordServer;

    if (user == undefined) {
        response.status(403).send('Email/Apelido e/ou Senha inválido!')
    } else if (password == undefined) {
        response.status(403).send('Email/Apelido e/ou Senha inválido!')
    } else {
        userModel.authenticateUser(user, password).then(result => {
            console.log(`\nResultados encontrados: ${result.length}`);
            console.log(`Resultados: ${JSON.stringify(result)}`); // transforma JSON em String

            if (result.length == 1) {
                console.log(result[0]);
                response.json(result[0]);
            } else if (result.length < 1) {
                response.status(403).send('Email/Apelido e/ou Senha inválido!')
            } else {
                response.status(403).send('Mais de um usuário com essa combinação de email e senha')
            }
        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

module.exports = {
    signUp,
    signIn
}