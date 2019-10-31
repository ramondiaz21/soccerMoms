$(document).ready(function() {
  getTodosEquipos();


})

var error = "Ocurrió un error insesperado en el sitio, por favor intentelo mas tarde o pongase en contacto con su administrador.";
var success = "La accion se ralizó con exito";
var datosIncorrectos = "Datos incorrectos, vuelve a intentarlo.";

function getTodosEquipos() {

  $.ajax({
    url: 'resources/routes/routeAdminEquipos.php',
    type: 'POST',
    data: {
      action: "getTodosEquipos"
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
      ////console.log(data);
      removeSpinner();

      if (data != "" && data != null) {
        var selectBody = '<option disabled selected>-- SELECCIONA EQUIPO --</option>';
        var indices = data[0].length;

        for (var i = 0; i < data.length; i++) {
          selectBody += '<option value="' + data[i][0] + '">' + data[i][1] + '</option>';
        }

        $('#select_todos_equipos').empty();
        $('#select_todos_equipos').append(selectBody);

        //$('#select_todos_equiposE').empty();
        //$('#select_todos_equiposE').append(selectBody);

      } else {
        $('#select_todos_equipos').empty();
        //toast1("Atencion!", "No hay productos para mostrar", 5000, "error");
      }
    }
  });
}

function loadData($info) {

  var parametro = {
    id: $('#select_todos_equipos').val(),
    status: $('#select_status').val()
  }

  //var filtro = $('#select_todos_equipos').val();
  //var filtro2 = $('#select_status').val();
  $.ajax({
    url: 'resources/routes/routeAdminEquipos.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "read"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      console.log(error);
      toast1("Error!", error, 5000, "error");
      removeSpinner();
    },
    success: function(data) {
      console.log(data);
      removeSpinner();
      if (data != "" && data != null) {
        var tbody = '';
        var indices = data[0].length;
        var thead = '<tr>' +
          '<th>NO.</th>' +
          '<th>USUARIO</th>' +
          '<th>NOMBRE JUGADORA</th>' +
          '<th>TELÉFONO</th>' +
          '<th>FECHA DE ALTA</th>' +
          '<th>ESTATUS</th>' +
          '<th>OPCIONES</th>';

        for (var i = 0; i < data.length; i++) {
          tbody += '<tr data-toggle="tooltip" title="" id="row_' + data[i][0] + '">'
          for (var j = 0; j < indices; j++) {
            if (j == (indices - 1)) {
              if (data[i][5] == 1)
                tbody += '<td><button type="button" class="btn btn-success btn-sm">' + 'Activo' + '</button></td>'
              else if (data[i][5] == 0)
                tbody += '<td><button type="button" class="btn btn-warning btn-sm">' + 'Inactivo' + '</button></td>'
            } else {
              tbody += '<td>' + data[i][j] + '</td>'
            }
          }

          if (data[i][data[i].length - 1] == 1) {
            ////console.log(data[i][data[i].length - 1]);
            tbody += '<td>' +
              '<a href="#" id="btnEdit" onclick="getJugadora(' + data[i][0] + ')"style="margin:0 5px"  class="btn btn-warning btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-pencil"></i> Editar ' +
              '</a>' +
              '<a href="#" id="btnBaja" onclick="darBaja(' + data[i][0] + ')" style="margin:0 5px" class="btn btn-danger btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-trash-o"></i> Dar de baja ' +
              '</a> ' +
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
        toast1("Atencion!", "No hay jugadoras para mostrar", 5000, "error");
      }
    }
  });
}

function darBaja(id) {

  var parametro = {
    id: id
  }
  bootbox.confirm({
    message: "¿Estás seguro de querer dar de baja esta jugadora?",
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
          url: 'resources/routes/routeAdminEquipos.php',
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
    message: "¿Estás seguro de querer reactivar esta jugadora?",
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
          url: 'resources/routes/routeAdminEquipos.php',
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

function agregaEquipo() {

  var parametro = {
    equipo: $('#select_todos_equipos').val(),
    nombre: $('#txtNombre').val(),
    telefono: $('#txtTelefono').val(),
  }

  $.ajax({
    url: 'resources/routes/routeAdminEquipos.php',
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
        toast1("Atencion!", "No hay usuarios para mostrar", 5000, "error");
      }
    }
  });
}

function getJugadora(id) {

  var parametro = {
    id: id
  }
  console.log(parametro);
  $.ajax({
    url: 'resources/routes/routeAdminEquipos.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "getJugadora"
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
        $('#modEditarJugadora').modal('show');
        $('#txtIdE').val(data[0][0]);
        $('#txtNombreE').val(data[0][1]);
        $('#txtTelefonoE').val(data[0][2]);
      } else {
        $('tbody').empty();
        toast1("Atencion!", "No hay jugadora para mostrar", 5000, "error");
      }
    }
  });
}

