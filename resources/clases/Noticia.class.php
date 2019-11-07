<?php 


    require_once '../utilities/DBConnection.class.php';
    require_once '../utilities/Main.class.php';
    require_once '../utilities/Session.class.php';

    /**
     * summary
     */
    Class Noticia {

        public static function Agregar_cat($info) {

            $categoria     = $info['categoria'];
            $consult = "CALL SP_insertCategoria('$categoria');";
            //Main::log($consult);
            $resultado = DBConnection::query($consult);

            return $resultado;

        }

        public static function getCategorias($info){

            $consult = "SELECT * FROM vwGetCategorias;";

            $resultado = DBConnection::query_assoc($consult);

            return $resultado;
        }

        public static function read($info){

            $consult = "SELECT id, cabecera, categoria, texto, url, etiquetas, fecha FROM vwGetContenido;";

            $resultado = DBConnection::query_row($consult);

            foreach($resultado as $key=>$item){
               $resultado[$key][3]=substr(htmlspecialchars_decode(addslashes(strip_tags ($item[3]))),0,97).'...';
            }

        }

        public static function search_info($info) {

            date_default_timezone_set ( "America/Mexico_City" );
            $fechas = $info->fechas;
            $date1 = $fechas->Date1;
            $date2 = $fechas->Date2;
            $cat = $info->categoria;
            $txt = $info->search;

            $consult = "SELECT id, cabecera, categoria, texto, url, etiquetas, fecha FROM vwGetContenido WHERE (cabecera LIKE '%".$txt."%' 
                    OR etiquetas LIKE '%".$txt."%' 
                    OR idCat LIKE '%".$txt."%')";

            if (!(($date1==$date2)&&($date2==date("Y-m-d")))){
                
                $consult .= "AND fecha >= '$date1' AND fecha <='$date2';";

            }
            if ($cat !=0) {
                
                $consult .= "AND idCat =".$cat." ";
                
            }
            
            
            //Main::log($consult);
            $resultado = DBConnection::query_row($consult);

            foreach($resultado as $key=>$item){
               $resultado[$key][3]=substr(htmlspecialchars_decode(addslashes(strip_tags ($item[3]))),0,97).'...';
            }
        }

        public static function readEdit($info) {

            $consult = "SELECT * FROM vwGetDataEdit WHERE id = '$id'";
            $noticia = DBConnection::query_assoc($consult);

            $consult = "SELECT * FROM vwGetCategorias;";
            $categorias = DBConnection::query_assoc($consult);

            $resultado = array("noticia" => $noticia, "categorias" => $categorias);

        }

        public static function add($info) {

            $$texto =$info->texto;
            $server = NOTI_PATH."art/";
            $imgsf = self::extraerSRC($texto);
            $imgs = $imgsf;
            $tam = count($imgsf);
            //Main::log($tam);

            for ($i=0; $i < $tam; $i++) { 
                $filename = "img_noti_".date("Ymd").rand(0,9999);
                $img = $imgs[1][$i];
                //Main::log($img);
                //copy($img, "fotos/$id/galeria_chica/$i.jpg");
                copy($img,"noticias/art/$filename.jpg");
                //Main::log("noticias/art/$filename.jpg");
                sleep(1);
                //rename($img,"");
                //unlink($img);
                sleep(1);
                $texto = str_replace($img,$server.$filename.".jpg", $texto);
            }
            //Main::log($texto);
            /*$newtext = str_replace("../api",$server, $texto);
            $newtext = str_replace("'","\"", $newtext);/*/
            //Main::log($newtext);
            $newtext = str_replace("'","\"", $texto);
            $datos = DBConnection::query_assoc("CALL SP_checkCat('$info->categoria')"); //se llama al procedimiento almacenado para validar los datos
            //var_dump($datos);
            if (empty($datos)) {

                $consult = "CALL SP_insertCategoria('$info->categoria')";
                $datos = DBConnection::query_assoc($consult); 
                //Main::log($consult);
                $cat = $datos[0]["id"];
                //Main::log($id);

            }else{
                //Main::log("else");
                $cat = $datos[0]["id"];

            }
            
            $consult = "CALL SP_insertNoticia('{$info->header}','$newtext','$cat',
            '{$info->etiquetas}','{$info->foto}','{$info->id}');";
            //Main::log($consult);
            //$response = array("estado" => "success","resultado" => $resultado);
            $resultado = DBConnection::query($consult);
            $resultado = $imgs;
        }

        public static function subirimagen($info) {


            list($type, $info) = explode(';', $info);
            list(, $info)      = explode(',', $info);

            $info = base64_decode($info);

            $filename = "img_noti_".date("Ymd").rand(0,9999);

            if($type=="data:image/jpeg"){
                $ext="jpg";
            }else{
                if($type=="data:image/png"){
                    $ext="png";
                }else{
                    if($type=="data:image/gif"){
                        $ext="gif";
                    }else{
                        return "Error";
                    }

                }
            }

            if(!is_dir('noticias/art'))
                mkdir('noticias/art', 0755);
            
            file_put_contents('noticias/art/'.$filename.".".$ext, $info);
            //$consult = "CALL SP_DeleteNoticia('{$info->eliminar}');";
            
            $resp = "$filename.$ext";
            //Main::log($resp);
            $resultado =$resp;

        }

        public static function del($info) {


            $method = "POST";
            $url = API_PATH."/noticia/del";
            $info = array( 'info'=> json_encode($info));
            //var_dump($url);
            $response = json_decode(Main::consumeAPI($url, $method, $info), true);
            //var_dump($response);
            return $response["estado"] == 1 ? $response["datos"] : NULL;

        }

        public static function getnoticia($info){

            $id = $info->id;

            $consult = "CALL SP_deleteNoticia('$id');";
            //Main::log($consult);
            $resultado = DBConnection::query($consult);

        }


        public static function cabecera($info) {


            $url = $info['tmp_name'];
            $file = $info['name'];
            $type = $info["type"];
            //Main::log($url);
            //Main::log($file);
            //Main::log($type);

            $date = getdate();
            
            $day= $date["mday"];
            $month=$date["mon"];
            $year=$date["year"];
            $hour=$date["hours"];
            $minutes=$date["minutes"];

            $namefile=$year.$month.$day.$hour.$minutes.rand(0,99999);
            //Main::log($namefile);
            $dir=getcwd();


            if($type=="image/jpeg"){

                $namefilefinal=$namefile."."."jpg";

            }else{

                if($type=="image/png"){

                    $namefilefinal=$namefile."."."png";

                }else{

                    if($type=="image/gif"){

                        $namefilefinal=$namefile."."."gif";

                    }else{

                        $resultado = "El archivo no es imagen";

                        $response = array("estado" => "unknow_error","resultado" => $resultado);
                        return $response;
                    }
                }
            }

            if(!is_dir('noticias/'))
                mkdir('noticias/', 0755);

            //$namefilefinalf = 'noticias/'.$namefilefinal;
            //Main::log($namefilefinal);
            $ruta = $dir."/noticias/".$namefilefinal;
            //Main::log($ruta);

            copy($url,$ruta);
            if (empty($namefilefinal)) {
                $namefilefinal = 0;
            }else{

            }
            
            $response = array("estado" => "success","resultado" => $namefilefinal); 
            
            sleep(3);//retrasamos la petición 3 segundos
            return $response;

        }


    }


 ?>