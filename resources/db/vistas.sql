DROP VIEW IF EXISTS vwGetCategorias; 
CREATE VIEW vwGetCategorias AS 
SELECT *
FROM cat_categorias ;

DROP VIEW IF EXISTS vwGetDataEdit; 
CREATE VIEW vwGetDataEdit AS 
SELECT A.id, A.cabecera, A.texto, B.categoria, A.etiquetas, A.url, A.fecha, A.userId, A.status 
FROM contenido_blog A 
INNER JOIN cat_categorias B ON A.categoria = B.id;

DROP VIEW IF EXISTS vwNoticia; 
CREATE VIEW vwNoticia AS 
SELECT CB.id, cabecera, etiquetas, texto, url, fecha, U.nombre as creador, CB.status
FROM contenido_blog CB
INNER JOIN usuarios U on CB.userId = U.id