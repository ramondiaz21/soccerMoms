$(document).ready(function() {
  loadData();
});

var error = "Ocurrió un error insesperado en el sitio, por favor intentelo mas tarde o pongase en contacto con su administrador.";
var success = "La accion se ralizó con exito";
var datosIncorrectos = "Datos incorrectos, vuelve a intentarlo.";

var clienteId;
var numeroFolios;
var darDeBajaFolios;
var idVehiculo;
var foliosDisponibles = 0;

function loadData($info) {

  var filtro = $('#select_status').val();

  $.ajax({
    url: 'resources/routes/routeClientes.php',
    type: 'POST',
    data: {
      info: filtro,
      action: "read"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      //console.log(error);
      toast1("Error!", error, 5000, "error");
      removeSpinner();
    },
    success: function(data) {
      //console.log(data);
      removeSpinner();
      verFolios();
      if (data != "" && data != null) {
        clienteId = data[0][0];
        var tbody = '';
        var indices = data[0].length;
        var thead = '<tr>' +
          '<th>NO.</th>' +
          '<th>NOMBRE</th>' +
          '<th>RFC</th>' +
          '<th>DOMICILIO</th>' +
          '<th>ESTADO / MUNICIPIO</th>' +
          '<th>TELÉFONO</th>' +
          '<th>ESTATUS</th>' +
          '<th>OPCIONES</th>';

        for (var i = 0; i < data.length; i++) {
          tbody += '<tr data-toggle="tooltip" title="" id="row_' + data[i][0] + '">'
          for (var j = 0; j < indices; j++) {
            if (j == (indices - 1)) {
              if (data[i][6] == 1)
                tbody += '<td><button type="button" class="btn btn-success btn-sm">' + 'Activo' + '</button></td>'
              else if (data[i][6] == 0)
                tbody += '<td><button type="button" class="btn btn-warning btn-sm">' + 'Inactivo' + '</button></td>'
              else if (data[i][6] == 3)
                tbody += '<td><button type="button" class="btn btn-danger btn-sm">' + 'Eliminado' + '</button></td>'
            } else
              tbody += '<td>' + data[i][j] + '</td>'
          }

          if (data[i][data[i].length - 1] == 1) {
            ////console.log(data[i][data[i].length - 1]);
            tbody += '<td>' +
              '<a href="#" id="btnEdit"  onclick="editClientes(' + data[i][0] + ')"  style="margin: 0 5px;" class="btn btn-warning btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-pencil"></i> Editar ' +
              '</a>' +
              /*'<a href="#" id="btnBaja" onclick="detalles(' + data[i][0] + ')" style="" class="btn btn-primary btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-trash-o"></i> Detalles ' +
              '</a> ' +*/
              '<a href="#" id="btnVehiculos" onclick="mostrarNombreCliente(' + data[i][0] + ')" data-toggle="modal" data-target="#modVerVehiculo" style="margin: 0 5px;" class="btn btn-primary btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-truck"></i> Vehículos ' +
              '</a> ' +
              '<a href="#" id="btnBaja" onclick="darBaja(' + data[i][0] + ')" style="margin: 0 5px;" class="btn btn-danger btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-trash-o"></i> Dar de baja ' +
              '</a> ' +
              /*'<a href="#" id="btnBaja" onclick="eliminar(' + data[i][0] + ')" style="" class="btn btn-danger btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-trash-o"></i> Eliminar ' +
              '</a>' +*/
              '</td>'
          } else if (data[i][data[i].length - 1] == 0) {
            tbody += '<td>' +
              '<a id="btnReactivar" href="#" onclick="darAlta(' + data[i][0] + ')" class="btn btn-success btn-sm btnReactivar">' +
              '<i class=""></i> Reactivar ' +
              '</a>' +
              '</td>'
          } else {}
        }

        $('#thead').empty();
        $('#tbody').empty();

        $('#thead').append(thead);
        $('#tbody').append(tbody);

      } else {
        $('#tbody').empty();
        toast1("Atencion!", "No hay clientes para mostrar", 5000, "error");
      }
    }
  });
}

function darBaja(id) {

  var parametro = {
    id: id
  }

  bootbox.confirm({
    message: "¿Estás seguro de querer dar de baja este cliente?",
    buttons: {
      confirm: {
        label: 'Si',
        className: 'btn-success'
      },
      cancel: {
        label: 'No',
        className: 'btn-danger'
      }
    },
    callback: function(result) {
      if (result == true) {
        $.ajax({
          url: 'resources/routes/routeClientes.php',
          type: 'POST',
          data: {
            info: parametro,
            action: "darBaja"
          },
          dataType: 'JSON',
          beforeSend: function() {
            showSpinner();
          },
          error: function(error) {
            ////console.log(error);
            toast1("Error!", error, 5000, "error");
            removeSpinner();
          },
          success: function(data) {
            ////console.log(data);
            removeSpinner();

            if (data != "") {
              loadData();
              toast1("éxito", "Se dio de baja correctamente", 5000, "success");
            } else {
              $('tbody').empty();
              toast1("Atencion!", "No se pudo dar de baja", 5000, "error");
            }
          }
        });
      }
    }
  });
}

