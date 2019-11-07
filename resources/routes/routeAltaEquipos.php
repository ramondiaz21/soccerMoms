<?php

// session_start();

require '../clases/altaEquipos.class.php';

$Equipos = new Equipos();

$action = $_POST['action'];

if (isset($_POST['info'])) {
    $info = $_POST['info'];
}

switch ($action) {
    case 'getEquipos':
        echo json_encode($Equipos->getEquipos($info));
        break;
    case 'read':
        echo json_encode($Equipos->read($info));
        break;
    case 'busqueda':
        echo json_encode($Equipos->busqueda($info));
        break;
    case 'agregar':
        echo json_encode($Equipos->agregar($info));
        break;
    case 'getJugadora':
        echo json_encode($Equipos->getJugadora($info));
        break;
    case 'editarJugadora':
        echo json_encode($Equipos->editarJugadora($info));
        break;
    case 'darBaja':
        echo json_encode($Equipos->darBaja($info));
        break;
    case 'darAlta':
        echo json_encode($Equipos->darAlta($info));
        break;
    case 'agregarArchivoDetalles':
        echo json_encode($Equipos->agregarArchivoDetalles($info));
        break;
    case 'uploadArchivos':
            $doc = $_FILES["fileArchivo"];
            //var_dump($doc);exit();
            echo $Equipos->uploadArchivos($doc);

            break;

    default:

            $doc = $_FILES["filePrueba"];
            //var_dump($doc);exit();
            echo $Equipos->upload($doc);

            break;
}
