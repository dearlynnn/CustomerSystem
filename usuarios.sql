CREATE DATABASE usuarios;

USE usuarios;

CREATE TABLE clientes (
	id_cliente INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    password VARCHAR(10) NOT NULL,
    ciudad TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono INT(20) NOT NULL,
    direccion TEXT NOT NULL
);

CREATE TABLE usuario (
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(20),
    password VARCHAR(10)
);