<?php
    require_once 'Main.class.php';

    class Session {

        // const PROJECT = base64_encode("{$_SERVER['SERVER_NAME']}/medical");

        function __construct() {
           session_start();
        }

        public static function valida() {

            $response = false;

            if(count($_SESSION) > 0){
                if(isset($_SESSION['se_usr_name']) && isset($_SESSION['se_usr_id']) && isset($_SESSION['se_usr_permission']))
                    $response =  true;
            }

            return $response;
        }

        public static function get_permissions($modulo){

            $permissions = unserialize($_SESSION['se_usr_permission']);
            $response = array();

            

            foreach ($permissions as $key => $value) {

                foreach ($modulo as $mod_key => $mod_val) {
                    
                    if($value['modulo'] == $mod_val){

                        array_push($response, 
                            array(
                                "perfil"     => $value['perfil'],
                                "perfil_id"  => $value['perfil_id'],
                                "modulo"     => $value['modulo'],
                                "crear"      => $value['crear'],
                                "leer"       => $value['leer'],
                                "actualizar" => $value['actualizar'],
                                "borrar"     => $value['borrar']
                            )
                        );

                    }

                }
                    
            }
             //var_dump($response);
            return $response;

        }

        public static function check_permissions($modulo, $tipo){

            $response = false;
            $permissions = unserialize($_SESSION['se_usr_permission']);

            foreach ($permissions as $key => $value){
                if($value['modulo'] == $modulo)
                    if($value[$tipo] == 1)
                        $response = true;
            }
            
            return $response;
        }

        public static function get_session_id(){
            return session_id();
        }

        public static function set($nombre, $valor) {
            $_SESSION[$nombre] = $valor;
        }

        public static function get($nombre) {
            return isset($_SESSION[$nombre]) == true ? $_SESSION[$nombre] : false; 
        }

        public static function delete($nombre) {
            unset($_SESSION[$nombre]);
        }

        public static function destroy() {
            session_unset();
            session_destroy();
        }

    }
?>
