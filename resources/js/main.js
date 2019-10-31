var error = "Ocurrió un error insesperado en el sitio, por favor intentelo mas tarde o pongase en contacto con su administrador.";


// =========== ALERTAS =============================================================================

// https://github.com/scottoffen/jquery.toaster
function toast2(tipo, titulo, msj, time) { //necesita el archivo jquery.toaster.js 
  $.toaster({
    priority: tipo,
    title: titulo,
    message: msj,
    settings: {
      timeout: time,
    }
  });

}

// https://github.com/scottoffen/jquery.toaster
var cont = 0;

function toast(tipo, msj, time) { //necesita el archivo jquery.toaster.js 
  $('html, body').animate({
    scrollTop: 0
  }, 800);

  if (cont != 0)
    $toaster.remove();

  $.toaster({
    priority: tipo,
    // title : titulo, 
    message: msj,
    settings: {
      timeout: time,
      toaster: {
        id: 'toaster',
        container: 'body',
        template: '<div></div>',
        class: 'toaster',
        css: {
          'position': 'fixed',
          'top': '0px',
          'right': '0px',
          'width': '100%',
          'zIndex': 50000
        }
      }

    }
  });

  cont++;

}

// https://sciactive.com/pnotify/
function toast1(title, body, delay, type) {
  new PNotify({
    title: title,
    text: body,
    delay: delay,
    type: type,
    mobile: {
      styling: false
    },
    animate: {
      animate: true,
      in_class: 'bounceInRight',
      out_class: 'bounceInLeft'
    },
    mobile: {
      styling: false
    }
  });

}

//Necesita el script DreamAlert
function customAlert(title, content) {
  $.alert({
    title: title,
    content: content,
    theme: 'black',
    animation: 'left',
    closeAnimation: 'right',
    icon: 'fa fa-warning',
    keyboardEnabled: true,
    confirm: function() {
      // $.alert('Confirmed!'); // shorthand.
    }
  });

}

// =========== VALIDACION DE CAMPOS ================================================================

// validaCampoLength("txt_destino_viaje", 100)
function validaCampoLength(idCampo, length) {

  var contenido = "";
  $(document).on('keyup', '#' + idCampo, function(event) {

    var caracteres = $(this).val();

    if (caracteres.length > length) {
      toast1("Error!", "No se pueden agregar mas de " + length + " caracteres", 4000, "error");
      // toast('danger','Error',"No se pueden agregar mas de "+length+" caracteres", 8000);	
      $(this).val(contenido);
    } else {
      contenido = $(this).val();
    }

  });

}

// validaOnlyNumbers("txt_cont_d_unid_edit")
function validaOnlyNumbers(idCampo) {

  var contenido = "";
  $(document).on('keyup', '#' + idCampo, function(event) {

    var caracteres = $(this).val();

    if (caracteres.match(/[^1234567890]/g)) {
      toast1("Error!", "Solo se admiten numeros", 4000, "error");
      // toast('danger','Error',"Solo se admiten numeros", 4000);

      $(this).val(contenido);
    } else {
      contenido = $(this).val();
    }


  });

}

// validaCampoNum("txt_numero_unid", 2147483647)
function validaCampoNum(idCampo, val) {

  var contenido = "";
  $(document).on('keyup', '#' + idCampo, function(event) {

    var caracteres = $(this).val();

    if (caracteres > val) {
      toast1("Error!", "No se puede ingresar un valor tan grande, intente con uno mas pequeño", 4000, "error");
      // toast('danger','Error',"No se puede ingresar un valor tan grande, intente con uno mas pequeño", 8000)	
      $(this).val(contenido);
    } else {
      contenido = $(this).val();
    }

  });

}

// =========== OTRAS FUNCIONES =====================================================================
function resetForm(id) {
  $('#' + id).each(function() {
    this.reset();
  });

}

function hoy() {
  var d = new Date();

  var month = d.getMonth() + 1;
  var day = d.getDate();

  var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear()

  return output;

}

function redondeo(val, num) {

  val = val.toString();
  val = val.split('.');

  if (val.length > 1) {
    val = val[0] + '.' + val[1].substring(0, num);
  }

  return val;

}

// =========== Validacion de Email =================================================================

function validarEmail(email) {

  var patronArroba = /[@]/;

  if (patronArroba.test(email)) { //reviso que exista una @

    var dominio = email.split("@")[1]; //divido donde halla una @
    if (dominio == 'gmail.com') {
      return 'success';
    } else {
      return 'dominio';
    }

  } else {
    return 'formato';
  }

}

// =========== ESTA EN DESARROLLO AÚN ==============================================================
function msgClose(id) {
  $('#' + id).slideUp();
}

function msgAlert(id, tipo, texto) {
  $('#' + id).slideUp();

  $('#' + id).html('');
  $('#' + id).attr({
    "hidden": true,
    "class": "alert alert-" + tipo
  });
  $('#' + id).html('<button type="button" class="close" aria-label="Close" onclick="msgClose(\'' + id + '\')"><span aria-hidden="true">&times;</span></button>' + texto);

  $('html, body').animate({
    scrollTop: 0
  }, 800);
  $('#' + id).slideDown(function() {
    // setInterval(function(){ msgClose(id)}, 8000);
  });

  // var myVar = setInterval(function(){ msgClose(id)}, 8000);
  // clearInterval(myVar);

}


$(document).on('click', '#logout', function(e) {
  e.preventDefault();

  $.confirm({
    title: 'Atencion!',
    content: '¿Esta seguro que desea cerrar sesión?',
    confirm: function() {

      $.ajax({
        url: 'routes/routeUsuario.php',
        type: 'POST',
        data: {
          action: 'logout'
        },
        dataType: 'JSON',
        beforeSend: function() {
          showSpinner();
        },
        error: function(error) {
          console.log(error)
          toast('danger', error, 8000);
          removeSpinner();
        },
        success: function(data) {
          // console.log(data);
          removeSpinner();

          if (data == true) {
            window.location = "index.php";
          } else {
            toast('danger', error, 8000);
          }
        }
      });

    },
    cancel: function() {
      // console.log('false');
    }
  });


});