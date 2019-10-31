<?php 


    require_once '../utilities/DBConnection.class.php';
    require_once '../utilities/Main.class.php';
    require_once '../utilities/Session.class.php';

    /**
     * summary
     */
    class Perfil {

        public static function mostrarUsuario($info)
        {
             session_start();
            //var_dump($info);
            //exit;
            $username           = $_SESSION['login'];
            $username2           = $_SESSION['idUser'];
            $consulta = "SELECT u.nombre
                        FROM usuarios u
                        WHERE id = '$username2'";

            //echo $consulta; exit;

            return DBConnection::query_row($consulta);
        }

        public static function read($info)
        {
            session_start();
            //var_dump($info);
            //exit;
            $username           = $_SESSION['login'];
            $idUser           = $_SESSION['idUser'];

            if ($info == 2) {
                $consulta = "SELECT u.id,u.username,u.nombre, cr.nombre,e.nombre,e.id,e.status
                           FROM usuarios u
                          LEFT JOIN cat_roles cr ON cr.id = u.rol
                          LEFT JOIN equipos e ON e.usuario = u.id
                          WHERE u.id = '$idUser' AND e.status = 1 OR e.status = 0
                          ";
            } else  {
                $consulta = "SELECT u.id,u.username,u.nombre, cr.nombre,e.nombre,e.id,e.status
                           FROM usuarios u
                           LEFT JOIN cat_roles cr ON cr.id = u.rol
                           LEFT JOIN equipos e ON e.usuario = u.id
                           WHERE u.id = '$idUser' AND e.status = $info
                           ";
            }

        	//var_dump($consulta);exit;
            return DBConnection::query_row($consulta);
        }

        public static function busqueda($info)
        {
            session_start();
            $idUser           = $_SESSION['idUser'];
            //var_dump($info);
            //exit;
            $consulta = "SELECT u.id,u.username,u.nombre, cr.nombre,e.nombre,u.status
                        FROM usuarios u
                        LEFT JOIN cat_roles cr ON cr.id = u.rol
                        LEFT JOIN equipos e ON e.usuario = u.id
                        WHERE UPPER(e.nombre) LIKE UPPER('%{$info}%') AND e.status = 1 AND u.id = '$idUser'
                       ";

            //echo $consulta; exit;

            return DBConnection::query_row($consulta);
        }

        public static function agregar($info)
        {
            session_start();
            
            $nombre   = $info['nombre'];
            $idUsuario           = $_SESSION['idUser'];
            
            

            //$username = $_SESSION['login'];
            //$fecha_registro = $info['fecha_registro'];

            $consulta = "INSERT INTO equipos (usuario,nombre,status) 
                        VALUES('$idUsuario','$nombre',1)";

            // echo $consulta; exit;
            return DBConnection::query($consulta);
            
        }

        public static function detallesEquipo($info)
        {
            
            //var_dump($info);
            //exit;
            $id_equipo = $info['id'];

            $consulta = "SELECT e.nombre,j.id, j.nombre, j.telefono
                           FROM jugadoras j
                           LEFT JOIN equipos e ON j.equipo = e.id
                           WHERE e.id = '$id_equipo'";

            //echo $consulta; exit;

            return DBConnection::query_row($consulta);
        }

        public static function getPerfil($info)
        {
            $id = $info['id'];
             $respuesta = array();

            $consulta = "SELECT u.id,u.username,u.password,cr.id,cr.nombre,u.nombre,e.id, e.nombre
            FROM usuarios u 
            LEFT JOIN cat_roles cr ON cr.id = u.rol
            LEFT JOIN equipos e ON e.usuario = u.id
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

        public static function editarPerfil($info)
        {
            $id        = $info['id'];
            $username   = $info['username'];
            $password   = $info['password'];
            $nombre   = $info['nombre'];
            $id_equipo        = $info['id'];
            $nombreEquipo   = $info['nombre'];
            $rol   = $info['rol'];
            $status   = $info['status']; 
                      
            
            //$fecha_registro = $info['fecha_registro'];

            $consulta = "UPDATE usuarios SET username = '$username',password = MD5('$password'), nombre = '$nombre', rol = '$rol' WHERE id = $id";
            /*$consulta = "CALL SP_EDITAR_USUARIOS('$id', '$username', '$password', '$nombre',
            '$rol','$id_equipo','$nombreEquipo')";*/
            //var_dump($consulta);exit;
             return DBConnection::query_row($consulta);

            
        }

        public static function getEquipo($info)
        {
            $id = $info['id'];

            $consulta = "SELECT id, nombre
                        FROM equipos
                        WHERE id = $id";

            return DBConnection::query_row($consulta);
        }

        public static function editarEquipo($info)
        {
            $id        = $info['id'];
            $nombre   = $info['nombre'];
                      
            
            //$fecha_registro = $info['fecha_registro'];

            $consulta = "UPDATE equipos SET nombre = '$nombre' WHERE id = $id";
            /*$consulta = "CALL SP_EDITAR_USUARIOS('$id', '$username', '$password', '$nombre',
            '$rol','$id_equipo','$nombreEquipo')";*/
            //var_dump($consulta);exit;
             return DBConnection::query_row($consulta);

            
        }

        public static function darBaja($info)
        {
            $id        = $info['id'];

            $consulta = "UPDATE equipos SET status = 0 WHERE id = $id ";

            return DBConnection::query($consulta);
        }

        public static function darAlta($info)
        {
            $id        = $info['id'];

            $consulta = "UPDATE equipos SET status = 1 WHERE id = $id ";

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