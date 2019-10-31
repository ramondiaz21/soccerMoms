<?php

// session_start();

require '../clases/AdminEquipos.class.php';

$adminEquipos = new adminEquipos();

$action = $_POST['action'];

if (isset($_POST['info'])) {
    $info = $_POST['info'];
}

switch ($action) {
    case 'getTodosEquipos':
        echo json_encode($adminEquipos->getTodosEquipos($info));
        break;
    case 'read':
        echo json_encode($adminEquipos->read($info));
        break;
    case 'busqueda':
        echo json_encode($adminEquipos->busqueda($info));
        break;
    case 'agregar':
        echo json_encode($adminEquipos->agregar($info));
        break;
    case 'getJugadora':
        echo json_encode($adminEquipos->getJugadora($info));
        break;
    case 'editarJugadora':
        echo json_encode($adminEquipos->editarJugadora($info));
        break;
    case 'darBaja':
        echo json_encode($adminEquipos->darBaja($info));
        break;
    case 'darAlta':
        echo json_encode($adminEquipos->darAlta($info));
        break;
    

}
