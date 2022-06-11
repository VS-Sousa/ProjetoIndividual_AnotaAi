var listModel = require('../models/listModel');
var friendshipModel = require('../models/friendshipModel');
var recommendationModel = require('../models/recommendationModel');

function getItemsAndFriends(request, response) {
    var idUser = request.params.idUser;

    if (idUser == undefined) {
        response.status(403).send('Id do Usuário está indefinido!');
    } else {
        var objResposta = {
            friends: [],
            items: []
        }

        listModel.getItemsFromListByUserId(idUser).then(foundItems => {
            objResposta.items = foundItems;

            friendshipModel.getAllFriendsToRecommend(idUser).then(foundFriends => {
                objResposta.friends = foundFriends;

                response.json(objResposta);
            }).catch(error => {
                console.log(error);
                console.log("\nHouve um erro ao recuperar seus amigos! Erro: ", error.sqlMessage);
                response.status(500).json(error.sqlMessage);
            });

        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao recuperar itens da sua lista! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

function sendRecommendation(request, response) {
    var idUser = request.params.idUser;
    var idItem = request.body.idItemServer;
    var idFriend = request.body.idFriendServer;
    var recommendationDate = request.body.recommendationDateServer;

    if (idUser == undefined) {
        response.status(403).send('Id do Usuário está indefinido!');
    } else if (idItem == undefined) {
        response.status(403).send('Id do Item está indefinido!');
    } else if (idFriend == undefined) {
        response.status(403).send('Id do Amigo está indefinido!');
    } else {
        friendshipModel.findFriendship(idUser, idFriend).then(exists => {
            if (exists.length <= 0) {
                response.status(403).send('Você não pode indicar algo para um usuário que não é seu amigo!');
            } else {
                recommendationModel.findRecommendation(idUser, idItem, idFriend, recommendationDate).then(alreadyRecommended => {
                    if (alreadyRecommended.length > 0) {
                        response.status(403).send('Você já recomendou este item para esse usuário hoje!');
                    } else {
                        recommendationModel.sendRecommendation(idUser, idItem, idFriend, recommendationDate).then(result => {
                            response.json(result);
                        }).catch(error => {
                            console.log(error);
                            console.log("\nHouve um erro ao recomendar item à usuário! Erro: ", error.sqlMessage);
                            response.status(500).json(error.sqlMessage);
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    console.log("\nHouve um erro ao procurar recomendação! Erro: ", error.sqlMessage);
                    response.status(500).json(error.sqlMessage);
                });
            }
        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao procurar amizade! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    } 
}

module.exports = {
    getItemsAndFriends,
    sendRecommendation
}