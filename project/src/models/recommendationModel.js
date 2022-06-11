var database = require('../database/config');

function sendRecommendation(idUser, idItem, idFriend, date) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function sendRecommendation():", idUser, idItem, idFriend, date);

    var query = `
        INSERT INTO Indicacao VALUES (${idUser}, ${idItem}, ${idFriend}, '${date}');
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function findRecommendation(idUser, idItem, idFriend, date) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function findRecommendation():", idUser, idItem, idFriend, date);

    var query = `
        SELECT * FROM Indicacao WHERE fkUsuario = ${idUser} AND fkItem = ${idItem} AND fkAmigo = ${idFriend} AND dataIndicacao = '${date}';
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

module.exports = {
    sendRecommendation,
    findRecommendation
}