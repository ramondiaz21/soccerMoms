<?php  

    require('../clases/Noticia.class.php');

    $action = $_POST['action'];

    if(isset($_POST['info']))
        $info = $_POST['info'];
    

    switch ($action) {

        case 'Agregar_cat':

            echo json_encode(Noticia::Agregar_cat($info));

            break;

        case 'getCategorias':

            echo json_encode(Noticia::getCategorias());

            break;

        case 'search_info':

            echo json_encode(Noticia::search_info($info));

            break;

        case 'read':

            echo json_encode(Noticia::read());

            break;

        case 'add':

            echo json_encode(Noticia::add($info));//

            break;

        case 'readEdit':

            echo json_encode(Noticia::readEdit($info));//

            break;

        case 'subirimagen':

            echo Noticia::subirimagen($info);//

            break;

        case 'borrarimagen':

            echo json_encode(Noticia::borrarimagen($info));//

            break;

        case 'edit':

            echo json_encode(Noticia::edit($info));//

            break;

        case 'getnoticia':

            echo json_encode(Noticia::getnoticia($info));//

            break;

        case 'del':

            echo json_encode(Noticia::del($info));//

            break;

        case 'editImg':

        if (isset($_FILES["imagenedit"])){
                $info = $_FILES["imagenedit"];
                //var_dump($info);
                echo json_encode(Noticia::cabecera($info));
            }

            break;

        case 'getnoticias':

            echo json_encode(Noticia::getnoticias($info));//

            break;


        default:

        if (isset($_FILES["imagen"])){
            $info = $_FILES["imagen"];
            //var_dump($info);
            echo json_encode(Noticia::cabecera($info));
        }

        break;

        

    }

    

?>