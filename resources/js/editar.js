//variables
var error = "Ocurrió un error insesperado en el sitio, por favor intentelo mas tarde o pongase en contacto con su administrador.";
var success = "La accion se ralizó con exito";
var datosIncorrectos = "Datos incorrectos, vuelve a intentarlo.";
var min_width=($("#tipo").val()==1)?750:974;
var max_width=($("#tipo").val()==1)?850:1074;
var min_height=($("#tipo").val()==1)?550:380;
var max_height=($("#tipo").val()==1)?650:480;
var PATH = $("#inputSRC2").val();

$(document).ready(function() {

    var id = $("#inputID").val();
    getData(id);


    var editor = new Jodit('#texteditar', {
        uploader: {
            //url: 'assets/jodit/conector/index.php?action=fileUpload'
            url: 'https://xdsoft.net/jodit/connector/index.php?action=fileUpload'
        },

    });
});

function getData(id){
    
    let info = {};

    info.id = id;

    $.ajax({
        url:"resources/routes/routeNoticias.php",
        type:"POST",
        data:{info:info, action:"readEdit"},
        dataType:'JSON',
        async: false,
        beforeSend: function(){
            showSpinner();
        },

        error: function(error){
            toast1("error",error,8000,"error");
            removeSpinner();
        },

        success: function(data){
           
            
            if(data != ""){

                var categoria = [];
                categoria = data["categorias"];
                var noticia   = [];
                noticia = data["noticia"];

                var arr = [];
                
                for(i = 0; i < categoria.length; i++){
                    arr.push(categoria[i]);
                    
                }
                //console.log(arr);
                var options = {
                    data:arr ,

                    getValue: "categoria",
                    list: {
                        maxNumberOfElements: 8,
                        match: { enabled: true },
                        sort: { enabled: true },
                        
                    },
                    
                };

                //console.log(options);

                $("#Editcat").easyAutocomplete(options);
                $('.easy-autocomplete').attr('style', 'width: 100%;border-radius: 0 !important;box-shadow: none !important;border-color: #a6a8ab !important;');
            
                $("#idedit").val(noticia[0]["id"]);
                $("#headeredit").val(noticia[0]["cabecera"]);
                $("#marksedit").val();
                $('#marksedit').tagsinput('add',noticia[0]["etiquetas"]);
                $("#profile-image").attr("src",PATH+noticia[0]["url"]);
                $("#texteditar").val(noticia[0]["texto"]);
                
                $("#Editcat").val(noticia[0]["categoria"]);
                let axurl = noticia[0]["url"];
               
                $("#imagen_actual").val(axurl);
                removeSpinner();
           }else{
                console.log("aqui");
            }
        }
    });
}


function readURLedit(input) {

    if (input.files && input.files[0]) {
        if (input.files[0].type.match('image.*')) {
            var reader = new FileReader();

            reader.readAsDataURL(input.files[0]);

            reader.onloadend = function (e) {
                var image = new Image();
                image.onload = function(evt){
                    if (this.width<=max_width && this.width>=min_width ){
                        if (!(this.height<=max_height && this.width>=min_height )){
                            toast1("El tamaño de la imagen no es adecuado", "El alto de la imagen debe ser mayor a "+min_height+"px y menor a "+max_height+"px", 8000, "error");
                            $('#imagen').val('');
                            return false;
                        }
                    }else{
                        toast1("El tamaño de la imagen no es adecuado","El ancho de la imagen debe ser mayor a "+min_width+"px y menor a "+max_width+"px",8000,"error");
                        $('#imagen').val('');
                        return false;
                    }
                };
                image.src = e.target.result;

                $('#profile-image').attr('src', e.target.result);
                document.getElementById('imageadd').style.display = 'block';
            };
            return true;
        }else{
            toast1("Error al cargar el archivo","El archivo no es una imagen",8000,"error");
            $('#imagen').val('');
            return false;
        }
    }
}


$(function() {
     $('#profile-image').on('click', function() {
         $('#imagenedit').click();
     });
 });

function readURL(input) {

     if (input.files && input.files[0]) {
         var reader = new FileReader();

         reader.onload = function (e) {
             $('#imageadd').attr('src', e.target.result);
             document.getElementById('imageadd').style.display = 'block';

         }

         reader.readAsDataURL(input.files[0]);
     }
 }


//Editar.php
$(document).on("change", "#imagenedit", function(){
    readURLedit(this);

});

