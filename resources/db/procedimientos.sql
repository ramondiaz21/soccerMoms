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

--------------------------------

DROP PROCEDURE IF EXISTS SP_ADD_ARCHIVO;

DELIMITER $$
CREATE PROCEDURE SP_ADD_ARCHIVO(
  IN _id_jugadora INT,                               
  IN _archivo VARCHAR(500)
)
BEGIN 
    INSERT INTO archivo_detalles(id_jugadora,archivo)
    VALUES(_id_jugadora,_archivo);
    SET @lastId = LAST_INSERT_ID();
    SELECT @lastId AS id;
END $$
DELIMITER ;

--------------------------------

DROP PROCEDURE IF EXISTS SP_CANCELAR_JUGADORA;

DELIMITER $$
CREATE PROCEDURE SP_CANCELAR_JUGADORA(
  IN _id_jugadora INT
)
BEGIN 
    DELETE FROM archivo_detalles WHERE id_jugadora = _id_jugadora;
    DELETE FROM jugadoras WHERE id = _id_jugadora;
END $$
DELIMITER ;

--------------------------------

DROP PROCEDURE IF EXISTS SP_ELIMINAR_ARCHIVO;

DELIMITER $$
CREATE PROCEDURE SP_ELIMINAR_ARCHIVO(
  IN _id_archivo INT
)
BEGIN 
    DELETE FROM archivo_detalles WHERE id = _id_archivo;
END $$
DELIMITER ;
