-- Criando banco de dados dbAnotaAi
CREATE DATABASE dbAnotaAi;

-- Usando dbAnotaAi
USE dbAnotaAi;

-- Criando tabela Usuario
CREATE TABLE Usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    apelido VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha CHAR(128) NOT NULL,
    CONSTRAINT UK_Usuario_apelido UNIQUE(apelido),
    CONSTRAINT UK_Usuario_email UNIQUE(email)
);

-- Criando tabela Item
CREATE TABLE Item  (
	idItem INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45) NOT NULL,
    criador VARCHAR(45) NOT NULL,
    genero VARCHAR(45) NOT NULL,
    tipo CHAR(6) NOT NULL
    CONSTRAINT CK_Item_tipo CHECK(tipo IN ('Livro', 'Música', 'Filme'))
);

-- Criando tabela Lista
CREATE TABLE Lista (
	fkUsuario INT NOT NULL,
	CONSTRAINT FK_Lista_fkUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario),
    
    fkItem INT NOT NULL,
    PRIMARY KEY (fkUsuario, fkItem),
    CONSTRAINT FK_Lista_fkItem FOREIGN KEY (fkItem) REFERENCES Item (idItem),
    
    situacao CHAR(10), 
    CONSTRAINT CK_Lista_situacao CHECK(situacao IN('Pendente', 'Progresso', 'Finalizado')),
    favorito CHAR(1),
    CONSTRAINT CK_Lista_favorito CHECK(favorito IN('S', 'N')),
    adicionado DATE NOT NULL,
    iniciado DATE,
    finalizado DATE
);

-- Criando tabela Amizade
CREATE TABLE Amizade (
	fkUsuario INT NOT NULL,
    CONSTRAINT FK_Amizade_fkUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario),
    
    fkAmigo INT NOT NULL,
    PRIMARY KEY (fkUsuario, fkAmigo),
    CONSTRAINT FK_Amizade_fkAmigo FOREIGN KEY (fkAmigo) REFERENCES Usuario (idUsuario),
    
    situacao CHAR(9), 
    CONSTRAINT CK_Amizade_situacao CHECK(situacao = 'Pendente' OR situacao = 'Amigo')
);

-- Criando tabela Indicacao
CREATE TABLE Indicacao (
	fkUsuario INT NOT NULL,
    CONSTRAINT FK_Indicacao_fkUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario),
    
    fkItem INT NOT NULL,
    CONSTRAINT FK_Indicacao_fkItem FOREIGN KEY (fkItem) REFERENCES Item (idItem),
    
    fkAmigo INT NOT NULL,
    CONSTRAINT FK_Indicacao_fkAmigo FOREIGN KEY (fkAmigo) REFERENCES Usuario (idUsuario),
    PRIMARY KEY (fkUsuario, fkItem, fkAmigo)
);

INSERT INTO Usuario (nome, email, apelido, senha) VALUES ('Vinícius da Silva Sousa', 'vinicius.sousa@sptech.school', 'VS-Sousa', SHA2('MinhaSenhaSegura', 512));
INSERT INTO Usuario (nome, email, apelido, senha) VALUES ('Laura da Silva Sousa', 'laura.sousa@email.com', 'LauraDaves', SHA2('LufanaVerde', 512));

SELECT * FROM Usuario;

INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Um Girassol da Cor do Seu Cabelo', 'Lô Borges', 'MPB', 'Música');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Crime e Castigo', 'Fyodor Dostoevsky', 'Romance filosófico', 'Livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Quero ser John Malkovich', 'Spike Jonze', 'Comédia', 'Filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Rato do Porto', 'Zé Ramalho', 'MPB', 'Música');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('O Estrangeiro', 'Albert Camus', 'Romance filosófico', 'Livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Taxi Driver', 'Martin Scorsese', 'Drama', 'Filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Chega de Saudade', 'Tom Jobim', 'Bossa Nova', 'Música');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Heartstopper', 'Alice Oseman', 'Romance', 'Livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Shrek', 'Andrew Adamson', 'Comédia', 'Filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('So What', 'Miles Davis', 'Jazz', 'Música');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Como fazer amigos e influenciar pessoas', 'Dale Carnegie', 'Auto Ajuda', 'Livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('A Origem', 'Christopher Nolan', 'Ficção científica', 'Filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('CORSO', 'Tyler, The Creator', 'Rap', 'Música');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('O Hobbit', 'J. R. R. Tolkien', 'Fantasia', 'Livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Whiplash: Em Busca da Perfeição', 'Damien Chazelle', 'Drama', 'Filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('EARFQUAKE', 'Tyler, The Creator', 'Rap', 'Música');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Fantasia', 'Livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Um Lugar Chamado Notting Hill', 'Roger Michell', 'Romance', 'Filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Good Old-Fashioned Lover Boy', 'Queen', 'Rock', 'Música');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Nemêsis', 'Agatha Christie', 'Fantasia', 'Livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Carrie, a Estranha', 'Brian De Palma', 'Terror', 'Filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Leaving Home Ain\'t Easy', 'Queen', 'Rock', 'Música');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Assassinato no Expresso Oriente', 'Agatha Christie', 'Mistério', 'Livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Wallace & Gromit: A Batalha dos Vegetais', 'Nick Park', 'Comédia', 'Filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Black Dog', 'Led Zeppelin', 'Rock', 'Música');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Macbeth', 'William Shakespeare', 'Tragédia', 'Livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Monty Python em Busca do Cálice Sagrado', 'Terry Gilliam', 'Comédia', 'Filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Seigfried', 'Frank Ocean', 'R&B', 'Música');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('O Retrato de Dorian Gray', 'Oscar Wilde', 'Romance filosófico', 'Livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('A.I. - Inteligência Artificial', 'Steven Spielberg', 'Ficção científica', 'Filme');

SELECT * FROM Item;

SELECT
	ag.idUsuario as 'idAmigo',
    ag.apelido,
    it.titulo,
    it.criador,
    it.genero,
    it.tipo
FROM Indicacao ind
INNER JOIN Usuario ag ON ag.idUsuario = ind.fkUsuario
INNER JOIN Item it ON it.idItem = ind.fkItem
WHERE ind.fkAmigo = 2
