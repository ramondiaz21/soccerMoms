<?php 


    require_once '../utilities/DBConnection.class.php';
    require_once '../utilities/Main.class.php';
    require_once '../utilities/Session.class.php';

    /**
     * summary
     */
    class Equipos {

        public static function getEquipos()
        {
             session_start();
            //var_dump($info);
            //exit;
            $username           = $_SESSION['login'];
            $idUser           = $_SESSION['idUser'];

            $consulta = "SELECT e.id, e.nombre
                        FROM usuarios u
                        LEFT JOIN equipos e ON e.usuario = u.id
                        WHERE e.status = 1 AND u.status = 1 AND u.id = '$idUser'
                        ORDER BY e.nombre ASC";

            return DBConnection::query_row($consulta);
        }

        public static function read($info)
        {
            session_start();
            $username           = $_SESSION['login'];
            $idUser           = $_SESSION['idUser'];

            $id         = $info['id'];
            $status     = $info['status'];

            $consulta = "SELECT j.id,j.nombre, j.telefono,j.creacion,j.status
                           FROM usuarios u
                           LEFT JOIN equipos e ON e.usuario = u.id
                           LEFT JOIN jugadoras j ON j.equipo = e.id
                           WHERE j.equipo = '$id' AND j.status = '$status' AND u.id = '$idUser'
                           ";

        	//var_dump($consulta);exit;
            return DBConnection::query_row($consulta);
        }

        public static function busqueda($info)
        {
            session_start();
            $idUser           = $_SESSION['idUser'];

            $id     = $info['id'];
            $nombre     = $info['nombre'];
            $status     = $info['status'];
            //var_dump($info);
            //exit;
            $consulta = "SELECT j.id,j.nombre, j.telefono,j.creacion,j.status
                           FROM usuarios u
                           LEFT JOIN equipos e ON e.usuario = u.id
                           LEFT JOIN jugadoras j ON j.equipo = e.id
                            WHERE UPPER(j.nombre) LIKE UPPER('%{$nombre}%') AND j.equipo = '$id' AND j.status = '$status' AND u.id = '$idUser'
                       ";

            //echo $consulta; exit;

            return DBConnection::query_row($consulta);
        }

        public static function agregar($info)
        {
            session_start();
            $id         = $info['id'];
            $equipo     = $info['equipo'];
            $nombre     = $info['nombre'];
            $telefono   = $info['telefono'];
            $imagen     = $info['imagen'];

            $consulta = "CALL SP_ADD_JUGADORA($equipo,'$nombre','$telefono','$imagen')";

            // echo $consulta; exit;
            //var_dump($consulta);exit;
            $respuesta = DBConnection::query_assoc($consulta);
            // echo $consulta; exit;
            
            return $respuesta;
            
        }

        public static function updateAgregaEquipo($info)
        {
            $id        = $info['id'];
            $nombre    = $info['nombre'];
            $telefono  = $info['telefono'];
            $imagen    = $info['imagen'];
                      
            
            //$fecha_registro = $info['fecha_registro'];

            $consulta = "CALL SP_UPDATE_IMAGEN_JUGADORA('$id','$nombre','$telefono','$imagen')";
            var_dump($consulta);exit;
             return DBConnection::query_row($consulta);

            
        }

        public static function getJugadora($info)
        {
            session_start();
            $username           = $_SESSION['login'];
            $idUser           = $_SESSION['idUser'];

            $id         = $info['id'];
            $status     = $info['status'];

            $consulta = "SELECT j.id,j.nombre, j.telefono,j.imagen,j.creacion,j.status
                           FROM usuarios u
                           LEFT JOIN equipos e ON e.usuario = u.id
                           LEFT JOIN jugadoras j ON j.equipo = e.id
                           WHERE j.id = '$id'";

            //var_dump($consulta);exit;
            return DBConnection::query_row($consulta);
        }

        

        public static function editarJugadora($info)
        {
            $id        = $info['id'];
            $nombre    = $info['nombre'];
            $telefono  = $info['telefono'];
            $imagen    = $info['imagen'];
                      
            
            //$fecha_registro = $info['fecha_registro'];

            $consulta = "UPDATE jugadoras SET nombre = '$nombre', telefono = '$telefono', imagen = '$imagen' WHERE id = $id";
            /*$consulta = "CALL SP_EDITAR_USUARIOS('$id', '$username', '$password', '$nombre',
            '$rol','$id_equipo','$nombreEquipo')";*/
            //var_dump($consulta);exit;
             return DBConnection::query_row($consulta);

            
        }

        public static function darBaja($info)
        {
            $id        = $info['id'];

            $consulta = "UPDATE jugadoras SET status = 0 WHERE id = $id ";

            return DBConnection::query($consulta);
        }

        public static function darAlta($info)
        {
            $id        = $info['id'];

            $consulta = "UPDATE jugadoras SET status = 1 WHERE id = $id ";

            return DBConnection::query($consulta);
        }

        public function upload($doc){
            session_start();
            $username           = $_SESSION['login'];

            date_default_timezone_set("America/Mexico_City");

            $nom2=date('d-m-Y_H,i,s');

            getcwd();
            chdir('../');
            $dir=getcwd();
            
            $ruta=$dir . "/clases/imagenesJugadoras/". $username . '_' . $nom2 . ".jpg";

            //var_dump($doc);

            if ($doc["type"]=="image/jpeg" or $doc["type"]== "image/png" or $doc["type"]== "image/jpg"){

                //if(move_uploaded_file($doc["tmp_name"],$ruta)){

                if(copy($doc["tmp_name"],$ruta)){

                    $resultado = $username . '_' . $nom2 . ".jpg";

                    return json_encode($resultado);
                    
                }

            }
            else{

                $resultado = null;

                return json_encode($resultado);
            }

        }

        public function uploadArchivos($doc){
            session_start();
            $username           = $_SESSION['login'];

            date_default_timezone_set("America/Mexico_City");

            $nom2=date('d-m-Y_H,i,s');

            getcwd();
            chdir('../');
            $dir=getcwd();
            
            $ruta=$dir . "/clases/archivosJugadoras/". $username . '_' . $nom2 . ".jpg";

            //var_dump($doc);

            if ($doc["type"]=="image/jpeg" or $doc["type"]== "image/png" or $doc["type"]== "image/jpg"){

                //if(move_uploaded_file($doc["tmp_name"],$ruta)){

                if(copy($doc["tmp_name"],$ruta)){

                    $resultado = $username . '_' . $nom2 . ".jpg";

                    return json_encode($resultado);
                    
                }

            }
            else{

                $resultado = null;

                return json_encode($resultado);
            }

        }

        public static function agregarArchivoDetalles($info)
        {
            session_start();
            
            $id_jugadora     = $info['id_jugadora'];
            $archivo     = $info['archivo'];

            $consulta = "INSERT INTO archivo_detalles (id_jugadora,archivo) 
                        VALUES('$id_jugadora','$archivo')";

            // echo $consulta; exit;
            //var_dump($consulta);exit;
            return DBConnection::query($consulta);
            
        }


        


    }


 ?>