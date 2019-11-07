//variables
var error = "Ocurrió un error insesperado en el sitio, por favor intentelo mas tarde o pongase en contacto con su administrador.";
var success = "La accion se ralizó con exito";
var datosIncorrectos = "Datos incorrectos, vuelve a intentarlo.";
var min_width=($("#tipo").val()==1)?750:974;
var max_width=($("#tipo").val()==1)?850:1074;
var min_height=($("#tipo").val()==1)?550:380;
var max_height=($("#tipo").val()==1)?650:480;

$(document).ready(function(){

    loadCategoria();

    var editor = new Jodit('#textadd', {
        uploader: {
            //url: 'assets/jodit/conector/index.php?action=fileUpload'
            url: 'https://xdsoft.net/jodit/connector/index.php?action=fileUpload'
        },

    });


    
});
//funciones

function loadCategoria(){//funciona
  let info = {};

  $.ajax({
    url:'resources/routes/routeNoticias.php',
    type:'post',
    async: true,
    data: {info: info, action: 'getCategorias'},
    dataType:'JSON',
    beforeSend: function() {
      showSpinner();
    },
    error: function(error){
      console.log(error);
      my_toast("Error!", ajaxError, 8000, "error");
      removeSpinner();
    },
    success: function(data){
      removeSpinner();

      if (data != "" && data != null) {

         var arr = [];

         for(i = 0; i < data.length; i++){
            arr.push(data[i]);
        }

        var options = {
            data:arr ,

            getValue: "categoria",
            list: {
                maxNumberOfElements: 8,
                match: { enabled: true },
                sort: { enabled: true },
            },
        };

        $("#select_categoria").easyAutocomplete(options);
        $('.easy-autocomplete').attr('style', 'width: 100%;border-radius: 0 !important;box-shadow: none !important;border-color: #a6a8ab !important;');
                

      } else {

        my_toast("Error!", error, 5000, "error");
  
      }
    }
  }); //fin ajax
}

$(document).on("keyup", "#header", function(){
   countChars(this);

});

function countChars(obj){
    var maxLength = 100;
    var strLength = obj.value.length;
    numero    = $("#header").val();
    if(strLength > maxLength){

        my_toast("Atención","Longitud máxima excedida de caracteres",3000,"warning");
        texto = numero.substring(0,numero.length-1);
        $("#header").val(texto);
        
    }else{

    }
}

function readURL(input) {

    if (input.files && input.files[0]) {
        if (input.files[0].type.match('image.*')) {
            var reader = new FileReader();

            reader.readAsDataURL(input.files[0]);

            reader.onloadend = function (e) {
                var image = new Image();
                image.onload = function(evt){
                    if (this.width<=max_width && this.width>=min_width ){
                        if (!(this.height<=max_height && this.width>=min_height )){
                            my_toast("El tamaño de la imagen no es adecuado", "El alto de la imagen debe ser mayor a "+min_height+"px y menor a "+max_height+"px", 8000, "error");
                            $('#imagen').val('');
                            return false;
                        }
                    }else{
                        my_toast("El tamaño de la imagen no es adecuado","El ancho de la imagen debe ser mayor a "+min_width+"px y menor a "+max_width+"px",8000,"error");
                        $('#imagen').val('');
                        return false;
                    }
                };
                image.src = e.target.result;


                $('#imageadd').attr('src', e.target.result);
                document.getElementById('imageadd').style.display = 'block';
            };
            return true;
        }else{
            document.getElementById('imageadd').style.display = 'none';
            my_toast("Error al cargar el archivo","El archivo no es una imagen",8000,"error");
            $('#imagen').val('');
            return false;
        }
    }
}

function showMessage(message){
    $(".messages").html("").show();
    $(".messages").html(message);
}

//Agregar.php
$(document).on("change", "#imagen", function(){
    readURL(this);

});

function resizeBase64Img(base64, width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");
    var deferred = $.Deferred();
    $("<img/>").attr("src", "data:image/gif;base64," + base64).load(function() {
        context.scale(width/this.width,  height/this.height);
        context.drawImage(this, 0, 0); 
        deferred.resolve($("<img/>").attr("src", canvas.toDataURL()));               
    });
    return deferred.promise();    
}

$(document).on("click", "#SubirContenido", function(){


    var altura = document.getElementById("imageadd").height;
    var ancho= document.getElementById('imageadd').width;
    var formData = new FormData($("#formimage")[0]);


    var flag=true;

    if(formData==""){
        my_toast("Error","Favor de subir una imagen",8000,"error");
        flag=false;

    }

    var header=$("#header").val();

    if(header==""){

        my_toast("Cabecera","Ingrese Cabecera",8000,"error");
        flag=false;
    }

    var Texto = $("#textadd").val();;
    if(Texto==""){
        my_toast("Cuerpo","Ingrese Cuerpo De La Noticia",8000,"error");
        flag=false;
    }else{
        
        var texto = $("#textadd").val();;
        //console.log(texto.length);
        if(texto.length > 1000000){

            my_toast("Atención","Longitud máxima de caracteres excedida",3000,"warning");
            //texto = numero.substring(0,numero.length-1);
            //$("#header").val(texto);
            flag=false;
        }else{
        
        }
    }

    var categoria= $("#select_categoria").val();
    if(categoria=="0"){
        my_toast("Categoria","Categoria Invalida",8000,"error");
        flag=false;
    }

    var Etiquetas=$("#tags").val();
    if(Etiquetas==""){
        my_toast("Etiquetas","Etiquetas Necesarias",8000,"error");
        flag= false;
    }

    if (flag==false){
        return;
    }

    if(ancho>=min_width && ancho<=max_width && altura>=min_height && altura<=max_height){

        var message = "";

        //hacemos la petición ajax
        $.ajax({
            url: 'resources/routes/routeNoticias.php',
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax

            contentType: false,
            processData: false,
            dataType: 'JSON', 
            //mientras enviamos el archivo
            beforeSend: function(){
                showSpinner();
                
                message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                showMessage(message)
            },
            //una vez finalizado correctamente
            success: function(data){

                message = $("<span class='success'>La imagen ha subido correctamente.</span>");
                showMessage(message)

                var header=$("#header").val();

                var Texto= $("#textadd").val();

                var categoria= $("#select_categoria").val();

                var Etiquetas=$("#tags").val();

                let info = {};

                info.header         = header;
                info.texto          = Texto;
                info.categoria      = categoria;
                info.etiquetas      = Etiquetas;
                info.id             = $("#inputID").val();
                info.foto           = data;
                //console.log(info);
                $.ajax({

                    url:"resources/routes/routeNoticias.php",
                    type:"POST",
                    data:{info:info, action:"add"},
                    beforeSend: function(){
                       
                    },
                    error: function(error){
                        my_toast("error",error,8000,"error");
                        
                    },
                    success: function(data){
                        removeSpinner();
                        if(data!=false){
                            //console.log(data);
                            my_toast("¡Exito!", "adicion correcta", 8000, "success");

                            resetForm("formtext");
                            resetForm("formimage");
                            resetForm("get-data-form");
                            document.getElementById('imageadd').style.display = 'none';
                            window.location.href = "noticias.php";
                            //$('#tags').tagsinput('removeAll');

                        }

                    }

                });

            }

        });


    }else{
        my_toast("error", "Tamaño o imagen no valida", 8000, "error");
        return;
    }

});
