var listModel = require ('../models/listModel');

function addToList(request, response) {
    var idUser = request.params.idUser;
    var idItem = request.body.idItemServer;

    if (idUser == undefined) {
        response.status(400).send('Id do Usuário está indefinido');
    } else if (idItem == undefined) {
        response.status(400).send('Id do Item está indefinido');
    } else {
        listModel.verifyIfAlreadyInList(idUser, idItem).then(alreadyExists => {
            if (alreadyExists.length > 0) {
                response.status(403).send('Item já está na lista!');
                return;
            }

            listModel.addToList(idUser, idItem).then(result => {
                var hasInserted = result.affectedRows;

                if (hasInserted != 1) {
                    throw new Error('Houve um erro ao adicionar item à lista!');
                }

                response.json(result);
                
            }).catch(error => {
                console.log(error);
                console.log("\nHouve um erro ao ao adicionar item à lista! Erro: ", error.sqlMessage);
                response.status(500).json(error.sqlMessage);
            });

        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao verificar se item está na lista! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

function getAllItemsFromUserList(request, response) {
    var idUser = request.params.idUser;

    if (idUser == undefined) {
        response.status(400).send('Id do Usuário está indefinido');
    } else {
        listModel.getItemsFromListByUserId(idUser).then(result => {
            response.json(result);
        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao selecionar items da lista! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        })
    }
}

function updateStatus(request, response) {
    var idUser = request.params.idUser;
    var idItem = request.body.idItemServer;
    var oldStatus = request.body.oldStatusServer;
    var newStatus = request.body.newStatusServer;

    if (idUser == undefined) {
        response.status(400).send('Id do Usuário está indefinido');
    } else if (idItem == undefined) {
        response.status(400).send('Id do Item está indefinido');
    } else if (oldStatus == undefined) {
        response.status(400).send('Antiga situacao está indefinida');
    } else if (newStatus == undefined) {
        response.status(400).send('Nova situacao está indefinida');
    } else {
        listModel.updateStatus(idUser, idItem, newStatus, oldStatus).then(result => {
            var hasUpdated = result.affectedRows;

            if (hasUpdated != 1) {
                throw new Error('Houve um errro ao mudar a situação do item!');
            }

            response.json(result);
        }).catch(error => {
            console.log(error);
            console.log("\nHouve um errro ao mudar a situação do item! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        })
    }
}

function removeItemFromList(request, response) {
    var idUser = request.params.idUser;
    var idItem = request.params.idItem;

    if (idUser == undefined) {
        response.status(400).send('Id do Usuário está indefinido');
    } else if (idItem == undefined) {
        response.status(400).send('Id do Item está indefinido');
    } else {
        listModel.removeItemFromList(idUser, idItem).then(result => {
            var hasRemoved = result.affectedRows;

            if (hasRemoved != 1) {
                throw new Error('Houve um errro ao remover item da lista!');
            }

            response.json(result);
        }).catch(error => {
            console.log(error);
            console.log("\nHouve um errro ao remover item da lista! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

module.exports = {
    addToList,
    getAllItemsFromUserList,
    updateStatus,
    removeItemFromList
}