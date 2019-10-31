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
            
            $equipo     = $info['equipo'];
            $nombre     = $info['nombre'];
            $telefono   = $info['telefono'];
            $imagen   = $info['imagen'];

            $consulta = "INSERT INTO jugadoras (equipo,nombre,telefono,status) 
                        VALUES('$equipo','$nombre','$telefono','$imagen',1)";

            // echo $consulta; exit;
            return DBConnection::query($consulta);
            
        }

        public static function getJugadora($info)
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
                           WHERE j.id = '$id'";

            //var_dump($consulta);exit;
            return DBConnection::query_row($consulta);
        }

        

        public static function editarJugadora($info)
        {
            $id        = $info['id'];
            $nombre    = $info['nombre'];
            $telefono    = $info['telefono'];
                      
            
            //$fecha_registro = $info['fecha_registro'];

            $consulta = "UPDATE jugadoras SET nombre = '$nombre', telefono = '$telefono' WHERE id = $id";
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

            date_default_timezone_set("America/Mexico_City");

            $nom2=date('d-m-Y_H,i,s');

            getcwd();
            chdir('../');
            $dir=getcwd();
            
            $ruta=$dir."/archivosJugadoras/".$nom2.".jpg";

            //var_dump($doc);

            if ($doc["type"]=="image/*"){

                //if(move_uploaded_file($doc["tmp_name"],$ruta)){

                if(copy($doc["tmp_name"],$ruta)){

                    $resultado = $nom2.".jpg";

                    return json_encode($resultado);
                    
                }

            }
            else{

                $resultado = null;

                return json_encode($resultado);
            }

        }

        /*private static function upload($info){

            $body = $_POST['info'];

            $doc = json_decode($body,TRUE);

            date_default_timezone_set("America/Mexico_City");

            $nom2=date('d-m-Y_H,i,s');

            //Main::log($nom2);

            $dir=getcwd();
            
            $ruta=$dir.'/estudios/'.$nom2.".pdf";

            //$ser= $_SERVER['DOCUMENT_ROOT'];



            if ($doc["type"]=="application/pdf"){

                //if(move_uploaded_file($doc["tmp_name"],$ruta)){

                if(copy($doc["tmp_name"],$ruta)){

                

                $resultado = $nom2;

                $response = array("estado" => "success","resultado" => $resultado); 

                return $response;

            }

                else

                $resultado = "Error al cargar";

                $response = array("estado" => "unknow_error","resultado" => $resultado);    

                return $response;

            }

            else

                $resultado = "El archivo no es pdf";

                $response = array("estado" => "unknow_error","resultado" => $resultado);    

                return $response;

            

        }*/


        


    }


 ?>