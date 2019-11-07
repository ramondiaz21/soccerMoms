<?php

// session_start();

require '../clases/altaEquipos.class.php';

$Equipos = new Equipos();

$action = $_POST['action'];

if (isset($_POST['info'])) {
    $info = $_POST['info'];
}

switch ($action) {

    default:

            $doc = $_FILES["fileArchivo"];
            //var_dump($doc);exit();
            echo $Equipos->uploadArchivos($doc);

            break;
}
