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
    CONSTRAINT CK_Item_tipo CHECK(tipo IN ('livro', 'musica', 'filme'))
);

-- Criando tabela Lista
CREATE TABLE Lista (
	fkUsuario INT NOT NULL,
	CONSTRAINT FK_Lista_fkUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario),
    
    fkItem INT NOT NULL,
    PRIMARY KEY (fkUsuario, fkItem),
    CONSTRAINT FK_Lista_fkItem FOREIGN KEY (fkItem) REFERENCES Item (idItem),
    
    situacao CHAR(9), 
    CONSTRAINT CK_Lista_situacao CHECK(situacao IN('pendente', 'progresso', 'concluido')),
    favorito CHAR(1),
    CONSTRAINT CK_Lista_favorito CHECK(favorito IN('S', 'N')),
    adicionado DATE NOT NULL,
    atualizado DATE NOT NULL
);

-- Criando tabela Amizade
CREATE TABLE Amizade (
	fkUsuario INT NOT NULL,
    CONSTRAINT FK_Amizade_fkUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario),
    
    fkAmigo INT NOT NULL,
    PRIMARY KEY (fkUsuario, fkAmigo),
    CONSTRAINT FK_Amizade_fkAmigo FOREIGN KEY (fkAmigo) REFERENCES Usuario (idUsuario),
    
    situacao CHAR(9), 
    CONSTRAINT CK_Amizade_situacao CHECK(situacao = 'pendente' OR situacao = 'amigo')
);

-- Criando tabela Indicacao
CREATE TABLE Indicacao (
	fkUsuario INT NOT NULL,
    CONSTRAINT FK_Indicacao_fkUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario),
    
    fkItem INT NOT NULL,
    CONSTRAINT FK_Indicacao_fkItem FOREIGN KEY (fkItem) REFERENCES Item (idItem),
    
    fkAmigo INT NOT NULL,
    CONSTRAINT FK_Indicacao_fkAmigo FOREIGN KEY (fkAmigo) REFERENCES Usuario (idUsuario),
    
    dataIndicacao INT NOT NULL,
    PRIMARY KEY (fkUsuario, fkItem, fkAmigo, dataIndicacao)
);

INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Um Girassol da Cor do Seu Cabelo', 'Lô Borges', 'MPB', 'musica');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Rato do Porto', 'Zé Ramalho', 'MPB', 'musica');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Chega de Saudade', 'Tom Jobim', 'Bossa Nova', 'musica');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('So What', 'Miles Davis', 'Jazz', 'musica');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('CORSO', 'Tyler, The Creator', 'Rap', 'musica');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('EARFQUAKE', 'Tyler, The Creator', 'Rap', 'musica');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Good Old-Fashioned Lover Boy', 'Queen', 'Rock', 'musica');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Leaving Home Ain\'t Easy', 'Queen', 'Rock', 'musica');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Black Dog', 'Led Zeppelin', 'Rock', 'musica');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Seigfried', 'Frank Ocean', 'R&B', 'musica');

INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Crime e Castigo', 'Fyodor Dostoevsky', 'Romance filosófico', 'livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('O Estrangeiro', 'Albert Camus', 'Romance filosófico', 'livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Heartstopper', 'Alice Oseman', 'Romance', 'livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Como fazer amigos e influenciar pessoas', 'Dale Carnegie', 'Auto Ajuda', 'livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('O Hobbit', 'J. R. R. Tolkien', 'Fantasia', 'livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Fantasia', 'livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Nemêsis', 'Agatha Christie', 'Fantasia', 'livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Assassinato no Expresso Oriente', 'Agatha Christie', 'Mistério', 'livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Macbeth', 'William Shakespeare', 'Tragédia', 'livro');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('O Retrato de Dorian Gray', 'Oscar Wilde', 'Romance filosófico', 'livro');

INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Quero ser John Malkovich?', 'Spike Jonze', 'Comédia', 'filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Taxi Driver', 'Martin Scorsese', 'Drama', 'filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Shrek', 'Andrew Adamson', 'Comédia', 'filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('A Origem', 'Christopher Nolan', 'Ficção científica', 'filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Whiplash: Em Busca da Perfeição', 'Damien Chazelle', 'Drama', 'filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Um Lugar Chamado Notting Hill', 'Roger Michell', 'Romance', 'filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Carrie, a Estranha', 'Brian De Palma', 'Terror', 'filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Wallace & Gromit: A Batalha dos Vegetais', 'Nick Park', 'Comédia', 'filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('Monty Python em Busca do Cálice Sagrado', 'Terry Gilliam', 'Comédia', 'filme');
INSERT INTO Item (titulo, criador, genero, tipo) VALUES ('A.I. - Inteligência Artificial', 'Steven Spielberg', 'Ficção científica', 'filme');

SELECT * FROM Item;
