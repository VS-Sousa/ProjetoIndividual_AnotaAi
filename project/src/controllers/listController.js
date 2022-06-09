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
                console.log("\nHouve um erro ao selecionar todos os items! Erro: ", error.sqlMessage);
                response.status(500).json(error.sqlMessage);
            });

        }).catch(error => {
            console.log(error);
            console.log("\nHouve um erro ao selecionar todos os items! Erro: ", error.sqlMessage);
            response.status(500).json(error.sqlMessage);
        });
    }
}

module.exports = {
    addToList
}