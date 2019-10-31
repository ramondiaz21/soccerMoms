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
