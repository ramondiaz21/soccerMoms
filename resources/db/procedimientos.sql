--------------------------------

DROP PROCEDURE IF EXISTS SP_EDITAR_USUARIOS;

DELIMITER $$
CREATE PROCEDURE SP_EDITAR_USUARIOS(
  IN _id_usuario INT,
  IN _username VARCHAR(500),
  IN _password VARCHAR(500),
  IN _nombre VARCHAR(500),
  IN _rol VARCHAR(500),
  IN _id_equipo INT,
  IN _nombreEquipo VARCHAR(500)
)
BEGIN 
  
    UPDATE usuarios SET username = _username,
    password = MD5(_password), nombre = _nombre, rol = _rol WHERE id = _id_usuario;

    UPDATE equipos SET nombre = _nombreEquipo
    WHERE id = _id_equipo;
END $$
DELIMITER ;

--------------------------------

DROP PROCEDURE IF EXISTS SP_ADD_JUGADORA;

DELIMITER $$
CREATE PROCEDURE SP_ADD_JUGADORA(
  IN _equipo INT,                               
  IN _nombre VARCHAR(500),
  IN _telefono VARCHAR(500),
  IN _imagen VARCHAR(500)
)
BEGIN 
  
    INSERT INTO jugadoras(equipo,nombre,telefono,imagen)
    VALUES(_equipo,_nombre,_telefono,_imagen);
    SET @lastId = LAST_INSERT_ID();
    SELECT @lastId AS id;
END $$
DELIMITER ;

--------------------------------

DROP PROCEDURE IF EXISTS SP_UPDATE_IMAGEN_JUGADORA;

DELIMITER $$
CREATE PROCEDURE SP_UPDATE_IMAGEN_JUGADORA(
  IN _id INT,
  IN _nombre VARCHAR(500),
  IN _telefono VARCHAR(500),
  IN _imagen VARCHAR(500)
)
BEGIN 
    UPDATE jugadoras
    SET nombre = _nombre, telefono = _telefono, imagen = _imagen
    WHERE id = _id;
END $$
DELIMITER ;