function darAlta(id) {

  var parametro = {
    id: id
  }

  bootbox.confirm({
    message: "¿Estás seguro de querer reactivar este cliente?",
    buttons: {
      confirm: {
        label: 'Si',
        className: 'btn-success'
      },
      cancel: {
        label: 'No',
        className: 'btn-danger'
      }
    },
    callback: function(result) {
      if (result == true) {
        $.ajax({
          url: 'resources/routes/routeClientes.php',
          type: 'POST',
          data: {
            info: parametro,
            action: "darAlta"
          },
          dataType: 'JSON',
          beforeSend: function() {
            showSpinner();
          },
          error: function(error) {
            ////console.log(error);
            toast1("Error!", error, 5000, "error");
            removeSpinner();
          },
          success: function(data) {
            ////console.log(data);
            removeSpinner();

            if (data != "") {
              loadData();
              toast1("éxito", "Se dio de alta correctamente", 5000, "success");
            } else {
              $('tbody').empty();
              toast1("Atencion!", "No se pudo dar de alta", 5000, "error");
            }
          }
        });
      }
    }
  });
}

function agregaClientes() {

  var parametro = {
    nombre: $('#txtNombre').val(),
    rfc: $('#txtRfc').val(),
    calle: $('#txtCalle').val(),
    colonia: $('#txtColonia').val(),
    num_ext: $('#txtNoExt').val(),
    num_int: $('#txtNoInt').val(),
    cp: $('#txtCp').val(),
    estado: $('#txtEstado').val(),
    localidad: $('#txtLocalidad').val(),
    municipio: $('#txtMunicipio').val(),
    telefono: $('#txtTelefono').val(),
    correo: $('#txtCorreo').val(),
    nombreFact: $('#txtNombreFact').val(),
    rfcFact: $('#txtRfcFact').val(),
    calleFact: $('#txtCalleFact').val(),
    coloniaFact: $('#txtColoniaFact').val(),
    num_extFact: $('#txtNoExtFact').val(),
    num_intFact: $('#txtNoIntFact').val(),
    cpFact: $('#txtCpFact').val(),
    estadoFact: $('#txtEstadoFact').val(),
    localidadFact: $('#txtLocalidadFact').val(),
    municipioFact: $('#txtMunicipioFact').val(),
  }

  $.ajax({
    url: 'resources/routes/routeClientes.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "agregar"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      ////console.log(error);
      toast1("Error!", error, 5000, "error");
      removeSpinner();
    },
    success: function(data) {
      ////console.log(data);
      cleanDataModals();
      removeModals();
      removeSpinner();

      if (data != "") {
        loadData();
        toast1("éxito", "Se agrego correctamente", 5000, "success");
      } else {
        $('tbody').empty();
        toast1("Atencion!", "No hay clientes para mostrar", 5000, "error");
      }
    }
  });
}

function editClientes(id) {

  var parametro = {
    id: id
  }

  $.ajax({
    url: 'resources/routes/routeClientes.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "getClientes"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      ////console.log(error);
      toast1("Error!", error, 5000, "error");
      removeSpinner();
    },
    success: function(data) {
      console.log(data);
      removeSpinner();

      if (data != "") {
        $('#modEditarCliente').modal('show');
        $('#txtIdE').val(data[0][0]);
        $('#txtIdUE').val(data[0][1]);
        $('#txtNombreE').val(data[0][3]);
        $('#txtRfcE').val(data[0][4]);
        $('#txtCalleE').val(data[0][5]);
        $('#txtColoniaE').val(data[0][6]);
        $('#txtNoExtE').val(data[0][7]);
        $('#txtNoIntE').val(data[0][8]);
        $('#txtCpE').val(data[0][9]);
        $('#txtEstadoE').val(data[0][10]);
        $('#txtLocalidadE').val(data[0][11]);
        $('#txtMunicipioE').val(data[0][12]);
        $('#txtTelefonoE').val(data[0][13]);
        $('#txtCorreoE').val(data[0][14]);
        $('#txtNombreFactE').val(data[0][18]);
        $('#txtRfcFactE').val(data[0][19]);
        $('#txtCalleFactE').val(data[0][20]);
        $('#txtColoniaFactE').val(data[0][21]);
        $('#txtNoExtFactE').val(data[0][22]);
        $('#txtNoIntFactE').val(data[0][23]);
        $('#txtCpFactE').val(data[0][24]);
        $('#txtEstadoFactE').val(data[0][25]);
        $('#txtLocalidadFactE').val(data[0][26]);
        $('#txtMunicipioFactE').val(data[0][27]);
      } else {
        $('tbody').empty();
        toast1("Atencion!", "No hay clientes para mostrar", 5000, "error");
      }
    }
  });
}

