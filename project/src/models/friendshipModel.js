var database = require('../database/config');

function sendFriendshipRequest(idUser, idFriend) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function sendFriendshipRequest():", idUser, idFriend);
    
    var query = `
        INSERT INTO Amizade VALUES (${idUser}, ${idFriend}, 'Pendente');
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function findFriendship(idUser, idFriend) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function findFriendship():", idUser, idFriend);
    
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
            (SELECT i.tipo FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = ag.idUsuario GROUP BY i.tipo ORDER BY COUNT(i.tipo) DESC LIMIT 1)
            as 'tipoPreferido',
            (SELECT i.genero FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = ag.idUsuario AND tipo = 'Música' GROUP BY i.genero ORDER BY COUNT(i.genero) DESC LIMIT 1)
            as 'generoMusica',
            (SELECT i.genero FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = ag.idUsuario AND tipo = 'Livro' GROUP BY i.genero ORDER BY COUNT(i.genero) DESC LIMIT 1)
            as 'generoLivro',
            (SELECT i.genero FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = ag.idUsuario AND tipo = 'Filme' GROUP BY i.genero ORDER BY COUNT(i.genero) DESC LIMIT 1)
            as 'generoFilme'
        FROM Amizade az
        INNER JOIN Usuario ag ON ag.idUsuario = az.fkUsuario
        WHERE az.fkAmigo = ${idUser} AND az.situacao = 'Pendente';
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function deleteFriendship(idUser, idFriend) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deleteFriendship():", idUser, idFriend);
    
    var query = `
        DELETE FROM Amizade WHERE fkUsuario = ${idUser} AND fkAmigo = ${idFriend}; 
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function acceptFriendshipRequests(idUser, idFriend) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function acceptFriendshipRequests():", idUser, idFriend);
    
    var query = `
        UPDATE Amizade SET situacao = 'Amigo' WHERE fkUsuario = ${idUser} AND fkAmigo = ${idFriend}; 
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function getAllFriends(idUser) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getAllFriends():", idUser);

    var query = `
        SELECT 
	        az.fkUsuario as 'idAmigo', 
            ag.nome,
            ag.apelido,
	        (SELECT i.tipo FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = ag.idUsuario GROUP BY i.tipo ORDER BY COUNT(i.tipo) DESC LIMIT 1)
            as 'tipoPreferido',
            (SELECT i.genero FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = ag.idUsuario AND tipo = 'Música' GROUP BY i.genero ORDER BY COUNT(i.genero) DESC LIMIT 1)
            as 'generoMusica',
            (SELECT i.genero FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = ag.idUsuario AND tipo = 'Livro' GROUP BY i.genero ORDER BY COUNT(i.genero) DESC LIMIT 1)
            as 'generoLivro',
            (SELECT i.genero FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = ag.idUsuario AND tipo = 'Filme' GROUP BY i.genero ORDER BY COUNT(i.genero) DESC LIMIT 1)
            as 'generoFilme',
            'Amigo' as 'papel'
        FROM Amizade az
        INNER JOIN Usuario ag ON ag.idUsuario = az.fkUsuario
        WHERE az.fkAmigo = ${idUser} AND az.situacao = 'Amigo'
	        UNION
        SELECT 
	        az.fkAmigo as 'idAmigo', 
            ag.nome,
            ag.apelido,
	        (SELECT i.tipo FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = az.fkAmigo GROUP BY i.tipo ORDER BY COUNT(i.tipo) DESC LIMIT 1)
            as 'tipoPreferido',
            (SELECT i.genero FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = az.fkAmigo AND tipo = 'Música' GROUP BY i.genero ORDER BY COUNT(i.genero) DESC LIMIT 1)
            as 'generoMusica',
            (SELECT i.genero FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = az.fkAmigo AND tipo = 'Livro' GROUP BY i.genero ORDER BY COUNT(i.genero) DESC LIMIT 1)
            as 'generoLivro',
            (SELECT i.genero FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = az.fkAmigo AND tipo = 'Filme' GROUP BY i.genero ORDER BY COUNT(i.genero) DESC LIMIT 1)
            as 'generoFilme',
            'Usuario' as 'papel'
        FROM Amizade az
        INNER JOIN Usuario ag ON ag.idUsuario = az.fkAmigo
        WHERE az.fkUsuario = ${idUser} AND az.situacao = 'Amigo'    
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function getAllFriendsToRecommend(idUser) {
    console.log("ACESSEI O AMIZADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getAllFriendsToRecommend():", idUser);

    var query = `
        SELECT 
	        az.fkUsuario as 'idAmigo', 
            ag.nome,
            ag.apelido,
	        (SELECT i.tipo FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = ag.idUsuario GROUP BY i.tipo ORDER BY COUNT(i.tipo) DESC LIMIT 1)
            as 'tipoPreferido',
            (SELECT i.genero FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = ag.idUsuario AND tipo = tipoPreferido GROUP BY i.genero ORDER BY COUNT(i.genero) DESC LIMIT 1)
            as 'generoPreferido',
            'Amigo' as 'papel'
        FROM Amizade az
        INNER JOIN Usuario ag ON ag.idUsuario = az.fkUsuario
        WHERE fkAmigo = ${idUser} AND az.situacao = 'Amigo'
	        UNION
        SELECT 
        	az.fkAmigo as 'idAmigo', 
            ag.nome,
            ag.apelido,
        	(SELECT i.tipo FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = az.fkAmigo GROUP BY i.tipo ORDER BY COUNT(i.tipo) DESC LIMIT 1)
            as 'tipoPreferido',
            (SELECT i.genero FROM Lista l INNER JOIN Item i ON i.idItem = l.fkItem WHERE l.fkUsuario = az.fkAmigo AND tipo = tipoPreferido GROUP BY i.genero ORDER BY COUNT(i.genero) DESC LIMIT 1)
            as 'generoPreferido',
            'Usuario' as 'papel'
        FROM Amizade az
        INNER JOIN Usuario ag ON ag.idUsuario = az.fkAmigo
        WHERE fkUsuario = ${idUser} AND az.situacao = 'Amigo'
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

module.exports = {
    sendFriendshipRequest,
    findFriendship,
    getAllReceivedRequests,
    deleteFriendship,
    acceptFriendshipRequests,
    getAllFriends,
    getAllFriendsToRecommend
}