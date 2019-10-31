<?php

// session_start();

require '../clases/Clientes.class.php';

$Clientes = new Clientes();

$action = $_POST['action'];

if (isset($_POST['info'])) {
    $info = $_POST['info'];
}

switch ($action) {
    case 'read':
        echo json_encode($Clientes->read($info));
        break;
    case 'busqueda':
        echo json_encode($Clientes->busqueda($info));
        break;
    case 'agregar':
        echo json_encode($Clientes->agregar($info));
        break;
    case 'getClientes':
        echo json_encode($Clientes->getClientes($info));
        break;
    case 'editarClientes':
        echo json_encode($Clientes->editarClientes($info));
        break;
    case 'darBaja':
        echo json_encode($Clientes->darBaja($info));
        break;
    case 'darAlta':
        echo json_encode($Clientes->darAlta($info));
        break;
    case 'getDatosFact':
        echo json_encode($Clientes->getDatosFact($info));
        break;
    case 'mostrarNombreCliente':
        echo json_encode($Clientes->mostrarNombreCliente($info));
        break;
    case 'mostrarVehiculos':
        echo json_encode($Clientes->mostrarVehiculos($info));
        break;
    case 'darBajaVehiculo':
        echo json_encode($Clientes->darBajaVehiculo($info));
        break;
    case 'darAltaVehiculo':
        echo json_encode($Clientes->darAltaVehiculo($info));
        break;
    case 'agregarVehiculo':
        echo json_encode($Clientes->agregarVehiculo($info));
        break;
    case 'getVehiculos':
        echo json_encode($Clientes->getVehiculos($info));
        break;
    case 'editarVehiculo':
        echo json_encode($Clientes->editarVehiculo($info));
        break;
    case 'verificar':
        echo json_encode($Clientes->verificar($info));
        break;
    case 'getNoFolios':
        echo json_encode($Clientes->getNoFolios());
        break;
    case 'cambiarStatusFolio':
        echo json_encode($Clientes->cambiarStatusFolio($info));
        break;

}