function guardarEditar() {

  var parametro = {
    id: $('#txtIdE').val(),
    usuario: $('#txtIdUE').val(),
    nombre: $('#txtNombreE').val(),
    rfc: $('#txtRfcE').val(),
    calle: $('#txtCalleE').val(),
    colonia: $('#txtColoniaE').val(),
    num_ext: $('#txtNoExtE').val(),
    num_int: $('#txtNoIntE').val(),
    cp: $('#txtCpE').val(),
    estado: $('#txtEstadoE').val(),
    localidad: $('#txtLocalidadE').val(),
    municipio: $('#txtMunicipioE').val(),
    telefono: $('#txtTelefonoE').val(),
    correo: $('#txtCorreoE').val(),
    nombreFact: $('#txtNombreFactE').val(),
    rfcFact: $('#txtRfcFactE').val(),
    calleFact: $('#txtCalleFactE').val(),
    coloniaFact: $('#txtColoniaFactE').val(),
    num_extFact: $('#txtNoExtFactE').val(),
    num_intFact: $('#txtNoIntFactE').val(),
    cpFact: $('#txtCpFactE').val(),
    estadoFact: $('#txtEstadoFactE').val(),
    localidadFact: $('#txtLocalidadFactE').val(),
    municipioFact: $('#txtMunicipioFactE').val(),
  }

  $.ajax({
    url: 'resources/routes/routeClientes.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "editarClientes"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      ////console.log(error);
      toast1("Error!", error, 5000, "error");
      removeSpinner();
    },
    success: function(data) {
      console.log(data);
      //cleanDataModals();
      removeModals();
      removeSpinner();

      if (data != "") {
        loadData();
        toast1("éxito", "Se edito correctamente", 5000, "success");
      } else {
        $('tbody').empty();
        toast1("Atencion!", "No se edito", 5000, "error");
      }
    }
  });
}

function getDatosFact(id) {

  var parametro = {
    id: id
  }

  $.ajax({
    url: 'resources/routes/routeClientes.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "getDatosFact"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      ////console.log(error);
      toast1("Error!", error, 5000, "error");
      removeSpinner();
    },
    success: function(data) {
      console.log(data);
      removeSpinner();

      if (data != "") {
        //$('#modEditarCliente').modal('show');
        $('#txtIdE').val(data[0][0]);
        $('#txtIdUE').val(data[0][1]);
        $('#txtNombreE').val(data[0][3]);
        $('#txtRfcE').val(data[0][4]);
        $('#txtCalleE').val(data[0][5]);
        $('#txtColoniaE').val(data[0][6]);
        $('#txtNoExtE').val(data[0][7]);
        $('#txtNoIntE').val(data[0][8]);
        $('#txtCpE').val(data[0][9]);
        $('#txtEstadoE').val(data[0][10]);
        $('#txtLocalidadE').val(data[0][11]);
        $('#txtMunicipioE').val(data[0][12]);
        $('#txtTelefonoE').val(data[0][13]);
        $('#txtCorreoE').val(data[0][14]);
        $('#txtNombreFactE').val(data[0][18]);
        $('#txtRfcFactE').val(data[0][19]);
        $('#txtCalleFactE').val(data[0][20]);
        $('#txtColoniaFactE').val(data[0][21]);
        $('#txtNoExtFactE').val(data[0][22]);
        $('#txtNoIntFactE').val(data[0][23]);
        $('#txtCpFactE').val(data[0][24]);
        $('#txtEstadoFactE').val(data[0][25]);
        $('#txtLocalidadFactE').val(data[0][26]);
        $('#txtMunicipioFactE').val(data[0][27]);
      } else {
        $('tbody').empty();
        toast1("Atencion!", "No hay clientes para mostrar", 5000, "error");
      }
    }
  });
}

$(document).on('click', '#btnAgregarNew', function(e) {

  e.preventDefault();
  var flag = true;
  var cont = 0;

  $('#formAgregarCliente input.necesary').each(function(index, currentElement) {
    var currentElement = $(this);
    var value = currentElement.val();

    ////console.log(value);

    if (value == "" || value == "null") {
      flag = false;
      cont++;
      $(this).addClass('invalido');
    } else {
      flag = true;
    }
  });

  $('#formAgregarCliente input.necesary').keyup(function(currentElement) {
    var currentElement = $(this);
    var value = currentElement.val();

    if (value == "" || value == "null") {
      $(this).addClass('invalido');
    } else {
      $(this).removeClass('invalido');
    }
  });

  if (flag == false || cont >= 1) {
    toast1("Error!", "Por favor llena todos los campos", 5000, "error");
  } else {
    agregaClientes();
  }
});

$(document).on('click', '#btnguardarEdit', function(e) {

  e.preventDefault();
  var flag = true;
  var cont = 0;

  $('#formEditarCliente input.necesary').each(function(index, currentElement) {
    var currentElement = $(this);
    var value = currentElement.val();

    ////console.log(value);

    if (value == "" || value == "null") {
      flag = false;
      cont++;
      $(this).addClass('invalido');
    } else {
      flag = true;
    }
  });

  $('#formEditarCliente input.necesary').keyup(function(currentElement) {
    var currentElement = $(this);
    var value = currentElement.val();

    if (value == "" || value == "null") {
      $(this).addClass('invalido');
    } else {
      $(this).removeClass('invalido');
    }
  });

  if (flag == false || cont >= 1) {
    toast1("Error!", "Por favor llena todos los campos", 5000, "error");
  } else {
    guardarEditar();
  }
});

