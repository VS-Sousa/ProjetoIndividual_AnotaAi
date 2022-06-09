var database = require('../database/config');

function getAllItems() {
    console.log("ACESSEI O ITEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getAllItems():");

    var query = `
        SELECT * FROM Item;
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

module.exports = {
    getAllItems
}