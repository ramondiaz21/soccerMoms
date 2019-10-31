<?php

// session_start();

require '../clases/Perfil.class.php';

$Perfil = new Perfil();

$action = $_POST['action'];

if (isset($_POST['info'])) {
    $info = $_POST['info'];
}

switch ($action) {
    case 'mostrarUsuario':
        echo json_encode($Perfil->mostrarUsuario($info));
        break;
    case 'read':
        echo json_encode($Perfil->read($info));
        break;
    case 'busqueda':
        echo json_encode($Perfil->busqueda($info));
        break;
    case 'agregar':
        echo json_encode($Perfil->agregar($info));
        break;
    case 'detallesEquipo':
        echo json_encode($Perfil->detallesEquipo($info));
        break;
    case 'getPerfil':
        echo json_encode($Perfil->getPerfil($info));
        break;
    case 'editarPerfil':
        echo json_encode($Perfil->editarPerfil($info));
        break;
    case 'darBaja':
        echo json_encode($Perfil->darBaja($info));
        break;
    case 'darAlta':
        echo json_encode($Perfil->darAlta($info));
        break;
    case 'editarEquipo':
        echo json_encode($Perfil->editarEquipo($info));
        break;
     case 'getEquipo':
        echo json_encode($Perfil->getEquipo($info));
        break;
}
