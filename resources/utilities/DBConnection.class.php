<?php  

	require 'config.php';

	class DBConnection {

        public static $dbCon = null;
        public static $db = null;

        /**
         * [__construct description]
         */
        public function __construct(){
            self::connect();
        }

        /**
         * [connect description]
         * @return [PDO] [variable de conección]
         */
        
        /**
         * [connect description]
         * @return [type] [description]
         */
        public static function connect(){
            try {
                self::$dbCon = new PDO(
                    "mysql:dbname=".BASE_DE_DATOS.";
                    host=".NOMBRE_HOST."", USUARIO, CONTRASENA, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
                );
                return self::$dbCon;
            } catch (PDOException $e) {
                print "¡Error!: " . $e->getMessage() . "<br/>";
                die();
            }

        }

        /**
         * [query description]
         * @param  [TEXT]  $consult [consulta a ejecutar]
         * @param  [Array] $params  [parametros para la consulta]       
         * @return [bool]           [resultado de la consulta]
         */
        public static function query($consult, $params = null){
            $sentencia = self::connect()->prepare($consult);
            if ($params != null)
                foreach ($params as $key => $value)
                    $sentencia->bindValue($key, $value);
            return $sentencia->execute();
        }

        /**
         * [next_result description]
         * Sin funcionamiento
         */
        public static function next_result(){
            return;
            self::connect()->next_result();
        }


        /**
         * [query_assoc description]
         * @param  [TEXT]  $consult [consulta a ejecutar]
         * @param  [Array] $params  [parametros para la consulta]       
         * @return [bool]           [resultado de la consulta]
         */
        public static function query_assoc($consult, $params = null){

            $sentencia = self::connect()->prepare($consult);
            
            if ($params != null)
                foreach ($params as $key => $value)
                    $sentencia->bindValue($key, $value);

            
            if($sentencia->execute())
                return $sentencia->fetchAll(PDO::FETCH_ASSOC);
        }


        /**
         * [query_row description]
         * @param  [TEXT]  $consult [consulta a ejecutar]
         * @param  [Array] $params  [parametros para la consulta]       
         * @return [bool]           [resultado de la consulta]
         */
        public static function query_row($consult, $params = null){
            $sentencia = self::connect()->prepare($consult);
            
            if ($params != null)
                foreach ($params as $key => $value)
                    $sentencia->bindValue($key, $value);

            if($sentencia->execute())
                return $sentencia->fetchAll(PDO::FETCH_NUM);
        
        }

        /**
         * [query_object description]
         * @param  [TEXT]  $consult [consulta a ejecutar]
         * @param  [Array] $params  [parametros para la consulta]       
         * @return [bool]           [resultado de la consulta]
         */
        public static function query_object($consult, $params = null){         
            $sentencia = self::connect()->prepare($consult);
            
            if ($params != null)
                foreach ($params as $key => $value)
                    $sentencia->bindValue($key, $value);

            if($sentencia->execute())
                return $sentencia->fetchAll(PDO::FETCH_OBJ);
        
        }

        /**
         * [query_single_object description]
         * @param  [TEXT]  $consult [consulta a ejecutar]
         * @param  [Array] $params  [parametros para la consulta]       
         * @return [bool]           [resultado de la consulta]
         */
        public static function query_single_object($consult, $params = null) {         
            $sentencia = self::connect()->prepare($consult);
            
            if ($params != null){
                foreach ($params as $key => $value){
                    $sentencia->bindValue($key, $value,PDO::PARAM_STR);
                }
            }

            if($sentencia->execute()){
                $retorno = $sentencia->fetch(PDO::FETCH_OBJ);
                //var_dump($retorno);
                return $retorno;
            } else {
            }
        
        }

        /**
         * [__clone description]
         * Evita la clonación del objeto
         */
        final protected function __clone() {
        }

        /**
         * [__destructor description]
         */
        function __destructor(){
            self::$dbCon = null;
        }

     
    }

?>