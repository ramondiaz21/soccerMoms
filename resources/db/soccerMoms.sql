-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.17-log - MySQL Community Server (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para sode
DROP DATABASE IF EXISTS 'soccerMoms';
CREATE DATABASE IF NOT EXISTS 'soccerMoms' /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE 'soccerMoms';

DROP TABLE IF EXISTS usuarios;
CREATE TABLE IF NOT EXISTS usuarios(
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  rol INT(11) NOT NULL,
  status INT(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (id)
)
COLLATE='utf8_bin'
;

DROP TABLE IF EXISTS cat_roles;
CREATE TABLE IF NOT EXISTS cat_roles(
  id INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  status INT(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (id)
)
COLLATE='utf8_bin'
;

INSERT INTO cat_roles(nombre,status) VALUES('administrador',1);
INSERT INTO cat_roles(nombre,status) VALUES('usuario',1);

DROP TABLE IF EXISTS equipos;
CREATE TABLE IF NOT EXISTS equipos(
  id INT(11) NOT NULL AUTO_INCREMENT,
  usuario INT(11) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  status INT(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (id)
)
COLLATE='utf8_bin'
;

DROP TABLE IF EXISTS jugadoras;
CREATE TABLE IF NOT EXISTS jugadoras (
  id INT(11) NOT NULL AUTO_INCREMENT,
  equipo INT(11) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(50) NOT NULL,
  imagen VARCHAR(255) NOT NULL,
  archivo VARCHAR(255) NOT NULL,
  status INT(11) NOT NULL DEFAULT '1',
  creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualización TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
COLLATE='utf8_bin'
;

DROP TABLE IF EXISTS `archivo_detalles`;
CREATE TABLE IF NOT EXISTS `archivo_detalles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_jugadora` int(11) NOT NULL,
  `archivo` varchar(255) COLLATE utf8_bin NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `actualización` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_archivo_jugadora` (`id_jugadora`),
  CONSTRAINT `FK_archivo_jugadora` FOREIGN KEY (`id_jugadora`) REFERENCES `jugadoras` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;




SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE usuarios
  ADD CONSTRAINT FK_usuario_rol FOREIGN KEY (rol) REFERENCES cat_roles (id);
  
ALTER TABLE jugadoras
  ADD CONSTRAINT FK_jugadora_equipo FOREIGN KEY (equipo) REFERENCES equipos (id);

ALTER TABLE equipos
  ADD CONSTRAINT FK_equipo_usuario FOREIGN KEY (usuario) REFERENCES usuarios (id);

SET FOREIGN_KEY_CHECKS=1;

INSERT INTO usuarios (username, password,nombre,rol)
VALUES ('admin',MD5('123'),'administrador',1);