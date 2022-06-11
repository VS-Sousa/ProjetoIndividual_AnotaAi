var listModel = require('../models/listModel');
var friendshipModel = require('../models/friendshipModel');

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

module.exports = {
    getItemsAndFriends
}