$(document).on('click', '#btnAgregarVehiculo', function(e) {

  e.preventDefault();
  var flag = true;
  var cont = 0;

  $('#formAgregarVehiculo input.necesary').each(function(index, currentElement) {
    var currentElement = $(this);
    var value = currentElement.val();

    ////console.log(value);

    if (value == "" || value == "null") {
      flag = false;
      cont++;
      $(this).addClass('invalido');
    } else {
      flag = true;
    }
  });

  $('#formAgregarVehiculo input.necesary').keyup(function(currentElement) {
    var currentElement = $(this);
    var value = currentElement.val();

    if (value == "" || value == "null") {
      $(this).addClass('invalido');
    } else {
      $(this).removeClass('invalido');
    }
  });

  if (flag == false || cont >= 1) {
    toast1("Error!", "Por favor llena todos los campos", 5000, "error");
  } else {
    agregarVehiculo();
  }
});

$(document).on('click', '#btnEditarVehiculo', function(e) {

  e.preventDefault();
  var flag = true;
  var cont = 0;

  $('#formEditarVehiculo input.necesary').each(function(index, currentElement) {
    var currentElement = $(this);
    var value = currentElement.val();

    ////console.log(value);

    if (value == "" || value == "null") {
      flag = false;
      cont++;
      $(this).addClass('invalido');
    } else {
      flag = true;
    }
  });

  $('#formEditarVehiculo input.necesary').keyup(function(currentElement) {
    var currentElement = $(this);
    var value = currentElement.val();

    if (value == "" || value == "null") {
      $(this).addClass('invalido');
    } else {
      $(this).removeClass('invalido');
    }
  });

  if (flag == false || cont >= 1) {
    toast1("Error!", "Por favor llena todos los campos", 5000, "error");
  } else {
    editarVehiculo();
  }
});

$(document).on('click', '#btnCancelarNew', function(e) {
  e.preventDefault();
  var flag = true;
  var cont = 0;

  $('#formAgregarCliente input.necesary').each(function(index, currentElement) {
    var currentElement = $(this);
    var value = currentElement.val();

    ////console.log(value);

    if (value == "" || value == "null") {
      $(this).removeClass('invalido');
    } else {
      flag = true;
    }
  });
});

$(document).on('click', '#copiarDatos', function(e) {
  e.preventDefault();
  var value = $("#txtNombre").val();
  var value2 = $("#txtRfc").val();
  var value3 = $("#txtCalle").val();
  var value4 = $("#txtColonia").val();
  var value5 = $("#txtNoExt").val();
  var value6 = $("#txtNoInt").val();
  var value7 = $("#txtCp").val();
  var value8 = $("#txtEstado").val();
  var value9 = $("#txtLocalidad").val();
  var value10 = $("#txtMunicipio").val();

  $("#txtNombreFact").val(value);
  $("#txtRfcFact").val(value2);
  $("#txtCalleFact").val(value3);
  $("#txtColoniaFact").val(value4);
  $("#txtNoExtFact").val(value5);
  $("#txtNoIntFact").val(value6);
  $("#txtCpFact").val(value7);
  $("#txtEstadoFact").val(value8);
  $("#txtLocalidadFact").val(value9);
  $("#txtMunicipioFact").val(value10);


  /*$(document).ready(function() {
    $("#txtNombre").keyup(function() {
      var value = $(this).val();
      $("#txtNombreFact").val(value);
    });
  });*/
});

$(document).on('change', '#select_status', function(e) {
  loadData();
});

function removeModals() {
  $('#modAgregarCliente').modal('hide');
  $('#modAgregarVehiculo').modal('hide');
  $('#modEditarVehiculo').modal('hide');
  $('#modEditarCliente').modal('hide');
}

function cleanDataModals() {
  $("#formAgregarCliente input.form-control").val("");
  $("#formAgregarVehiculo input.form-control").val("");
}

