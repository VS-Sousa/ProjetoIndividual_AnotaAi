var database = require('../database/config');

function verifyIfAlreadyInList(idUser, idItem) {
    console.log("ACESSEI O LISTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verifyIfAlreadyInList():", idUser, idItem);

    var query = `
        SELECT * FROM Lista WHERE fkUsuario = ${idUser} AND fkItem = ${idItem};
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function addToList(idUser, idItem) {
    console.log("ACESSEI O LISTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function addToList():", idUser, idItem);

    var query = `
        INSERT INTO Lista (fkUsuario, fkItem, situacao, favorito, atualizado) VALUES (${idUser}, ${idItem}, 'Pendente', 'N', now());
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function getItemsFromListByUserId(idUser, recent) {
    console.log("ACESSEI O LISTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getItemsFromListByUserId():", idUser, recent);

    var query = `
        SELECT i.idItem, i.titulo, i.criador, i.genero, i.tipo, l.situacao, l.atualizado FROM Lista l INNER JOIN Item i ON l.fkItem = i.idItem WHERE l.fkUsuario = ${idUser} ORDER BY l.atualizado DESC
    `;

    if (recent) {
        query += ` LIMIT ${recent}`;
    }

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function updateStatus(idUser, idItem, newStatus) {
    console.log("ACESSEI O LISTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function addToList():", idUser, idItem,  newStatus);

    var query = `
        UPDATE Lista SET situacao = '${newStatus}', atualizado = now() WHERE fkUsuario = ${idUser} AND fkItem = ${idItem};
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function removeItemFromList(idUser, idItem) {
    console.log("ACESSEI O LISTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function removeItemFromList():", idUser, idItem);

    var query = `
        DELETE FROM Lista WHERE fkUsuario = ${idUser} AND fkItem = ${idItem};
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

module.exports = {
    verifyIfAlreadyInList,
    addToList,
    getItemsFromListByUserId,
    updateStatus,
    removeItemFromList
}