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
            console.log("\nHouve um erro ao realizar o login! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

function updateUser(request, response) {
    var idUser = request.params.idUser;
    var newName = request.body.newNameServer;
    var newEmail = request.body.newEmailServer;
    var newNickname = request.body.newNicknameServer;

    if (idUser == undefined) {
        response.status(403).send('Id do Usuário está indefinido')
    } else if (newName == undefined) {
        response.status(403).send('Novo nome está indefinido')
    } else if (newEmail == undefined) {
        response.status(403).send('Novo email está indefinido')
    } else if (newNickname == undefined) {
        response.status(403).send('Novo apelido está indefinido')
    } else {
        userModel.updateUser(idUser, newName, newEmail, newNickname).then(result => {
            var hasUpdated = result.affectedRows;

            if (hasUpdated != 1) {
                throw new Error('Houve um erro ao atualizar o usuário');
            }

            userModel.findById(idUser).then(updatedUser => {
                response.json(updatedUser[0]);
            }).catch(error => {
                console.log(error);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", error.sqlMessage);
                response.status(500).json(error.sqlMessage);
            });
        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao realizar a atualização do cadastro do usuário! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

function changePassword(request, response) {
    var idUser = request.params.idUser;
    var password = request.body.passwordServer;
    var newPassword = request.body.newPasswordServer;

    if (idUser == undefined) {
        response.status(403).send('Id do Usuário está indefinido')
    } else if (password == undefined) {
        response.status(403).send('Senha atual está indefinido')
    } else if (newPassword == undefined) {
        response.status(403).send('Nova senha está indefinido')
    } else {
        userModel.verifyPassword(idUser, password).then(result => {
            if (result.length <= 0) {
                response.status(403).json('Senha atual informada está incorreta');
                throw new Error('Senha atual informada está incorreta');
            }

            userModel.changePassword(idUser, newPassword).then(_ => {
                userModel.findById(idUser).then(updatedUser => {
                    response.json(updatedUser[0]);
                }).catch(error => {
                    console.log(error);
                    console.log("\nHouve um erro ao recuperar usuário! Erro: ", error.sqlMessage);
                    response.status(500).json(error.sqlMessage);
                });

            }).catch(error => {
                console.log(error);
                console.log("\nHouve um erro ao tentar mudar a senha! Erro: ", error.sqlMessage);
                response.status(500).json(error.sqlMessage);
            });

        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao verificar senha antiga! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}


function getNotifications(request, response) {
    var idUser = request.params.idUser;

    if (idUser == undefined) {
        response.status(403).send('Id do Usuário está indefinido')
    } else {
        userModel.getNotifications(idUser).then(result => {
            response.json(result[0]);
        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao obter notificações! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

function getUserPreferences(request, response) {
    var idUser = request.params.idUser;

    if (idUser == undefined) {
        response.status(403).send('Id do Usuário está indefinido')
    } else {
        userModel.getUserPreferences(idUser).then(result => {
            response.json(result[0]);
        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao obter suas preferências! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

module.exports = {
    signUp,
    signIn,
    updateUser,
    changePassword,
    getNotifications,
    getUserPreferences
}