$(document).on('keyup', '#txt_busqueda', function(e) {

  $.ajax({
    url: 'resources/routes/routeClientes.php',
    type: 'POST',
    async: false,
    data: {
      info: $(this).val(),
      action: "busqueda"
    },
    dataType: 'JSON',
    beforeSend: function() {
      // showSpinner();
    },
    error: function(error) {
      ////console.log(error);
      toast1("Error!", error, 5000, "error");
      // removeSpinner();
    },
    success: function(data) {
      ////console.log(data);
      removeSpinner();
      if (data != "" && data != null) {
        clienteId = data[0][0];
        var tbody = '';
        var indices = data[0].length;
        var thead = '<tr>' +
          '<th>NO.</th>' +
          '<th>NOMBRE</th>' +
          '<th>RFC</th>' +
          '<th>DOMICILIO</th>' +
          '<th>ESTADO / MUNICIPIO</th>' +
          '<th>TELÉFONO</th>' +
          '<th>ESTATUS</th>' +
          '<th>OPCIONES</th>';

        for (var i = 0; i < data.length; i++) {
          tbody += '<tr data-toggle="tooltip" title="" id="row_' + data[i][0] + '">'
          for (var j = 0; j < indices; j++) {
            if (j == (indices - 1)) {
              if (data[i][6] == 1)
                tbody += '<td><button type="button" class="btn btn-success btn-sm">' + 'Activo' + '</button></td>'
              else if (data[i][6] == 0)
                tbody += '<td><button type="button" class="btn btn-warning btn-sm">' + 'Inactivo' + '</button></td>'
              else if (data[i][6] == 3)
                tbody += '<td><button type="button" class="btn btn-danger btn-sm">' + 'Eliminado' + '</button></td>'
            } else
              tbody += '<td>' + data[i][j] + '</td>'
          }

          if (data[i][data[i].length - 1] == 1) {
            ////console.log(data[i][data[i].length - 1]);
            tbody += '<td>' +
              '<a href="#" id="btnEdit"  onclick="editClientes(' + data[i][0] + ')"  style="margin: 0 5px;" class="btn btn-warning btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-pencil"></i> Editar ' +
              '</a>' +
              /*'<a href="#" id="btnBaja" onclick="detalles(' + data[i][0] + ')" style="" class="btn btn-primary btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-trash-o"></i> Detalles ' +
              '</a> ' +*/
              '<a href="#" id="btnVehiculos" onclick="mostrarNombreCliente(' + data[i][0] + ')" data-toggle="modal" data-target="#modVerVehiculo" style="margin: 0 5px;" class="btn btn-primary btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-truck"></i> Vehículos ' +
              '</a> ' +
              '<a href="#" id="btnBaja" onclick="darBaja(' + data[i][0] + ')" style="margin: 0 5px;" class="btn btn-danger btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-trash-o"></i> Dar de baja ' +
              '</a> ' +
              /*'<a href="#" id="btnBaja" onclick="eliminar(' + data[i][0] + ')" style="" class="btn btn-danger btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-trash-o"></i> Eliminar ' +
              '</a>' +*/
              '</td>'
          } else if (data[i][data[i].length - 1] == 0) {
            tbody += '<td>' +
              '<a id="btnReactivar" href="#" onclick="darAlta(' + data[i][0] + ')" class="btn btn-success btn-sm btnReactivar">' +
              '<i class=""></i> Reactivar ' +
              '</a>' +
              '</td>'
          } else {}
        }

        $('#thead').empty();
        $('#tbody').empty();

        $('#thead').append(thead);
        $('#tbody').append(tbody);

      } else {
        $('#tbody').empty();
        //toast1("Atencion!", "No hay clientes para mostrar", 5000, "error");
      }
    }
  });
});

function mostrarNombreCliente(id) {


  var parametro = {
    id: id
  }
  console.log(parametro);

  $.ajax({
    url: 'resources/routes/routeClientes.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "mostrarNombreCliente"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      //console.log(error);
      toast1("Error!", error, 8000, "error");
      removeSpinner();
    },
    success: function(data) {
      console.log(data);
      removeSpinner();


      if (data != "" && data != null) {
        $('#txtNombreCliente').html(data[0][1]);

        clienteId = data[0][0];
        getNoFolios();
        console.log(foliosDisponibles);
        if (foliosDisponibles == 1) {
          mostrarVehiculos(clienteId);
        } else {
          mostrarVehiculosAlt(clienteId);
        }

      } else {
        $('#tbodyVehiculo').empty();
        toast1("Atencion!", "No hay vehículos para mostrar", 5000, "error");
      }
    }
  });
}

function mostrarVehiculos(id) {

  var parametro = {
    id: id
  }
  console.log(parametro);

  $.ajax({
    url: 'resources/routes/routeClientes.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "mostrarVehiculos"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      //console.log(error);
      toast1("Error!", error, 8000, "error");
      removeSpinner();
    },
    success: function(data) {
      console.log(data);
      removeSpinner();

      verFolios();
      if (data != "" && data != null) {
        $('#modVerVehiculo').modal('show');
        $('#txtNombreCliente').html(data[0][3]);

        var tbodyVehiculo = '';
        var indices = data[0].length;
        var theadVehiculo = '<tr>' +
          '<th>#</th>' +
          '<th>MATRICULA</th>' +
          '<th style="display: none">CLIENTE</th>' +
          '<th style="display: none">id</th>' +
          '<th>MODELO</th>' +
          '<th>MARCA</th>' +
          '<th>VEHÍCULO</th>' +
          '<th>TIPO</th>' +
          '<th>COLOR</th>' +
          '<th>CIUDAD</th>' +
          '<th>PROVINCIA</th>' +
          '<th>JEFATURA TRANSITO</th>' +
          '<th>STATUS</th>' +
          '<th>OPCIONES</th>' +
          '</tr>';

        for (var i = 0; i < data.length; i++) {
          tbodyVehiculo += '<tr data-toggle="tooltip" title="" id="row_' + data[i][0] + '">'
          for (var j = 0; j < indices; j++) {
            if (j == (indices - 1)) {
              //console.log(indices - 1);
              if (data[i][12] == 1)
                tbodyVehiculo += '<td><button type="button" class="btn btn-success btn-sm">' + 'Activo' + '</button></td>'
              else if (data[i][12] == 0)
                tbodyVehiculo += '<td><button type="button" class="btn btn-warning btn-sm">' + 'Inactivo' + '</button></td>'
              else if (data[i][12] == 3)
                tbodyVehiculo += '<td><button type="button" class="btn btn-success btn-sm"><i class="fa fa-check"></i>' + ' Verificado' + '</button></td>'
            }
            if (j == 2) {
              tbodyVehiculo += '<td style="display: none">' + data[0][2] + '</td>';
            } else if (j == 3) {
              tbodyVehiculo += '<td style="display: none">' + data[0][3] + '</td>';
            } else if (j == 12) {
              tbodyVehiculo += '<td style="display: none">' + data[0][12] + '</td>';
            } else {
              tbodyVehiculo += '<td>' + data[i][j] + '</td>'
            }
          }

          if (data[i][data[i].length - 1] == 1) {
            //console.log(data[i][data[i].length - 1]);
            tbodyVehiculo += '<td>' +
              '<a href="#" id="btnEdit"  onclick="getVehiculos(' + data[i][0] + ')"  style="width:100%;margin: 5px 0;" class="btn btn-warning btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-pencil"></i> Editar ' +
              '</a>' +
              '<a href="#" id="btnBaja" onclick="darBajaVehiculo(' + data[i][0] + ')" style="width:100%;margin: 5px 0;" class="btn btn-danger btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-trash-o"></i> Dar de baja ' +
              '</a> ' +
              '<a href="#" id="btnBaja" onclick="verificar(' + data[i][0] + ')" style="width:100%;margin: 5px 0;" class="btn btn-success btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-check"></i> Verificar ' +
              '</a>' +
              '</td>'
          } else if (data[i][data[i].length - 1] == 0) {
            tbodyVehiculo += '<td>' +
              '<a id="btnReactivar" href="#" onclick="darAltaVehiculo(' + data[i][0] + ')" class="btn btn-success btn-sm btnReactivar">' +
              '<i class=""></i> Reactivar ' +
              '</a>' +
              '</td>'
          } else {}
        }

        $('#theadVehiculo').empty();
        $('#tbodyVehiculo').empty();

        $('#theadVehiculo').append(theadVehiculo);
        $('#tbodyVehiculo').append(tbodyVehiculo);

      } else {
        $('#tbodyVehiculo').empty();
        //toast1("Atencion!", "No hay vehículos para mostrar", 5000, "error");
      }
    }
  });
}

