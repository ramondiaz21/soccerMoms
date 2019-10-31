<?php 


    require_once '../utilities/DBConnection.class.php';
    require_once '../utilities/Main.class.php';
    require_once '../utilities/Session.class.php';

    /**
     * summary
     */
    class Usuarios {

        public static function read($info)
        {

            if ($info == 2) {
                $consulta = "SELECT u.id,u.username,u.nombre, cr.nombre,u.status
                           FROM usuarios u
                          LEFT JOIN cat_roles cr ON cr.id = u.rol
                           ";
            } else  {
                $consulta = "SELECT u.id,u.username,u.nombre, cr.nombre,u.status
                           FROM usuarios u
                          LEFT JOIN cat_roles cr ON cr.id = u.rol
                           WHERE u.status = $info";
            }

        	//var_dump($consulta);exit;
            return DBConnection::query_row($consulta);
        }

        public static function busqueda($info)
        {
            
            //var_dump($info);
            //exit;
            $consulta = "SELECT u.id,u.username,u.nombre, cr.nombre,u.status
                           FROM usuarios u
                          LEFT JOIN cat_roles cr ON cr.id = u.rol
                       WHERE UPPER(u.username) LIKE UPPER('%{$info}%')
                       OR UPPER(u.nombre) LIKE UPPER('%{$info}%')
                       ";

            //echo $consulta; exit;

            return DBConnection::query_row($consulta);
        }

        public static function agregar($info)
        {
            session_start();
            $username   = $info['username'];
            $password   = $info['password'];
            $nombre   = $info['nombre'];
            $rol   = $info['rol'];
            
            

            //$username = $_SESSION['login'];
            //$fecha_registro = $info['fecha_registro'];

            $consulta = "INSERT INTO usuarios (username,password,nombre,rol,status) 
                        VALUES('$username',MD5('$password'),'$nombre','$rol',1)";

            // echo $consulta; exit;
            return DBConnection::query($consulta);
            
        }

        public static function getUsuarios($info)
        {
            $id = $info['id'];
             $respuesta = array();

            $consulta = "SELECT u.id,u.username,u.password,cr.id,cr.nombre,u.nombre
            FROM usuarios u 
            LEFT JOIN cat_roles cr ON cr.id = u.rol
            WHERE u.id = :id";
            $params   = array(':id' => $id);

            $respuesta["editar"] = DBConnection::query_row($consulta, $params);
            //return DBConnection::query_row($consulta);

            $consulta2 = "SELECT id, nombre
                        FROM cat_roles
                        WHERE status = 1";
            $respuesta["roles"] = DBConnection::query_row($consulta2);

            return $respuesta;
        }

        public static function editarUsuarios($info)
        {
            $id        = $info['id'];
            $username   = $info['username'];
            $password   = $info['password'];
            $nombre   = $info['nombre'];
            $rol   = $info['rol'];
            $status   = $info['status']; 
                      
            
            //$fecha_registro = $info['fecha_registro'];

            $consulta = "UPDATE usuarios SET username = '$username',password = MD5('$password'), nombre = '$nombre', rol = '$rol' WHERE id = $id";
            //var_dump($consulta);exit;
             return DBConnection::query_row($consulta);

            
        }

        public static function darBaja($info)
        {
            $id        = $info['id'];

            $consulta = "UPDATE usuarios SET status = 0 WHERE id = $id ";

            return DBConnection::query($consulta);
        }

        public static function darAlta($info)
        {
            $id        = $info['id'];

            $consulta = "UPDATE usuarios SET status = 1 WHERE id = $id ";

            return DBConnection::query($consulta);
        }

        public static function getRoles()
        {
            $consulta = "SELECT id, nombre
                        FROM cat_roles
                        WHERE status = 1
                        ORDER BY nombre ASC";

            return DBConnection::query_row($consulta);
        }

        public static function verFolios()
        {
            $consulta = "SELECT numero_folios
                        FROM folios_detalles
                        WHERE status = 1";

            return DBConnection::query_row($consulta);
        }


    }


 ?>