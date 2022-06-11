var database = require('../database/config');

function sendRecommendation(idUser, idItem, idFriend) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function sendRecommendation():", idUser, idItem, idFriend);

    var query = `
        INSERT INTO Indicacao VALUES (${idUser}, ${idItem}, ${idFriend});
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function findRecommendation(idUser, idItem, idFriend) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function findRecommendation():", idUser, idItem, idFriend);

    var query = `
        SELECT * FROM Indicacao WHERE fkUsuario = ${idUser} AND fkItem = ${idItem} AND fkAmigo = ${idFriend};
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function getAllReceivedRecommendations(idUser) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function findRecommendation():", idUser);

    var query = `
        SELECT
            ag.idUsuario as 'idAmigo',
            ag.apelido,
            it.idItem,
            it.titulo,
            it.criador,
            it.genero,
            it.tipo
        FROM Indicacao ind
        INNER JOIN Usuario ag ON ag.idUsuario = ind.fkUsuario
        INNER JOIN Item it ON it.idItem = ind.fkItem
        WHERE ind.fkAmigo = ${idUser};
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function deleteRecommendation(idUser, idItem, idFriend) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deleteRecommendation():", idUser, idItem, idFriend);

    var query = `
        DELETE FROM Indicacao WHERE fkUsuario = ${idUser} AND fkItem = ${idItem} AND fkAmigo = ${idFriend};
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

module.exports = {
    sendRecommendation,
    findRecommendation,
    getAllReceivedRecommendations,
    deleteRecommendation
}