function darBajaVehiculo(id) {

  //getNoFolios();

  var parametro = {
    id: id
  }

  bootbox.confirm({
    message: "¿Estás seguro de querer dar de baja este vehículo?",
    buttons: {
      confirm: {
        label: 'Si',
        className: 'btn-success'
      },
      cancel: {
        label: 'No',
        className: 'btn-danger'
      }
    },
    callback: function(result) {
      if (result == true) {
        $.ajax({
          url: 'resources/routes/routeClientes.php',
          type: 'POST',
          data: {
            info: parametro,
            action: "darBajaVehiculo"
          },
          dataType: 'JSON',
          beforeSend: function() {
            showSpinner();
          },
          error: function(error) {
            ////console.log(error);
            toast1("Error!", error, 5000, "error");
            removeSpinner();
          },
          success: function(data) {
            ////console.log(data);
            removeSpinner();

            if (data != "") {
              if (foliosDisponibles == 1) {
                mostrarVehiculos(clienteId);
              } else {
                mostrarVehiculosAlt(clienteId);
              }
              toast1("éxito", "Se dio de baja correctamente", 5000, "success");
            } else {
              $('tbody').empty();
              toast1("Atencion!", "No se pudo dar de baja", 5000, "error");
            }
          }
        });
      }
    }
  });
}

function darAltaVehiculo(id) {

  //getNoFolios();

  var parametro = {
    id: id
  }

  bootbox.confirm({
    message: "¿Estás seguro de querer reactivar este vehículo?",
    buttons: {
      confirm: {
        label: 'Si',
        className: 'btn-success'
      },
      cancel: {
        label: 'No',
        className: 'btn-danger'
      }
    },
    callback: function(result) {
      if (result == true) {
        $.ajax({
          url: 'resources/routes/routeClientes.php',
          type: 'POST',
          data: {
            info: parametro,
            action: "darAltaVehiculo"
          },
          dataType: 'JSON',
          beforeSend: function() {
            showSpinner();
          },
          error: function(error) {
            ////console.log(error);
            toast1("Error!", error, 5000, "error");
            removeSpinner();
          },
          success: function(data) {
            ////console.log(data);
            removeSpinner();

            if (data != "") {
              if (foliosDisponibles == 1) {
                mostrarVehiculos(clienteId);
              } else {
                mostrarVehiculosAlt(clienteId);
              }
              toast1("éxito", "Se dio de alta correctamente", 5000, "success");
            } else {
              $('tbody').empty();
              toast1("Atencion!", "No se pudo dar de alta", 5000, "error");
            }
          }
        });
      }
    }
  });
}

