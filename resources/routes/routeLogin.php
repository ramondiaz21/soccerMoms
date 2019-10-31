<?php

session_start();
require '../clases/Login.class.php';

$Login = new Login();

$action = $_POST['action'];

if (isset($_POST['info'])) {
    $info = $_POST['info'];
}

switch ($action) {
  case 'checkLogin':
      echo json_encode($Login->checkLogin($info));
      break;
  case 'entrarLogin':
      echo json_encode($Login->entrarLogin($info));
      break;
  case 'entrarLoginColaborador':
      echo json_encode($Login->entrarLoginColaborador($info));
      break;
  case 'getUsers':
      echo json_encode($Login->getUsers());
      break;
  case 'auth':
      echo json_encode($Login->login($info));
      break;
  case 'read':
      echo json_encode($Login->read());
      break;
  case 'save':
      echo json_encode($Login->save($info));
      break;
  case 'delete':
      echo json_encode($Login->delete($info));
      break;
  case 'detalles':
      $id = $info["id"];
      echo json_encode($Loogin->getDetalles($id));
      break;
}