$(document).on("change","#imagenedit",function(e){

    setTimeout(validacion,100);

    function validacion(){

        var altura = document.getElementById("profile-image").height;
        var ancho= document.getElementById('profile-image').width;
        var fileName= document.getElementById("profile-image").src;

        if(ancho>=min_width && ancho<=max_width && altura>=min_height && altura<=max_height){

            //showMessage("<span class='success'> Tamaño Correcto: "+ancho+"x"+altura+".</span>");

        }else{

            //showMessage("<span class='error'> Tamaño Incorrecto favor de corregir: "+ancho+"x"+altura+".</span>");

        }
    }
});

$(document).on("change","#imagen",function(e){

    setTimeout(validacion,100);

    function validacion(){

        var altura = document.getElementById("imageadd").height;
        var ancho= document.getElementById('imageadd').width;
        var fileName= document.getElementById("imageadd").src;

        if(ancho>=min_width && ancho<=max_width && altura>=min_height && altura<=max_height){

            showMessage("<span class='success'> Tamaño Correcto: "+ancho+"x"+altura+".</span>");

        }else{

            showMessage("<span class='error'> Tamaño Incorrecto favor de corregir: "+ancho+"x"+altura+".</span>");

        }
       }

    });

$(document).on("click", "#Guardar_cambios", function(e){

    var flag=true;

    var formData = new FormData($(".formedit")[0]);

    if(formData==""){
        toast1("Imagen Vacia", "Favor de ingresar una imagen",8000,"error")
        flag=false;
    }

    var Etiquetas= $("#marksedit").val();
    if(Etiquetas==""){
        toast1("Sin etiquetas","Ingrese etiquetas correspondientes",8000,"error")
        flag=false;
    }
    var header=$("#headeredit").val();
    if(header==""){
        toast1("Noticia sin cabecera","Ingrese la cabecera de la noticia",8000,"error")
        flag=false;
    }

    var texto= $("#texteditar").val();
    if(texto==""){
        toast1("Noticia sin cuerpo","Ingrese el cuerpo de la noticia",8000,"error")
        flag=false;
    }else{

        
        var texto= $("#texteditar").val();
        //console.log(texto.length);
        if(texto.length > 1000000){

            toast1("Atención","Longitud máxima excedida de caracteres",3000,"warning");
            //texto = numero.substring(0,numero.length-1);
            //$("#header").val(texto);
            flag=false;
        }else{
        
        }
    }

    var cat=$("#Editcat").val();
    if (cat==""){

        toast1("ERROR", "Ingrese una categoria valida",8000,"error");
        flag=false;
    }

    if(flag==false){
        return;
    }

    var altura = document.getElementById("profile-image").height;
    var ancho= document.getElementById('profile-image').width;

    if(ancho>=min_width && ancho<=max_width && altura>=min_height && altura<=max_height){

        var formData = new FormData($("#formimage")[0]);

          var message = "";

         $.ajax({
            url: 'resources/routes/routeNoticias.php',
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,
            processData: false,
            //mientras enviamos el archivo
            dataType:'JSON',
            beforeSend: function(){
                showSpinner();
            },
            //una vez finalizado correctamente
            success: function(data){

                removeSpinner();

                var id= $("#idedit").val();

                var imagen_actual = $("#imagen_actual").val();
                var info = {};
                if(data != null && data != 0){
                    
                    if (data != 0) {
                        data = data.replace(/['"]+/g, '');
                        imagen_actual = imagen_actual.replace("\n","");
                    }else{

                    }
                    

                    info.id             = id;
                    info.cat            = cat;
                    info.header         = header;
                    info.texto          = texto;
                    info.imagen_nueva   = data;
                    info.etiquetas      = Etiquetas;
                    info.imagen_actual  = imagen_actual;
                    info.idUser         = $("#inputUser").val();

                }else{
                    imagen_actual = imagen_actual.replace("\n","");
                    info.id             = id;
                    info.cat            = cat;
                    info.header         = header;
                    info.texto          = texto;
                    info.imagen_nueva   = imagen_actual;
                    info.etiquetas      = Etiquetas;
                    info.imagen_actual  = imagen_actual;
                    info.idUser         = $("#inputUser").val();
                    
                }

                //console.log(info);
                $.ajax({

                    url:"resources/routes/routeNoticias.php",
                    type:"POST",
                    data:{info:info, action:"edit"},
                    dataType:'JSON',
                    beforeSend: function(){
                        showSpinner();
                    },
                    error: function(error){
                        toast1("error",error,8000,"error");
                        removeSpinner();
                    },
                    success: function(data){
                        removeSpinner();
                        if(data!=false){

                            toast1("¡Exito!", "Edición correcta", 5000, "success");
                            window.location.href = "adminNoticias.php";
                        }else{
                            toast1("¡Atención!", "Error al editar", 5000, "warning");
                        }

                    }


                });

            },

        });


    }else{

        toast1("error", "Favor de cambiar el tamaño de la imagen", 8000, "error");
        return;
    }

});

