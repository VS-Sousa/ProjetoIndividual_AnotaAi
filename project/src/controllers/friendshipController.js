var friendshipModel = require('../models/friendshipModel');
var usuarioModel = require('../models/userModel');

function sendFriendshipRequest(request, response) {
    var idUser = request.body.idUserServer;
    var nickname = request.body.nicknameServer;

    if (idUser == undefined) {
        response.status(403).send('Id do Usuário está indefinido!');
    } else if (nickname == undefined) {
        response.status(403).send('Id do Usuário está indefinido!');
    } else {
        usuarioModel.findByNickname(nickname).then(userExists => {
            if (userExists.length == 0) {
                response.status(404).send('Não existe nenhum usuário com este apelido');

            } else {
                friendshipModel.findFriendship(idUser, userExists[0].idUsuario).then(alreadyRelated => {
                    if (alreadyRelated.length == 0) {
                        friendshipModel.sendFriendshipRequest(idUser, userExists[0].idUsuario).then(result => {
                            var hasCreated = result.affectedRows;
        
                            if (hasCreated != 1) {
                                throw new Error('Houve um erro ao enviar solicitação de amizade');
                            }
        
                            response.json(result);
                        });

                    } else if (alreadyRelated[0].situacao == 'Amigo') {
                        response.status(403).send('Você e esse usuário já são amigos!');
                    } else if (alreadyRelated[0].fkUsuario == idUser) {
                        response.status(403).send('Esse usuário ainda não respondeu a última solicitação que você enviou.');
                    } else {
                        response.status(403).send('Esse usuário te enviou uma solicitação de amizade que você ainda não respondeu.');
                    }
                });

            }
        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao enviar solicitação de amizade! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

function getAllReceivedRequests(request, response) {
    var idUser = request.params.idUser;

    if (idUser == undefined) {
        response.status(403).send('Id do Usuário está indefinido!');
    } else {
        friendshipModel.getAllReceivedRequests(idUser).then(result => {
            response.json(result);
        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao recuperar solicitações de amizade recebidas! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

module.exports = {
    sendFriendshipRequest,
    getAllReceivedRequests
}