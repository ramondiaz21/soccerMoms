<?php  
	
	session_start();

	require('../clases/Main.class.php');

	$Main = new Main();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		// case 'generaJSON':
		// 	echo $Main->generaJSON();
		// 	break;
	}
	
?>