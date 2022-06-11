var friendshipModel = require('../models/friendshipModel');
var usuarioModel = require('../models/userModel');

function sendFriendshipRequest(request, response) {
    var idUser = request.body.idUserServer;
    var nickname = request.body.nicknameServer;

    if (idUser == undefined) {
        response.status(403).send('Id do Usuário está indefinido!');
    } else if (nickname == undefined) {
        response.status(403).send('Id do Amigo está indefinido!');
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

function refuseFriendshipRequest(request, response) {
    var idReceiver = request.params.idReceiver;
    var idSender = request.params.idSender;

    if (idReceiver == undefined) {
        response.status(403).send('Id do Usuário está indefinido!');
    } else if (idSender == undefined) {
        response.status(403).send('Id do Amigo está indefinido!');
    } else {
        friendshipModel.deleteFriendship(idSender, idReceiver).then(result => {
            var hasDeleted = result.affectedRows;
        
            if (hasDeleted != 1) {
                throw new Error('Houve um erro ao recusar solicitação de amizade');
            }

            response.json(result);

        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao recusar solicitação de amizade! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

function acceptFriendshipRequest(request, response) {
    var idReceiver = request.params.idReceiver;
    var idSender = request.params.idSender;

    if (idReceiver == undefined) {
        response.status(403).send('Id do Usuário está indefinido!');
    } else if (idSender == undefined) {
        response.status(403).send('Id do Amigo está indefinido!');
    } else {
        friendshipModel.acceptFriendshipRequests(idSender, idReceiver).then(result => {
            var hasUpdated = result.affectedRows;
        
            if (hasUpdated != 1) {
                throw new Error('Houve um erro ao aceitar solicitação de amizade');
            }

            response.json(result);

        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao aceitar solicitação de amizade! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

function getAllFriends(request, response) {
    var idUser = request.params.idUser;

    if (idUser == undefined) {
        response.status(403).send('Id do Usuário está indefinido!');
    } else {
        friendshipModel.getAllFriends(idUser).then(result => {
            response.json(result);
        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao recuperar todas as amizades! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

function deleteFriendship(request, response) {
    var idReceiver = request.params.idReceiver;
    var idSender = request.params.idSender;

    if (idReceiver == undefined) {
        response.status(403).send('Id do Usuário está indefinido!');
    } else if (idSender == undefined) {
        response.status(403).send('Id do Amigo está indefinido!');
    } else {
        friendshipModel.deleteFriendship(idSender, idReceiver).then(result => {
            var hasDeleted = result.affectedRows;
        
            if (hasDeleted != 1) {
                throw new Error('Houve um erro ao excluir amizade');
            }

            response.json(result);

        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao excluir amizade! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

module.exports = {
    sendFriendshipRequest,
    getAllReceivedRequests,
    refuseFriendshipRequest,
    acceptFriendshipRequest,
    getAllFriends,
    deleteFriendship
}