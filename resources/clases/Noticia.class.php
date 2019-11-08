<?php 


    require_once '../utilities/DBConnection.class.php';
    require_once '../utilities/Main.class.php';
    require_once '../utilities/Session.class.php';
    date_default_timezone_set ( "America/Mexico_City" );
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

        public static function getCategorias(){

            $consult = "SELECT * FROM vwGetCategorias;";

            $resultado = DBConnection::query_assoc($consult);

            return $resultado;
        }

        public static function read(){

            $consult = "SELECT id, cabecera, categoria, texto, url, etiquetas, fecha FROM vwGetContenido;";

            $resultado = DBConnection::query_row($consult);

            foreach($resultado as $key=>$item){
               $resultado[$key][3]=substr(htmlspecialchars_decode(addslashes(strip_tags ($item[3]))),0,97).'...';
            }

            return $resultado;

        }

        public static function search_info($info) {

            
            $fechas = $info['fechas'];
            $date1  = $fechas['Date1'];
            $date2  = $fechas['Date2'];
            $cat    = $info['categoria'];
            $txt    = $info['search'];

            $consult = "SELECT id, cabecera, categoria, texto, url, etiquetas, fecha FROM vwGetContenido WHERE (cabecera LIKE '%".$txt."%' 
                    OR etiquetas LIKE '%".$txt."%' 
                    OR idCat LIKE '%".$txt."%')";

            if (!(($date1==$date2)&&($date2==date("Y-m-d")))){
                
                $consult .= "AND fecha >= '$date1' AND fecha <='$date2';";

            }
            if ($cat !=0) {
                
                $consult .= "AND idCat =".$cat." ";
                
            }
            
            Main::log($consult);
            $resultado = DBConnection::query_row($consult);

            foreach($resultado as $key=>$item){
               $resultado[$key][3]=substr(htmlspecialchars_decode(addslashes(strip_tags ($item[3]))),0,97).'...';
            }

            return $resultado;
        }

        public static function readEdit($info) {

            $id     = $info['id'];

            $consult = "SELECT * FROM vwGetDataEdit WHERE id = '$id'";
            $noticia = DBConnection::query_assoc($consult);

            $consult = "SELECT * FROM vwGetCategorias;";
            $categorias = DBConnection::query_assoc($consult);

            $resultado = array("noticia" => $noticia, "categorias" => $categorias);

            return $resultado;

        }

        public static function add($info) {

            $texto      = $info['texto'];
            $categoria  = $info['categoria'];
            $header     = $info['header'];
            $etiquetas  = $info['etiquetas'];
            $foto       = $info['foto'];
            $id         = $info['id'];

            $server = NOTI_PATH."art/"; // directorio para guardar las imagenes que estan dentro de la noticia
            $imgsf = self::extraerSRC($texto); // buscamos las imagenes dentro del texto
            $imgs = $imgsf;
            $tam = count($imgsf);


            for ($i=0; $i < $tam; $i++) { 
                $filename = "img_noti_".date("Ymd").rand(0,9999); // asignamos nombre aleatorio a la imagen
                $img = $imgs[1][$i];

                copy($img,"noticias/art/$filename.jpg"); // la insertamos en el servidor
 
                sleep(1);

                $texto = str_replace($img,$server.$filename.".jpg", $texto);// cambiamos el nombre
            }

            $newtext = str_replace("'","\"", $texto);
            $datos = DBConnection::query_assoc("CALL SP_checkCat('$categoria')"); //comprobamos que la categorio existe 

            if (empty($datos)) {

                $consult = "CALL SP_insertCategoria('$categoria')";// si no existe la insertamos
                $datos = DBConnection::query_assoc($consult); 
                
                $cat = $datos[0]["id"];
                

            }else{
               
                $cat = $datos[0]["id"];// si existe obtenemos su id

            }
            
            $consult = "CALL SP_insertNoticia('$header','$newtext','$cat','$etiquetas','$foto','$id');";

            $resultado = DBConnection::query($consult);

            return $resultado;
        }

        public static function edit($info){

            $id             = $info['id'];
            $cat            = $info['cat'];
            $header         = $info['header'];
            $texto          = $info['texto'];
            $imagen_nueva   = $info['imagen_nueva'];
            $etiquetas      = $info['etiquetas'];
            $imagen_actual  = $info['imagen_actual'];
            $user           = $info['idUser'];

            $server = NOTI_PATH."art/";


            $imgsf = self::extraerSRC($texto);
            $imgs = $imgsf;
            $tam = count($imgsf);
            //Main::log($tam);

            for ($i=0; $i < $tam; $i++) { 
                $filename = "img_noti_".date("Ymd").rand(0,9999);
                $img = $imgs[1][$i];

                copy($img,"noticias/art/$filename.jpg");

                sleep(1);

                $texto = str_replace($img,$server.$filename.".jpg", $texto);
            }
            
            $newtext = str_replace("'","\"", $texto);
            
            $datos = DBConnection::query_assoc("CALL SP_checkCat('$cat')"); //se llama al procedimiento almacenado para validar los datos
            
            if (empty($datos)) {

                $consult = "CALL SP_insertCategoria('$cat')";
                $datos = DBConnection::query_assoc($consult); 
                
                $cat = $datos[0]["id"];
                

            }else{
                
                $cat = $datos[0]["id"];

            }

            if( $imagen_nueva == $imagen_actual){

                $consult = "CALL SP_editNoticia('$header','$newtext','$etiquetas','$cat','$user','$id');";
                
                $resultado = DBConnection::query($consult);

            }else{

                $img = pathinfo($imagen_actual);
                $path = str_replace("routes","",getcwd());
                $ruta = $path.$img['dirname']."/".$img['basename'];
                $thumb = str_replace(".".$img['extension'],"_thumb.".$img['extension'],$ruta);
    
                if (file_exists($ruta))
                   unlink($ruta);
    
                if (file_exists($thumb))
                    unlink($thumb);

                $consult = "CALL SP_editNoticia2('$header','$newtext','$etiquetas','$cat',
                '$imagen_nueva','$user','$id');";
                //Main::log($consult);
                $resultado = DBConnection::query($consult);


            }

            return $resultado;

        }

        public static function extraerSRC($cadena) {
            preg_match_all('@src="([^"]+)"@', $cadena, $array);
            //$src = array_pop($array);
            return $array;
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
            //$consult = "CALL SP_DeleteNoticia('{$info['eliminar']}');";
            
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


        public static function cabecera($info) { // subir imagen de cabecera de la noticia

            $url = $info['tmp_name'];
            $file = $info['name'];
            $type = $info["type"];

            $date = getdate();
            
            $day= $date["mday"];
            $month=$date["mon"];
            $year=$date["year"];
            $hour=$date["hours"];
            $minutes=$date["minutes"];

            $namefile=$year.$month.$day.$hour.$minutes.rand(0,99999); // asignamos un nombre aleatorio
            //Main::log($namefile);
            getcwd();
            chdir('../');
            $dir=getcwd(); // nos ubicamos en el directorio adecuado

            if($type=="image/jpeg"){ // validamos el formato de la imagen

                $namefilefinal=$namefile."."."jpg";

            }else{

                if($type=="image/png"){

                    $namefilefinal=$namefile."."."png";

                }else{

                    if($type=="image/gif"){

                        $namefilefinal=$namefile."."."gif";

                    }else{

                        $resultado = null;

                        return $resultado;
                    }
                }
            }

            $ruta = $dir."/noticias/".$namefilefinal;
            //Main::log($ruta);

            copy($url,$ruta); // copiamos la imagen a la carpeta

            sleep(3);//retrasamos la petición 3 segundos
            return  $namefilefinal;

        }


    }


 ?>