<?php  
	
	require_once 'resources/utilities/config.php';

	$id= $_GET["id"];

	$url    = $_SERVER["REQUEST_URI"];
	$modulo = explode('.php', $url)[0];
	$modulo = explode('/', $modulo);

	$nombre = $_SESSION['login'];
	$idUser = $_SESSION['idUser'];


?>