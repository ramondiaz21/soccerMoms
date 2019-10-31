<?php  
	
	Class Main {

		public static function DateTime(){
			$time = date('H:i:s', time());
			$date = date('d-m-Y');
			return array($time, $date);
		}

		public static function getDate(){
			$dateTime = $this->DateTime();
			$fecha = explode('-', $dateTime[1]);
			// $fecha[2] = substr($fecha[2], 2, 3);
			$fecha = $fecha[2].'-'.$fecha[1].'-'.$fecha[0];
			return $fecha;
		}

		public static function getTime(){
			$dateTime = $this->DateTime();
			$hora = $dateTime[0];
			return $hora;
		}

		public static function consumeAPI($url, $method, $info) {

			$curl = curl_init();

			$headers = array('header: authorization');
	        switch ($method)
	        {
				case "POST":
	                curl_setopt($curl, CURLOPT_POST, 1);

	                if ($info){
	                  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
	                  curl_setopt($curl, CURLOPT_POSTFIELDS, $info);
	                }

					break;
				case "GET" :
					curl_setopt($curl, CURLOPT_HTTPGET, 1);
					curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
					break;
				case "DELETE":
					curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");
					curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
					break;
	            case "PUT":
	                curl_setopt($curl, CURLOPT_PUT, 1);
	                break;
	            default:
	                if ($info)
	                    $url = sprintf("%s?%s", $url, http_build_query($info));
	        }

	        // Optional Authentication:
	        // curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
	        // curl_setopt($curl, CURLOPT_USERPWD, "username:password");

	        curl_setopt($curl, CURLOPT_URL, $url);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
			
			$result = curl_exec($curl);
			/*$err = curl_errno($curl);
			$errmsg = curl_error($curl);
			$mInfo = curl_getinfo($curl);*/
			
			return $result;
		}

		public static function getURL(){
			$url = $_SERVER['HTTP_REFERER'];
			$folders = explode('/', $url);
			$web = $_SERVER['HTTP_HOST'];
			for ($i = 3; $i < count($folders) - 1; $i++){
				$web .= "/".$folders[$i];
			}
			return $web;
		}

		public static function log($texto){
			$myfile = fopen("log.txt", "a") or die("Unable to open file!");

			$txt = "
			---- ".$texto." ----- ";

			fwrite($myfile, $txt);
			fclose($myfile);
		}


		public static function jsonToObject($info){
			$info = str_replace('\"', '"', $info);
			$info = json_decode($info);
			return $info[0];
		}

		public static function normaliza($cadena){
		    $originales = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŔŕ';
		    $modificadas = 'aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyRr';
		    $cadena = utf8_decode($cadena);
		    $cadena = strtr($cadena, utf8_decode($originales), $modificadas);
		    $cadena = strtolower($cadena);
		    return utf8_encode($cadena);
		}

		public static function enviarMail($mailTo, $nameTo, $cuerpo, $subject, $copia){
			// $page = 'http://localhost/volanteo/configTrabajo.php'; CAMBIAR ESTA VARIABLE POR SITIO DONDE SE ALOJA PROYECTO
			$msg = $cuerpo;
			
		    $bcc = "";
			$mailFrom = 'pruebacorreo2236@gmail.com';

			require_once("../plugins/PHPMailer-maste/PHPMailerAutoload.php");
			
			$mail = new PHPMailer();

			$mail->SMTPDebug = 0;

		    $mail->SetLanguage( 'es', '../PHPMailer-maste/includes/language/' );
		                    
		    $mail->From     = $mailFrom;   // Correo Electronico para SMTP 
		    $mail->FromName = 'Grupo Publicitario Heraldos'.$copia;
		    $mail->AddAddress($mailTo); // Dirección a la que llegaran los mensajes

		    if($bcc != "")
		    	$mail->AddBCC($bcc); // copia oculta

		    $mail->WordWrap = 50; 
		    $mail->IsHTML(true);     
		    $mail->CharSet = 'UTF-8';  
		    $mail->Subject  =  utf8_decode($subject);
		    $mail->Body     =  $msg;

			$mail->IsSMTP(); 
		    $mail->Host = "smtp.gmail.com";  // mail. o solo dominio - Servidor de 
		    $mail->Port = 587;
    		$mail->SMTPSecure = 'tls';
		    $mail->SMTPAuth = true; 
		    $mail->Username = $mailFrom;  // Correo Electrónico para SMTP correo@dominio
		    $mail->Password = "prueba2236"; // Contraseña para SMTP

		    if(!$mail->send())
		    	return false;
		    else
		    	return true;
		}
	}
?>