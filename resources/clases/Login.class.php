<?php  

    require_once '../utilities/DBConnection.class.php';
    require_once '../utilities/Main.class.php';
    require_once '../utilities/Session.class.php';

    

    Class Login extends DBConnection {



        //public static $Session = new Session();
        //public static $global_id = $Session->get('id_admin');

        public function entrarLogin($info) 
        {
            //$Session = new Session();
            //session_start();
            $id              = $info['id'];
            $username              = $info['username'];
            $password              = $info['password'];
            $clave           = $info['clave'];
            $response        = "false";

            $consulta = "SELECT id, username,password, nombre, rol, status FROM usuarios 
    WHERE username = '$username' AND password = MD5('$password') AND status = 1;";
            $datos = $this -> query_assoc($consulta);

            if(count($datos) > 0) {
              $_SESSION['id'] = $id;
              $_SESSION['login'] = $username;
              $_SESSION['clave'] = $datos[0]['clave'];
              $_SESSION['rol'] = $datos[0]['rol'];
              $_SESSION["idUser"]  = $datos[0]['id'];
              $_SESSION["UserUsername"] = $datos[0]['username'];
              $_SESSION["UserName"]    = $datos[0]['nombre'];
              $response            = "admin";
            }            

            return DBConnection::query_assoc($consulta);

            /*if($consulta == true) {
                $_SESSION['login'] = $username;
                return DBConnection::query_row($consulta);
            } else {
            
            }*/

        }

        
  }

        


?>