function agregarVehiculo($info) {

  var parametro = {
    matricula: $('#txtMatricula').val(),
    cliente: clienteId,
    modelo: $('#txtModelo').val(),
    marca: $('#txtMarca').val(),
    vehiculo: $('#txtVehiculo').val(),
    tipo_vehiculo: $('#txtTipo').val(),
    vehiculo_color: $('#txtColor').val(),
    ciudad: $('#txtCiudad').val(),
    provincia: $('#txtProvincia').val(),
    jefatura_transito: $('#txtJefaturaTransito').val()
  }
  console.log(parametro);

  $.ajax({
    url: 'resources/routes/routeClientes.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "agregarVehiculo"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      ////console.log(error);
      toast1("Error!", error, 5000, "error");
      removeSpinner();
    },
    success: function(data) {
      ////console.log(data);
      cleanDataModals();
      removeModals();
      removeSpinner();

      if (data != "") {
        //loadData();
        getNoFolios();
        if (foliosDisponibles == 1) {
          mostrarVehiculos(clienteId);
        } else {
          mostrarVehiculosAlt(clienteId);
        }
        toast1("éxito", "Se agrego correctamente", 5000, "success");
      } else {
        $('tbody').empty();
        toast1("Atencion!", "No hay vehiculos para mostrar", 5000, "error");
      }
    }
  });
}

function getVehiculos(id) {

  var parametro = {
    id: id
  }
  console.log(parametro);
  $.ajax({
    url: 'resources/routes/routeClientes.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "getVehiculos"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      ////console.log(error);
      toast1("Error!", error, 5000, "error");
      removeSpinner();
    },
    success: function(data) {
      console.log(data);
      removeSpinner();

      if (data != "") {
        $('#modEditarVehiculo').modal('show');
        $('#txtIdVE').val(data[0][0]);
        idVehiculo = data[0][0];
        $('#txtMatriculaE').val(data[0][1]);
        $('#txtModeloE').val(data[0][2]);
        $('#txtMarcaE').val(data[0][3]);
        $('#txtVehiculoE').val(data[0][4]);
        $('#txtTipoE').val(data[0][5]);
        $('#txtColorE').val(data[0][6]);
        $('#txtCiudadE').val(data[0][7]);
        $('#txtProvinciaE').val(data[0][8]);
        $('#txtJefaturaTransitoE').val(data[0][9]);

      } else {
        $('tbody').empty();
        toast1("Atencion!", "No hay vehiculos para mostrar", 5000, "error");
      }
    }
  });
}

function editarVehiculo() {

  var parametro = {
    id: $('#txtIdVE').val(),
    matricula: $('#txtMatriculaE').val(),
    modelo: $('#txtModeloE').val(),
    marca: $('#txtMarcaE').val(),
    vehiculo: $('#txtVehiculoE').val(),
    tipo_vehiculo: $('#txtTipoE').val(),
    vehiculo_color: $('#txtColorE').val(),
    ciudad: $('#txtCiudadE').val(),
    provincia: $('#txtProvinciaE').val(),
    jefatura_transito: $('#txtJefaturaTransitoE').val()
  }

  $.ajax({
    url: 'resources/routes/routeClientes.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "editarVehiculo"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      ////console.log(error);
      toast1("Error!", error, 5000, "error");
      removeSpinner();
    },
    success: function(data) {
      console.log(data);
      //cleanDataModals();
      removeModals();
      removeSpinner();

      if (data != "") {
        loadData();
        if (foliosDisponibles == 1) {
          mostrarVehiculos(clienteId);
        } else {
          mostrarVehiculosAlt(clienteId);
        }
        toast1("éxito", "Se edito correctamente", 5000, "success");
      } else {
        $('tbody').empty();
        toast1("Atencion!", "No se edito", 5000, "error");
      }
    }
  });
}

function verificar(id) {

  var parametro = {
    id: id
  }
  console.log(parametro);
  bootbox.confirm({
    message: "¿Estás seguro de querer verificar este vehículo?",
    buttons: {
      confirm: {
        label: 'Si',
        className: 'btn-success'
      },
      cancel: {
        label: 'No',
        className: 'btn-danger'
      }
    },
    callback: function(result) {
      if (result == true) {
        $.ajax({
          url: 'resources/routes/routeClientes.php',
          type: 'POST',
          data: {
            info: parametro,
            action: "verificar"
          },
          dataType: 'JSON',
          beforeSend: function() {
            showSpinner();
          },
          error: function(error) {
            ////console.log(error);
            toast1("Error!", error, 5000, "error");
            removeSpinner();
          },
          success: function(data) {
            console.log(data);
            removeSpinner();

            if (data != "") {
              getNoFolios();
              //mostrarVehiculos(clienteId);
              toast1("éxito", "Se verifico correctamente", 5000, "success");
            } else {
              $('tbody').empty();
              toast1("Atencion!", "No se pudo verificar", 5000, "error");
            }
          }
        });
      }
    }
  });
}

function getNoFolios() {

  $.ajax({
    url: 'resources/routes/routeClientes.php',
    type: 'POST',
    data: {
      action: "getNoFolios"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      ////console.log(error);
      toast1("Error!", error, 5000, "error");
      removeSpinner();
    },
    success: function(data) {
      console.log(data);
      removeSpinner();

      if (data != "" && data != null) {
        numeroFolios = data[0][0];
        console.log(numeroFolios);
        if (numeroFolios == 0) {
          cambiarStatusFolio();
          mostrarVehiculosAlt(clienteId);
          foliosDisponibles = 0;
        } else {
          mostrarVehiculos(clienteId);
          foliosDisponibles = 1;
          console.log(foliosDisponibles);
        }
      } else {
        //$('tbody').empty();
        toast1("Atencion!", "No hay más folios, favor de elegir otro lote", 5000, "warning");
      }
    }
  });
}

