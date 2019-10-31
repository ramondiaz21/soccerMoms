$(document).ready(function() {
  loadData();
  getRoles();
})

var error = "Ocurrió un error insesperado en el sitio, por favor intentelo mas tarde o pongase en contacto con su administrador.";
var success = "La accion se ralizó con exito";
var datosIncorrectos = "Datos incorrectos, vuelve a intentarlo.";



function loadData($info) {
  var filtro = $('#select_status').val();
  $.ajax({
    url: 'resources/routes/routeUsuarios.php',
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
          '<th>USERNAME</th>' +
          '<th>NOMBRE</th>' +
          '<th>ROL</th>' +
          '<th>ESTATUS</th>' +
          '<th>OPCIONES</th>';

        for (var i = 0; i < data.length; i++) {
          tbody += '<tr data-toggle="tooltip" title="" id="row_' + data[i][0] + '">'
          for (var j = 0; j < indices; j++) {
            if (j == (indices - 1)) {
              if (data[i][4] == 1)
                tbody += '<td><button type="button" class="btn btn-success btn-sm">' + 'Activo' + '</button></td>'
              else if (data[i][4] == 0)
                tbody += '<td><button type="button" class="btn btn-warning btn-sm">' + 'Inactivo' + '</button></td>'
            } else
              tbody += '<td>' + data[i][j] + '</td>'
          }

          if (data[i][data[i].length - 1] == 1) {
            ////console.log(data[i][data[i].length - 1]);
            tbody += '<td>' +
              '<a href="#" id="btnEdit" onclick="editUsuarios(' + data[i][0] + ')"style="margin:0 5px"  class="btn btn-warning btn-sm smallMargin btnOptions">' +
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
        toast1("Atencion!", "No hay usuarios para mostrar", 5000, "error");
      }
    }
  });
}

function getRoles() {

  $.ajax({
    url: 'resources/routes/routeUsuarios.php',
    type: 'POST',
    data: {
      action: "getRoles"
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
        var selectBodyPre = '<option disabled selected>-- SELECCIONA ROL --</option>';
        var indices = data[0].length;

        for (var i = 0; i < data.length; i++) {
          selectBodyPre += '<option value="' + data[i][0] + '">' + data[i][1] + '</option>';
        }

        $('#slcRoles').empty();
        $('#slcRoles').append(selectBodyPre);

        //$('#slcRolesE').empty();
        //$('#slcRolesE').append(selectBodyPre);

      } else {
        $('#slcRoles').empty();
        //toast1("Atencion!", "No hay productos para mostrar", 5000, "error");
      }
    }
  });
}

function darBaja(id) {

  var parametro = {
    id: id
  }
  bootbox.confirm({
    message: "¿Estás seguro de querer dar de baja este usuario?",
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
          url: 'resources/routes/routeUsuarios.php',
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
    message: "¿Estás seguro de querer reactivar este usuario?",
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
          url: 'resources/routes/routeUsuarios.php',
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

function agregaUsuarios() {

  var parametro = {
    username: $('#txtUsername').val(),
    password: $('#txtPassword').val(),
    nombre: $('#txtNombre').val(),
    rol: $('#slcRoles').val()
  }

  $.ajax({
    url: 'resources/routes/routeUsuarios.php',
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

function editUsuarios(id) {

  var parametro = {
    id: id
  }
  console.log(parametro);
  $.ajax({
    url: 'resources/routes/routeUsuarios.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "getUsuarios"
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
        $('#modEditarUsuario').modal('show');
        var editar = data.editar;
        var roles = data.roles;
        var idRoles = editar[0][3];
        var nombreRoles = roles[0][1];
        var option = "";
        //console.log(editar[i][3]);

        //option = '<option selected value="' + editar[0][3] + '">' + editar[0][4] + '</option>';
        for (var i = 0; i < roles.length; i++) {
          if (idRoles == roles[i][0]) {
            option += '<option selected value="' + editar[0][3] + '">' + editar[0][4] + '</option>';
          } else
            option += '<option value="' + roles[i][0] + '">' + roles[i][1] + '</option>';
        }

        console.log(option);
        $('#slcRolesE').empty();
        $('#slcRolesE').append(option);
        $('#slcRolesE').val(idRoles);


        //getRoles();
        $('#txtIdE').val(editar[0][0]);
        $('#txtUsernameE').val(editar[0][1]);
        $('#txtPasswordE').val(editar[0][2]);
        //$('#slcRolesE').val(editar[0][3]);
        $('#txtNombreE').val(editar[0][5]);
      } else {
        $('tbody').empty();
        toast1("Atencion!", "No hay usuarios para mostrar", 5000, "error");
      }
    }
  });
}

function guardarEditar() {

  var parametro = {
    id: $('#txtIdE').val(),
    username: $('#txtUsernameE').val(),
    password: $('#txtPasswordE').val(),
    nombre: $('#txtNombreE').val(),
    rol: $('#slcRolesE').val()
  }
  console.log(parametro);
  $.ajax({
    url: 'resources/routes/routeUsuarios.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "editarUsuarios"
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
    agregaUsuarios();
  }
});

$(document).on('click', '#btnguardarEdit', function(e) {

  e.preventDefault();
  var flag = true;
  var cont = 0;

  $('#formAgregarE input.necesary').each(function(index, currentElement) {
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

  $('#formAgregarE input.necesary').keyup(function(currentElement) {
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

$(document).on('change', '#select_status', function(e) {
  loadData();
});

function removeModals() {
  $('#modAgregarUsuario').modal('hide');
  $('#modEditarUsuario').modal('hide');
}

function cleanDataModals() {
  $("#formAgregar input.form-control").val("");
  $("#formAgregar select.form-control").val("");
  getRoles();
}

$(document).on('keyup', '#txt_busqueda', function(e) {

  $.ajax({
    url: 'resources/routes/routeUsuarios.php',
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
    },
    success: function(data) {
      ////console.log(data);
      removeSpinner();

      if (data != "" && data != null) {
        var tbody = '';
        var indices = data[0].length;
        var thead = '<tr>' +
          '<th>NO.</th>' +
          '<th>USERNAME</th>' +
          '<th>NOMBRE</th>' +
          '<th>ROL</th>' +
          '<th>ESTATUS</th>' +
          '<th>OPCIONES</th>';

        for (var i = 0; i < data.length; i++) {
          tbody += '<tr data-toggle="tooltip" title="" id="row_' + data[i][0] + '">'
          for (var j = 0; j < indices; j++) {
            if (j == (indices - 1)) {
              if (data[i][4] == 1)
                tbody += '<td><button type="button" class="btn btn-success btn-sm">' + 'Activo' + '</button></td>'
              else if (data[i][4] == 0)
                tbody += '<td><button type="button" class="btn btn-warning btn-sm">' + 'Inactivo' + '</button></td>'
            } else
              tbody += '<td>' + data[i][j] + '</td>'
          }

          if (data[i][data[i].length - 1] == 1) {
            ////console.log(data[i][data[i].length - 1]);
            tbody += '<td>' +
              '<a href="#" id="btnEdit" onclick="editUsuarios(' + data[i][0] + ')"style="margin:0 5px"  class="btn btn-warning btn-sm smallMargin btnOptions">' +
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
        //toast1("Atencion!", "No hay usuarios para mostrar", 5000, "error");
      }
    }
  });
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