<?php  

	/*require_once "resources/utilities/Session.class.php";

	$Session = new Session();

	$Session::destroy();

	header('Location: index.php');*/

	session_start(); //mantiene activa la sesion
  session_destroy(); //destruye la sesion iniciada
  header('Location: ./soccerMom-admin.php'); //posicionamos la cabecera
  exit(0); //salida

?>