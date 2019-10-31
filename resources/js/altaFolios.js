$(document).ready(function() {
  verStatus();
});

var error = "Ocurrió un error insesperado en el sitio, por favor intentelo mas tarde o pongase en contacto con su administrador.";
var success = "La accion se ralizó con exito";
var datosIncorrectos = "Datos incorrectos, vuelve a intentarlo.";

var id_folio;
var statusFolio;
var todosStatus;
var verdadero = 0;
var found;
var idFolio;

function verStatus() {
  $.ajax({
    url: 'resources/routes/routeAltaFolios.php',
    type: 'POST',
    data: {
      action: "verStatus"
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
      removeSpinner();

      if (data != "" && data != null) {
        for (var i = 0; i < data.length; i++) {
          found = data[i][0];
          if (found.indexOf('1') != -1) {
            verdadero = 1;
          }
        }
        if (verdadero === 1) {
          loadDataAlt();
        } else {
          loadData();
        }
      } else {
        $('#tbody').empty();
        toast1("Atencion!", "No hay folios para mostrar", 5000, "error");
      }
    }
  });
}

function loadData() {
  $.ajax({
    url: 'resources/routes/routeAltaFolios.php',
    type: 'POST',
    data: {
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

        var tbody = '';
        var indices = data[0].length;
        id_folio = data[0][0];

        var thead = '<tr>' +
          '<th>NO.</th>' +
          '<th>USUARIO</th>' +
          '<th>PRECIO</th>' +
          '<th>FOLIO INICIAL</th>' +
          '<th>FOLIO FINAL</th>' +
          '<th>CREACION</th>' +
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
                tbody += '<td><button type="button" class="btn btn-danger btn-sm">' + 'Agotado' + '</button></td>'
            } else {
              if (j == 2) {
                tbody += '<td><span class="label label-success" style="font-size: 14px">' + data[i][2] + '</span></td>'
              } else {
                tbody += '<td>' + data[i][j] + '</td>'
              }
            }

          }

          if (data[i][data[i].length - 1] == 1) {
            ////console.log(data[i][data[i].length - 1]);
            tbody += '<td>' +
              '<a href="#" id="btnEdit"  onclick="getFolios(' + data[i][0] + ')"  style="margin: 0 5px;" class="btn btn-warning btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-pencil"></i> Editar ' +
              '</a>' +
              '<a href="#" id="btnBaja" onclick="darBaja(' + data[i][0] + ')" style="margin: 0 5px;" class="btn btn-danger btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-trash-o"></i> Dar de baja ' +
              '</a> ' +
              '</td>'
          } else if (data[i][data[i].length - 1] == 0) {
            tbody +=
              /*'<td>' +
                           '<a id="btnReactivar" href="#" onclick="darAlta(' + data[i][0] + ')" class="btn btn-success btn-sm btnReactivar">' +
                           '<i class=""></i> Reactivar ' +
                           '</a>' +
                           '</td>' +*/
              '<td>' +
              '<div class="form-check">' +
              '<label class="form-check-label">' +
              '<input type="radio" id="btnAsignar" onclick="asignarLote(' + data[i][0] + ')" class="form-check-input" name="optradio">USAR LOTE' +
              '</label>' +
              '</div>' +
              /*'<div class="form-check">' +
              '<input type="checkbox" class="form-check-input" onclick="asignarLote(' + data[i][0] + ')" id="exampleCheck1">' +
              '<label class="form-check-label" for="exampleCheck1">Check me out</label>' +
              '</div>' +*/
              '</td>';
          } else {}
        }

        $('#thead').empty();
        $('#tbody').empty();

        $('#thead').append(thead);
        $('#tbody').append(tbody);
        //verStatus();
      } else {
        $('#tbody').empty();
        toast1("Atencion!", "No hay folios para mostrar", 5000, "error");
      }
    }
  });
}

function loadDataAlt() {


  $.ajax({
    url: 'resources/routes/routeAltaFolios.php',
    type: 'POST',
    data: {
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
        var tbody = '';
        var indices = data[0].length;
        id_folio = data[0][0];
        var thead = '<tr>' +
          '<th>NO.</th>' +
          '<th>USUARIO</th>' +
          '<th>PRECIO</th>' +
          '<th>FOLIO INICIAL</th>' +
          '<th>FOLIO FINAL</th>' +
          '<th>CREACION</th>' +
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
                tbody += '<td><button type="button" class="btn btn-danger btn-sm">' + 'Agotado' + '</button></td>'
            } else {
              if (j == 2) {
                tbody += '<td><span class="label label-success" style="font-size: 14px">' + data[i][2] + '</span></td>'
              } else {
                tbody += '<td>' + data[i][j] + '</td>'
              }
            }

          }

          if (data[i][data[i].length - 1] == 1) {
            ////console.log(data[i][data[i].length - 1]);
            tbody += '<td>' +
              '<a href="#" id="btnEdit"  onclick="getFolios(' + data[i][0] + ')"  style="margin: 0 5px;" class="btn btn-warning btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-pencil"></i> Editar ' +
              '</a>' +
              '<a href="#" id="btnBaja" onclick="darBaja(' + data[i][0] + ')" style="margin: 0 5px;" class="btn btn-danger btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-trash-o"></i> Dar de baja ' +
              '</a> ' +
              /*'<a href="#" id="btnBaja" onclick="eliminar(' + data[i][0] + ')" style="" class="btn btn-danger btn-sm smallMargin btnOptions">' +
              '<i class="fa fa-trash-o"></i> Eliminar ' +
              '</a>' +*/
              '</td>'
          } else if (data[i][data[i].length - 1] == 0) {
            tbody += '<td>' +
              /*'<a id="btnReactivar" href="#" onclick="darAlta(' + data[i][0] + ')" class="btn btn-success btn-sm btnReactivar">' +
              '<i class=""></i> Reactivar ' +
              '</a>' +
              '</td>' +
              '<td>' +
              /*'<div class="form-check">' +
              '<label class="form-check-label">' +
              '<input type="radio" id="btnAsignar" onclick="asignarLote(' + data[i][0] + ')" class="form-check-input" name="optradio">USAR LOTE' +
              '</label>' +
              '</div>' +*/
              /*'<div class="form-check">' +
              '<input type="checkbox" class="form-check-input" onclick="asignarLote(' + data[i][0] + ')" id="exampleCheck1">' +
              '<label class="form-check-label" for="exampleCheck1">Check me out</label>' +
              '</div>' +*/
              '</td>';
          } else {}
        }

        $('#thead').empty();
        $('#tbody').empty();

        $('#thead').append(thead);
        $('#tbody').append(tbody);

      } else {
        $('#tbody').empty();
        toast1("Atencion!", "No hay folios para mostrar", 5000, "error");
      }
    }
  });
}

