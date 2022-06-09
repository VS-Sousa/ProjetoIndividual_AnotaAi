var itemModel = require('../models/itemModel');

function getAllItems(request, response) {
    itemModel.getAllItems().then(result => {
        console.log(`\nResultados encontrados: ${result.length}`);
        console.log(`Resultados: ${JSON.stringify(result)}`); // transforma JSON em String

        response.json(result);
    }).catch(error => {
        console.log(error);
        console.log("\nHouve um erro ao selecionar todos os items! Erro: ", error.sqlMessage);
        response.status(500).json(error.sqlMessage);
    });
}

module.exports = {
    getAllItems
}