function guardarEditarJugadora() {

  var parametro = {
    id: $('#txtIdE').val(),
    nombre: $('#txtNombreE').val(),
    telefono: $('#txtTelefonoE').val()
  }
  console.log(parametro);
  $.ajax({
    url: 'resources/routes/routeAdminEquipos.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "editarJugadora"
    },
    dataType: 'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error) {
      console.log(error);
      toast1("Error!", error, 5000, "error");
      removeSpinner();
    },
    success: function(data) {
      console.log(data);
      removeModals();
      removeSpinner();
      loadData();
      toast1("éxito", "Se edito correctamente", 5000, "success");
    }
  });
}

$(document).on('click', '#btnAgregarNew', function(e) {

  e.preventDefault();
  var flag = true;
  var cont = 0;

  $('#formAgregar input.necesary').each(function(index, currentElement) {
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

  $('#formAgregar input.necesary').keyup(function(currentElement) {
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
    agregaEquipo();
  }
});

$(document).on('click', '#btnEditar', function(e) {

  e.preventDefault();
  var flag = true;
  var cont = 0;

  $('#formEditar input.necesary').each(function(index, currentElement) {
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

  $('#formEditar input.necesary').keyup(function(currentElement) {
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
    guardarEditarJugadora();
  }
});

$(document).on('click', '#btnCancelarNew', function(e) {
  e.preventDefault();
  var flag = true;
  var cont = 0;

  $('#formAgregar input.necesary').each(function(index, currentElement) {
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

$(document).on('change', '#select_todos_equipos', function(e) {
  e.preventDefault();
  loadData();
  $('.inputDisabled').prop("disabled", false);
});

$(document).on('change', '#select_status', function(e) {
  e.preventDefault();
  loadData();
});

function removeModals() {
  $('#modAgregarJugadora').modal('hide');
  $('#modEditarJugadora').modal('hide');
}

function cleanDataModals() {
  $("#formAgregar input.form-control").val("");
  $("#formAgregar select.form-control").val("");
}

$(document).on('keyup', '#txt_busqueda', function(e) {
  busqueda();
});

function busqueda() {

  var parametro = {
    id: $('#select_todos_equipos').val(),
    nombre: $('#txt_busqueda').val(),
    status: $('#select_status').val()
  }
  console.log(parametro);
  $.ajax({
    url: 'resources/routes/routeAdminEquipos.php',
    type: 'POST',
    async: false,
    data: {
      info: parametro,
      action: "busqueda"
    },
    dataType: 'JSON',
    beforeSend: function() {
      // showSpinner();
    },
    error: function(error) {
      ////console.log(error);
      toast1("Error!", error, 5000, "error");
    },
    success: function(data) {
      ////console.log(data);
      removeSpinner();

      if (data != "" && data != null) {
        var tbody = '';
        var indices = data[0].length;
        var thead = '<tr>' +
          '<th>NO.</th>' +
          '<th>USUARIO</th>' +
          '<th>NOMBRE JUGADORA</th>' +
          '<th>TELÉFONO</th>' +
          '<th>FECHA DE ALTA</th>' +
          '<th>ESTATUS</th>' +
          '<th>OPCIONES</th>';

        for (var i = 0; i < data.length; i++) {
          tbody += '<tr data-toggle="tooltip" title="" id="row_' + data[i][0] + '">'
          for (var j = 0; j < indices; j++) {
            if (j == (indices - 1)) {
              if (data[i][5] == 1)
                tbody += '<td><button type="button" class="btn btn-success btn-sm">' + 'Activo' + '</button></td>'
              else if (data[i][5] == 0)
                tbody += '<td><button type="button" class="btn btn-warning btn-sm">' + 'Inactivo' + '</button></td>'
            } else {
              tbody += '<td>' + data[i][j] + '</td>'
            }
          }

          if (data[i][data[i].length - 1] == 1) {
            ////console.log(data[i][data[i].length - 1]);
            tbody += '<td>' +
              '<a href="#" id="btnEdit" onclick="editPerfil(' + data[i][0] + ')"style="margin:0 5px"  class="btn btn-warning btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-pencil"></i> Editar ' +
              '</a>' +
              '<a href="#" id="btnBaja" onclick="darBaja(' + data[i][0] + ')" style="margin:0 5px" class="btn btn-danger btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-trash-o"></i> Dar de baja ' +
              '</a> ' +
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
        //toast1("Atencion!", "No hay jugadoras para mostrar", 5000, "error");
      }
    }
  });

}