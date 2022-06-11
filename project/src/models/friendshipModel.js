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

function getAllReceivedRequests(idUser) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getAllRequestsByUserId():", idUser);

    var query = `
        SELECT 
            ag.idUsuario, 
            ag.apelido,
            (
                SELECT 
                    i.tipo 
                FROM Lista l 
                INNER JOIN Item i ON i.idItem = l.fkItem 
                WHERE l.fkUsuario = ag.idUsuario 
                GROUP BY i.tipo 
                ORDER BY COUNT(i.tipo) DESC 
                LIMIT 1
            )
            as 'tipoPreferido',
            (
                SELECT i.genero 
                FROM Lista l 
                INNER JOIN Item i ON i.idItem = l.fkItem 
                WHERE l.fkUsuario = ag.idUsuario AND tipo = 'Música' 
                GROUP BY i.genero 
                ORDER BY COUNT(i.genero) DESC 
                LIMIT 1
            )
            as 'generoMusica',
            (
                SELECT i.genero 
                FROM Lista l 
                INNER JOIN Item i ON i.idItem = l.fkItem 
                WHERE l.fkUsuario = ag.idUsuario AND tipo = 'Livro' 
                GROUP BY i.genero 
                ORDER BY COUNT(i.genero) DESC 
                LIMIT 1
            )
            as 'generoLivro',
            (
                SELECT i.genero 
                FROM Lista l 
                INNER JOIN Item i ON i.idItem = l.fkItem 
                WHERE l.fkUsuario = ag.idUsuario AND tipo = 'Filme' 
                GROUP BY i.genero 
                ORDER BY COUNT(i.genero) DESC 
                LIMIT 1
            )
            as 'generoFilme'
        FROM Amizade az
        INNER JOIN Usuario ag ON ag.idUsuario = az.fkUsuario
        WHERE fkAmigo = ${idUser} AND az.situacao = 'Pendente';
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

module.exports = {
    sendFriendshipRequest,
    findFriendship,
    getAllReceivedRequests
}