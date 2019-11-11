
DROP PROCEDURE IF EXISTS SP_insertCategoria;
DELIMITER ;;
CREATE PROCEDURE SP_insertCategoria(_cat VARCHAR(40))
  BEGIN

    INSERT INTO cat_categorias (categoria) VALUES (_cat);
    SET @lastId = LAST_INSERT_ID();
    SELECT id FROM cat_categorias WHERE id = @lastId;
  END
;;
DELIMITER ;

DROP VIEW IF EXISTS vwGetContenido; 
CREATE VIEW vwGetContenido AS 
SELECT A.id, A.cabecera, B.id as idCat ,B.categoria, A.texto, A.url, A.etiquetas, A.fecha
FROM contenido_blog A 
INNER JOIN cat_categorias B ON A.categoria = B.id
WHERE A.status = 1;


DROP PROCEDURE IF EXISTS SP_DeleteNoticia;
DELIMITER ;;
CREATE PROCEDURE SP_DeleteNoticia(_id INT)
  BEGIN

    UPDATE contenido_blog SET status = 0 WHERE id = _id;
  END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS SP_insertNoticia;
DELIMITER ;;
CREATE PROCEDURE SP_insertNoticia(
_header VARCHAR(100), _texto MEDIUMTEXT , _categoria VARCHAR(50), _etiquetas VARCHAR(50),
_foto VARCHAR(300), _id INT
)
  BEGIN

  INSERT INTO contenido_blog(cabecera, texto, categoria, etiquetas, url, fecha, 
  userId) VALUES (_header, _texto, _categoria, _etiquetas, _foto, NOW(), _id);

  END
;;
DELIMITER ;


DROP PROCEDURE IF EXISTS SP_editNoticia;
DELIMITER ;;
CREATE PROCEDURE SP_editNoticia(
_header VARCHAR(100), _texto MEDIUMTEXT , _etiquetas VARCHAR(50), _categoria VARCHAR(50),
_user INT,_id INT
)
  BEGIN

  UPDATE contenido_blog SET cabecera = _header, texto = _texto, etiquetas = _etiquetas, 
  categoria = _categoria, userId = _user WHERE id = _id;

  END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS SP_editNoticia2;
DELIMITER ;;
CREATE PROCEDURE SP_editNoticia2(
_header VARCHAR(100), _texto MEDIUMTEXT , _etiquetas VARCHAR(50), _categoria VARCHAR(50),
_url VARCHAR(300), _user INT,_id INT
)
  BEGIN

  UPDATE contenido_blog SET cabecera = _header, texto = _texto, etiquetas = _etiquetas, 
  categoria = _categoria, url = _url, userId = _user WHERE id = _id;

  END
;;
DELIMITER ;


DROP PROCEDURE IF EXISTS SP_checkCat;
DELIMITER ;;
CREATE PROCEDURE SP_checkCat( _cat VARCHAR(100))
  BEGIN

  SELECT id FROM cat_categorias WHERE categoria = _cat;


  END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS SP_deleteNoticia;
DELIMITER ;;
CREATE PROCEDURE SP_deleteNoticia( _id INT)
  BEGIN

  UPDATE contenido_blog SET status = 0 WHERE id = _id;
  -- DELETE FROM contenido_blog WHERE id = _id

  END
;;
DELIMITER ;
