var database = require('../database/config');

function sendFriendshipRequest(idUser, idFriend) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function sendFriendshipRequest():");
    
    var query = `
        INSERT INTO Amizade VALUES (${idUser}, ${idFriend}, 'Pendente');
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function findFriendship(idUser, idFriend) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function findFriendship():");
    
    var query = `
        SELECT * FROM Amizade WHERE (fkUsuario = ${idUser} AND fkAmigo = ${idFriend}) OR (fkUsuario = ${idFriend} AND fkAmigo = ${idUser});
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

module.exports = {
    sendFriendshipRequest,
    findFriendship
}