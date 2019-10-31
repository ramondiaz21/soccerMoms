<?php

// session_start();

require '../clases/AltaFolios.class.php';

$AltaFolios = new AltaFolios();

$action = $_POST['action'];

if (isset($_POST['info'])) {
    $info = $_POST['info'];
}

switch ($action) {
    case 'read':
        echo json_encode($AltaFolios->read());
        break;
    case 'busqueda':
        echo json_encode($AltaFolios->busqueda($info));
        break;
    case 'agregar':
        echo json_encode($AltaFolios->agregar($info));
        break;
    case 'asignarLote':
        echo json_encode($AltaFolios->asignarLote($info));
        break;
    case 'verStatus':
        echo json_encode($AltaFolios->verStatus($info));
        break;
    case 'darBaja':
        echo json_encode($AltaFolios->darBaja($info));
        break;
    case 'getFolios':
        echo json_encode($AltaFolios->getFolios($info));
        break;
    case 'editFolios':
        echo json_encode($AltaFolios->editFolios($info));
        break;
}
