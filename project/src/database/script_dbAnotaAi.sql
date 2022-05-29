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
