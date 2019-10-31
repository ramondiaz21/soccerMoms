var error = "Ocurrió un error insesperado en el sitio, por favor intentelo mas tarde o pongase en contacto con su administrador.";
var success = "La accion se ralizó con exito";
var datosIncorrectos = "Datos incorrectos, vuelve a intentarlo.";

function entrarLogin() {

  var info = {
    username: $("#txtUsername").val(),
    password: $("#txtPassword").val()
  };

  $.ajax({
    url: 'resources/routes/routeLogin.php',
    type: 'POST',
    data: {
      info: info,
      action: 'entrarLogin'
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

      if (data != null && data != "") {
        console.log(data);
        toast1("éxito", "Acceso autorizado", 5000, "success");
        window.location.href = "perfil.php";
        // $('#nav-noPagadas-tab').css('display', 'block');
      } else
        toast1("Atencion!", "Acceso denegado", 5000, "error");
    }
  });
}



$(document).on('click', '#btnLogin', function(e) {
  e.preventDefault();
  entrarLogin();
});