function agregar($info) {

  var parametro = {
    precio: $('#precioFolio').val(),
    folioInicial: $('#folioInicial').val(),
    folioFinal: $('#folioFinal').val(),
    id_folio: id_folio,
    numero_folios: $('#txtNumeroFolios').val()
  }

  $.ajax({
    url: 'resources/routes/routeAltaFolios.php',
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
      console.log(data);
      cleanDataModals();
      //removeModals();
      removeSpinner();

      if (data != "") {
        verStatus();
        toast1("éxito", "Se agrego correctamente", 5000, "success");
      } else {
        $('tbody').empty();
        toast1("Atencion!", "No hay folios para mostrar", 5000, "error");
      }
    }
  });
}

function cleanDataModals() {
  $("#formAgregar input.form-control").val("");
}

$(document).on('click', '#btnAgregarFolios', function(e) {

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
    agregar();
  }
});

function asignarLote(id) {

  var parametro = {
    id: id
  }
  console.log(parametro);
  bootbox.confirm({
    message: "¿Estás seguro de querer usar este lote?",
    buttons: {
      confirm: {
        label: 'Si',
        className: 'btn-success',
        id: 'btnConfirmarAsignacion'
      },
      cancel: {
        label: 'No',
        className: 'btn-danger'
      }
    },
    callback: function(result) {
      if (result == true) {
        $.ajax({
          url: 'resources/routes/routeAltaFolios.php',
          type: 'POST',
          data: {
            info: parametro,
            action: "asignarLote"
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

              loadDataAlt();
              toast1("éxito", "Se activo este lote correctamente", 5000, "success");
            } else {
              $('tbody').empty();
              toast1("Atencion!", "No se pudo activar el lote", 5000, "error");
            }
          }
        });
      }
    }
  });
}

function darBaja(id) {

  var parametro = {
    id: id
  }

  bootbox.confirm({
    message: "¿Estás seguro de querer dar de baja este lote?",
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
          url: 'resources/routes/routeAltaFolios.php',
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
            removeSpinner();

            if (data != "") {
              verdadero = 0;
              verStatus();
              toast1("éxito", "Se dio de baja este lote correctamente", 5000, "success");
            } else {
              $('tbody').empty();
              toast1("Atencion!", "No se pudo dar de baja el lote", 5000, "error");
            }
          }
        });
      }
    }
  });
}

function getFolios(id) {

  var parametro = {
    id: id
  }

  $.ajax({
    url: 'resources/routes/routeAltaFolios.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "getFolios"
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
        $('#modEditarLote').modal('show');
        $('#txtIdE').val(data[0][0]);
        idFolio = data[0][0];
        $('#precioFolioE').val(data[0][1]);
        $('#folioInicialE').val(data[0][2]);
        $('#folioFinalE').val(data[0][3]);
      } else {
        $('tbody').empty();
        toast1("Atencion!", "No hay clientes para mostrar", 5000, "error");
      }
    }
  });
}

function editFolios() {

  var parametro = {
    id: idFolio,
    precio: $('#precioFolioE').val(),
    folioInicial: $('#folioInicialE').val(),
    folioFinal: $('#folioFinalE').val(),
  }
  console.log(parametro);
  $.ajax({
    url: 'resources/routes/routeAltaFolios.php',
    type: 'POST',
    data: {
      info: parametro,
      action: "editFolios"
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
        verStatus();
        toast1("éxito", "Se edito correctamente", 5000, "success");
      } else {
        $('tbody').empty();
        toast1("Atencion!", "No se edito", 5000, "error");
      }
    }
  });
}

$(document).on('click', '#btnEditarLote', function(e) {

  e.preventDefault();
  var flag = true;
  var cont = 0;

  $('#formEditarLote input.necesary').each(function(index, currentElement) {
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

  $('#formEditarLote input.necesary').keyup(function(currentElement) {
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
    editFolios();
  }
});

function removeModals() {
  $('#modEditarLote').modal('hide');
}

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