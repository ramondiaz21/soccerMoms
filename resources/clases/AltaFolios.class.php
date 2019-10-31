<?php 


    require_once '../utilities/DBConnection.class.php';
    require_once '../utilities/Main.class.php';
    require_once '../utilities/Session.class.php';

    /**
     * summary
     */
    class AltaFolios {

        public static function read()
        {

            $consulta = "SELECT id,usuarioName,precio,folioInicial,folioFinal,creacion,status
                           FROM folios";

            
            return DBConnection::query_row($consulta);
        }

        public static function agregar($info)
        {
            session_start();
            $folioInicial       = $info['folioInicial'];
            $folioFinal         = $info['folioFinal'];
            $precio             = $info['precio'];
            $id_folio           = $info['id_folio'];
            $numero_folios      = $info['numero_folios'];
            $username           = $_SESSION['login'];

            $consulta = "CALL SP_ADD_FOLIOS('1','$username','$precio','$folioInicial','$folioFinal','$id_folio')";
                //var_dump($consulta);exit;
                return DBConnection::query($consulta);
            
            /*$precio   = $info['precio'];
            $folioInicial   = $info['folioInicial'];
            $folioFinal   = $info['folioFinal'];*/
            /*foreach ($info as $value) {
                $folios .= "CALL SP_ADD_FOLIOS('1','$username','$precio','$folioInicial','$folioFinal','$id_folio'),";
            }

            $folios = rtrim($folios, ',');

            $consulta = "$folios";
                //var_dump($consulta);exit;
                return DBConnection::query($consulta);*/

            /*if (isset($_POST['submit'])) {

            $i = 0;
            foreach ($_POST as $val) {
                session_start();
                $folioInicial       = $val['folioInicial'][$i];
                $folioFinal         = $val['folioFinal'][$i];
                $precio             = $val['precio'][$i];
                $id_folio           = $val['id_folio'][$i];
                $numero_folios      = $val['numero_folios'][$i];
                $username           = $_SESSION['login'][$i];
                 mysql_query("CALL SP_ADD_FOLIOS('1','$username','$precio','$folioInicial','$folioFinal','$id_folio')");
                $i++;
              } 
            }*/
            

            /*if (
                !empty($_POST['folioInicial']) && !empty($_POST['folioFinal']) 
                && !empty($_POST['precio'])
                && is_array($_POST['folioInicial']) && is_array($_POST['folioFinal'])
                && is_array($_POST['precio'])
                && count($_POST['folioInicial']) === count($_POST['folioFinal'])
                ) {
                session_start();
                $folioInicial_array = $_POST['folioInicial'];
                $folioFinal_array   = $_POST['folioFinal'];
                $precio_array       = $_POST['precio'];
                $id_folio   = $info['id_folio'];
                $numero_folios   = $info['numero_folios'];
                $username = $_SESSION['login'];

                for ($i = 0; $i < count($folioInicial_array); $i++) {

                $folioInicial = mysql_real_escape_string($folioInicial_array[$i]);
                $folioFinal = mysql_real_escape_string($folioFinal_array[$i]);
                $precio = mysql_real_escape_string($precio_array[$i]);

                
                mysql_query("CALL SP_ADD_FOLIOS('1','$username','$precio','$folioInicial','$folioFinal','$id_folio')");
                } 

            }*/
            /*$consulta = "CALL SP_ADD_FOLIOS('1','$username','$precio','$folioInicial','$folioFinal','$id_folio')";
                var_dump($consulta);exit;
                return DBConnection::query($consulta);*/
            

           
            //$consulta = "CALL SP_ADD_FOLIOS('1','$username','$precio','$folioInicial','$folioFinal','$id_folio')";

            // echo $consulta; exit;
                        //var_dump($consulta);exit;
            //return   ::query($consulta);
            
        }

         public static function asignarLote($info)
        {
            $id        = $info['id'];

            $consulta = "CALL SP_ASIGNAR_FOLIOS($id)";
            //var_dump($consulta);exit;

            return DBConnection::query($consulta);
        }

         public static function verStatus()
        {

            $consulta = "SELECT status
                           FROM folios";

            
            return DBConnection::query_row($consulta);
        }

        public static function darBaja($info)
        {
            $id        = $info['id'];

            $consulta = "CALL SP_BAJA_FOLIOS('$id')";

            return DBConnection::query($consulta);
        }

        public static function getFolios($info)
        {
            $id                  = $info['id'];

            $consulta = "SELECT id,precio, folioInicial, folioFinal
                        FROM folios
                        WHERE id = '$id'";

            
            return DBConnection::query_row($consulta);
        }

        public static function editFolios($info)
        {
            $id                  = $info['id'];
            $precio              = $info['precio'];
            $folioInicial        = $info['folioInicial'];
            $folioFinal          = $info['folioFinal'];

            $consulta = "CALL SP_EDIT_FOLIOS('$id','$precio','$folioInicial','$folioFinal')";

            //var_dump($consulta);exit;
            return DBConnection::query($consulta);
        }

        
    }


 ?>