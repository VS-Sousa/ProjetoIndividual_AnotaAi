var database = require('../database/config');

function createUser(name, email, nickname, password) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function createUser():", name, email, nickname, password);

    var query = `
        INSERT INTO Usuario (nome, email, apelido, senha) VALUES ('${name}', '${email}', '${nickname}', SHA2('${password}', 512));
    `; 

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function authenticateUser(user, password) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function authenticateUser():", user, password);

    var query = `
        SELECT * FROM Usuario WHERE (email = '${user}' OR apelido = '${user}') AND senha = SHA2('${password}', 512);
    `; 

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function updateUser(idUser, newName, newEmail, newNickname) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function updateUser():", idUser, newName, newEmail, newNickname);

    var query = `
        UPDATE Usuario SET nome = '${newName}', email = '${newEmail}', apelido = '${newNickname}' WHERE idUsuario = ${idUser};
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function findById(idUser) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function findById():", idUser);

    var query = `
        SELECT * FROM Usuario WHERE idUsuario = ${idUser};
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function verifyPassword(idUser, password) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function findById():", idUser, password);

    var query = `
        SELECT * FROM Usuario WHERE idUsuario = ${idUser} AND senha = SHA2('${password}', 512);
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

function changePassword(idUser, newPassword) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function findById():", idUser, newPassword);

    var query = `
        UPDATE Usuario SET senha = SHA2('${newPassword}', 512) WHERE idUsuario = ${idUser};
    `;

    console.log('Executando a query: \n', query)
    return database.executar(query);
}

module.exports = {
    createUser,
    authenticateUser,
    updateUser,
    findById,
    verifyPassword,
    changePassword
}