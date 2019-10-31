<?php 


    require_once '../utilities/DBConnection.class.php';
    require_once '../utilities/Main.class.php';
    require_once '../utilities/Session.class.php';

    /**
     * summary
     */
    class Clientes {

        public static function read($info)
        {

            if ($info == 2) {
                $consulta = "SELECT id,nombre, rfc,
                           CONCAT(calle,', ',num_ext,', ',colonia) domicilio, CONCAT(estado,' / ',municipio) localidadCentral,telefono,status
                           FROM clientes
                           ";
            } else  {
                $consulta = "SELECT id,nombre, rfc,
                           CONCAT(calle,', ',num_ext,', ',colonia) domicilio, CONCAT(estado,' / ',municipio) localidadCentral,telefono,status
                           FROM clientes
                           WHERE status = $info";
            }

            
            return DBConnection::query_row($consulta);
        }

        public static function busqueda($info)
        {
            
            //var_dump($info);
            //exit;
            $consulta = "SELECT id,nombre, rfc,
                           CONCAT(calle,', ',num_ext,', ',colonia) domicilio, CONCAT(estado,' / ',municipio) localidadCentral,telefono,status
                           FROM clientes
                       WHERE UPPER(nombre) LIKE UPPER('%{$info}%')
                       OR UPPER(rfc) LIKE UPPER('%{$info}%')
                       ";

            //echo $consulta; exit;

            return DBConnection::query_row($consulta);
        }

        public static function agregar($info)
        {
            session_start();
            $nombre   = $info['nombre'];
            $rfc   = $info['rfc'];
            $calle = $info['calle'];
            $colonia = $info['colonia'];
            $num_ext = $info['num_ext'];
            $num_int = $info['num_int'];
            $cp = $info['cp'];
            $estado = $info['estado'];
            $localidad = $info['localidad'];
            $municipio = $info['municipio'];
            $telefono = $info['telefono'];
            $correo = $info['correo'];
            $status = $info['status'];
            $nombreFact   = $info['nombreFact'];
            $rfcFact   = $info['rfcFact'];
            $calleFact = $info['calleFact'];
            $coloniaFact = $info['coloniaFact'];
            $num_extFact = $info['num_extFact'];
            $num_intFact = $info['num_intFact'];
            $cpFact = $info['cpFact'];
            $estadoFact = $info['estadoFact'];
            $localidadFact = $info['localidadFact'];
            $municipioFact = $info['municipioFact'];
            
            

            $username = $_SESSION['login'];
            //$fecha_registro = $info['fecha_registro'];

            $consulta = "INSERT INTO clientes (                                                 usuario,usuarioName,nombre,rfc,calle,colonia,num_ext,num_int,cp,
                        estado,localidad,municipio,telefono,correo,status,nombreFact,
                        rfcFact,calleFact,coloniaFact,num_extFact,num_intFact,cpFact,
                        estadoFact,localidadFact,municipioFact) 
                        VALUES
            (1,'$username','$nombre','$rfc','$calle','$colonia','$num_ext','$num_int','$cp',
                        '$estado','$localidad','$municipio','$telefono','$correo',1,'$nombreFact',
                        '$rfcFact','$calleFact','$coloniaFact','$num_extFact','$num_intFact','$cpFact',
                        '$estadoFact','$localidadFact','$municipioFact')";

            // echo $consulta; exit;
                        //var_dump($consulta);exit;
            return DBConnection::query($consulta);
            
        }

        public static function getClientes($info)
        {
            $id = $info['id'];

            $consulta = "SELECT * FROM clientes WHERE id = :id";
            $params   = array(':id' => $id);

            return DBConnection::query_row($consulta, $params);
            //return DBConnection::query_row($consulta);
        }

        public static function editarClientes($info)
        {
            $id        = $info['id'];
            $nombre   = $info['nombre'];
            $rfc   = $info['rfc'];
            $calle = $info['calle'];
            $colonia = $info['colonia'];
            $num_ext = $info['num_ext'];
            $num_int = $info['num_int'];
            $cp = $info['cp'];
            $estado = $info['estado'];
            $localidad = $info['localidad'];
            $municipio = $info['municipio'];
            $telefono = $info['telefono'];
            $correo = $info['correo'];
            $status = $info['status'];
            $nombreFact   = $info['nombreFact'];
            $rfcFact   = $info['rfcFact'];
            $calleFact = $info['calleFact'];
            $coloniaFact = $info['coloniaFact'];
            $num_extFact = $info['num_extFact'];
            $num_intFact = $info['num_intFact'];
            $cpFact = $info['cpFact'];
            $estadoFact = $info['estadoFact'];
            $localidadFact = $info['localidadFact'];
            $municipioFact = $info['municipioFact'];
            
            //$fecha_registro = $info['fecha_registro'];

            $consulta = "UPDATE clientes SET nombre = '$nombre',rfc = '$rfc', calle = '$calle', colonia = '$colonia', num_ext = '$num_ext',
            num_int = '$num_int', cp = '$cp', estado = '$estado', localidad = '$localidad',
            municipio = '$municipio', telefono = '$telefono', correo = '$correo', nombreFact = '$nombreFact',rfcFact = '$rfcFact', calleFact = '$calleFact', coloniaFact = '$coloniaFact', num_extFact = '$num_extFact',
            num_intFact = '$num_intFact', cpFact = '$cpFact', estadoFact = '$estadoFact', localidadFact = '$localidadFact',
            municipioFact = '$municipioFact' WHERE id = $id";

            return DBConnection::query($consulta);
        }

        public static function darBaja($info)
        {
            $id        = $info['id'];

            $consulta = "UPDATE clientes SET status = 0 WHERE id = $id ";

            return DBConnection::query($consulta);
        }

        public static function darAlta($info)
        {
            $id        = $info['id'];

            $consulta = "UPDATE clientes SET status = 1 WHERE id = $id ";

            return DBConnection::query($consulta);
        }

        public static function getDatosFact($info)
        {
            $id = $info['id'];

            $consulta = "SELECT nombre,rfc,calle,colonia,num_ext,num_int,cp,
                        estado,localidad,municipio FROM clientes WHERE id = :id";
            $params   = array(':id' => $id);

            return DBConnection::query_row($consulta, $params);
            //return DBConnection::query_row($consulta);
        }

        public static function mostrarNombreCliente($info)
        {   
             $id = $info['id'];       

            $consulta = "SELECT id,nombre
                        FROM clientes
                        WHERE id = '$id'";

            //echo $consulta; exit;

            return DBConnection::query_row($consulta);


        }

        public static function mostrarVehiculos($info)
        {   
             $id = $info['id'];       

            $consulta = "SELECT v.id,v.matricula,c.id,c.nombre,v.modelo,v.marca,v.vehiculo,
                        v.tipo_vehiculo,v.vehiculo_color,v.ciudad,v.provincia,
                        v.jefatura_transito,v.status
                        FROM vehiculos v
                        LEFT JOIN clientes c ON c.id = v.cliente
                        WHERE v.cliente = '$id'";

            //echo $consulta; exit;

            return DBConnection::query_row($consulta);


        }

        public static function darBajaVehiculo($info)
        {
            $id        = $info['id'];

            $consulta = "UPDATE vehiculos SET status = 0 WHERE id = $id ";

            return DBConnection::query($consulta);
        }

        public static function darAltaVehiculo($info)
        {
            $id        = $info['id'];

            $consulta = "UPDATE vehiculos SET status = 1 WHERE id = $id ";

            return DBConnection::query($consulta);
        }

        public static function agregarVehiculo($info)
        {
            session_start();
            $matricula   = $info['matricula'];
            $cliente   = $info['cliente'];
            $modelo   = $info['modelo'];
            $marca   = $info['marca'];
            $vehiculo   = $info['vehiculo'];
            $tipo_vehiculo   = $info['tipo_vehiculo'];
            $vehiculo_color   = $info['vehiculo_color'];
            $ciudad   = $info['ciudad'];
            $provincia   = $info['provincia'];
            $jefatura_transito   = $info['jefatura_transito'];
            
            

            $username = $_SESSION['login'];
            //$fecha_registro = $info['fecha_registro'];

            $consulta = "INSERT INTO vehiculos(matricula,cliente,modelo,marca,vehiculo,
                        tipo_vehiculo,vehiculo_color,ciudad,provincia,jefatura_transito) 
                        VALUES
                        ('$matricula','$cliente','$modelo','$marca','$vehiculo',
                        '$tipo_vehiculo','$vehiculo_color','$ciudad','$provincia','$jefatura_transito')";

            // echo $consulta; exit;
                        //var_dump($consulta);exit;
            return DBConnection::query($consulta);
            
        }

        public static function getVehiculos($info)
        {   
             $id = $info['id'];       

            $consulta = "SELECT v.id,v.matricula,v.modelo,v.marca,v.vehiculo,
                        v.tipo_vehiculo,v.vehiculo_color,v.ciudad,v.provincia,
                        v.jefatura_transito,v.status
                        FROM vehiculos v
                        WHERE v.id = '$id'";

            //echo $consulta; exit;

            return DBConnection::query_row($consulta);
        }

        public static function editarVehiculo($info)
        {
            $id        = $info['id'];
            $matricula   = $info['matricula'];
            $modelo   = $info['modelo'];
            $marca   = $info['marca'];
            $vehiculo   = $info['vehiculo'];
            $tipo_vehiculo   = $info['tipo_vehiculo'];
            $vehiculo_color   = $info['vehiculo_color'];
            $ciudad   = $info['ciudad'];
            $provincia   = $info['provincia'];
            $jefatura_transito   = $info['jefatura_transito'];
            
            //$fecha_registro = $info['fecha_registro'];

            $consulta = "UPDATE vehiculos SET matricula = '$matricula',modelo = '$modelo', marca = '$marca', vehiculo = '$vehiculo', tipo_vehiculo = '$tipo_vehiculo',
            vehiculo_color = '$vehiculo_color', ciudad = '$ciudad', provincia = '$provincia', jefatura_transito = '$jefatura_transito'
            WHERE id = $id";

            return DBConnection::query($consulta);
        }

        public static function verificar($info)
        {
            $id_vehiculo = $info['id'];

            $consulta = "CALL SP_VERIFICAR_VEHICULOS('$id_vehiculo')";

            // echo $consulta; exit;
                        //var_dump($consulta);exit;
            return DBConnection::query($consulta);
            
        }

         public static function getNoFolios()
        {       

            $consulta = "SELECT numero_folios 
                        FROM folios_detalles
                        WHERE status = 1";

            //echo $consulta; exit;

            return DBConnection::query_row($consulta);
        }

        public static function cambiarStatusFolio()
        {

            $consulta = "CALL SP_AGOTAR_FOLIOS()";

            return DBConnection::query($consulta);
        }

        
    }


 ?>