function cambiarStatusFolio() {

  $.ajax({
    url: 'resources/routes/routeClientes.php',
    type: 'POST',
    data: {
      action: "cambiarStatusFolio"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      ////console.log(error);
      toast1("Error!", error, 5000, "error");
      removeSpinner();
    },
    success: function(data) {
      console.log(data);
      removeSpinner();

      toast1("Atencion!", "No hay más folios, favor de elegir otro lote", 5000, "warning");
    }
  });
}

function mostrarVehiculosAlt(id) {

  var parametro = {
    id: id
  }
  console.log(parametro);

  $.ajax({
    url: 'resources/routes/routeClientes.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "mostrarVehiculos"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      //console.log(error);
      toast1("Error!", error, 8000, "error");
      removeSpinner();
    },
    success: function(data) {
      console.log(data);
      removeSpinner();

      verFolios();
      if (data != "" && data != null) {
        $('#modVerVehiculo').modal('show');
        $('#txtNombreCliente').html(data[0][3]);

        var tbodyVehiculo = '';
        var indices = data[0].length;
        var theadVehiculo = '<tr>' +
          '<th>#</th>' +
          '<th>MATRICULA</th>' +
          '<th style="display: none">CLIENTE</th>' +
          '<th style="display: none">id</th>' +
          '<th>MODELO</th>' +
          '<th>MARCA</th>' +
          '<th>VEHÍCULO</th>' +
          '<th>TIPO</th>' +
          '<th>COLOR</th>' +
          '<th>CIUDAD</th>' +
          '<th>PROVINCIA</th>' +
          '<th>JEFATURA TRANSITO</th>' +
          '<th>STATUS</th>' +
          '<th>OPCIONES</th>' +
          '</tr>';

        for (var i = 0; i < data.length; i++) {
          tbodyVehiculo += '<tr data-toggle="tooltip" title="" id="row_' + data[i][0] + '">'
          for (var j = 0; j < indices; j++) {
            if (j == (indices - 1)) {
              //console.log(indices - 1);
              if (data[i][12] == 1)
                tbodyVehiculo += '<td><button type="button" class="btn btn-success btn-sm">' + 'Activo' + '</button></td>'
              else if (data[i][12] == 0)
                tbodyVehiculo += '<td><button type="button" class="btn btn-warning btn-sm">' + 'Inactivo' + '</button></td>'
              else if (data[i][12] == 3)
                tbodyVehiculo += '<td><button type="button" class="btn btn-success btn-sm"><i class="fa fa-check"></i>' + ' Verificado' + '</button></td>'
            }
            if (j == 2) {
              tbodyVehiculo += '<td style="display: none">' + data[0][2] + '</td>';
            } else if (j == 3) {
              tbodyVehiculo += '<td style="display: none">' + data[0][3] + '</td>';
            } else if (j == 12) {
              tbodyVehiculo += '<td style="display: none">' + data[0][12] + '</td>';
            } else {
              tbodyVehiculo += '<td>' + data[i][j] + '</td>'
            }
          }

          if (data[i][data[i].length - 1] == 1) {
            //console.log(data[i][data[i].length - 1]);
            tbodyVehiculo += '<td>' +
              '<a href="#" id="btnEdit"  onclick="getVehiculos(' + data[i][0] + ')"  style="width:100%;margin: 5px 0;" class="btn btn-warning btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-pencil"></i> Editar ' +
              '</a>' +
              '<a href="#" id="btnBaja" onclick="darBajaVehiculo(' + data[i][0] + ')" style="width:100%;margin: 5px 0;" class="btn btn-danger btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-trash-o"></i> Dar de baja ' +
              '</a> ' +
              '</td>'
          } else if (data[i][data[i].length - 1] == 0) {
            tbodyVehiculo += '<td>' +
              '<a id="btnReactivar" href="#" onclick="darAltaVehiculo(' + data[i][0] + ')" class="btn btn-success btn-sm btnReactivar">' +
              '<i class=""></i> Reactivar ' +
              '</a>' +
              '</td>'
          } else {}
        }

        $('#theadVehiculo').empty();
        $('#tbodyVehiculo').empty();

        $('#theadVehiculo').append(theadVehiculo);
        $('#tbodyVehiculo').append(tbodyVehiculo);

      } else {
        $('#tbodyVehiculo').empty();
        //toast1("Atencion!", "No hay vehículos para mostrar", 5000, "error");
      }
    }
  });
}

$(document).on('click', '#btnModAgregarVehiculo', function(e) {

  e.preventDefault();
  $('#modAgregarVehiculo').modal('show');
});

function verFolios() {
  $.ajax({
    url: 'resources/routes/routeUsuarios.php',
    type: 'POST',
    data: {
      action: "verFolios"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      ////console.log(error);
      toast1("Error!", error, 5000, "error");
      removeSpinner();
    },
    success: function(data) {
      removeSpinner();

      if (data != "") {
        $('#txtNumeroFoliosDisponibles').html(data[0]);
      } else {
        $('#txtNumeroFoliosDisponibles').html(0);
      }
    }
  });
}