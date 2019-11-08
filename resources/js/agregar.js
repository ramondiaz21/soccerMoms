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

function loadCategoria(){//obtiene las categorias existentes
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
      toast1("Error!", ajaxError, 8000, "error");
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

        toast1("Error!", error, 5000, "error");
  
      }
    }
  }); //fin ajax
}

$(document).on("keyup", "#header", function(){ //funcion que detona un contandor
   countChars(this);
});

function countChars(obj){ // contador de letras para el titulo
    var maxLength = 100;
    var strLength = obj.value.length;
    numero    = $("#header").val();
    if(strLength > maxLength){

        toast1("Atención","Longitud máxima excedida de caracteres",3000,"warning");
        texto = numero.substring(0,numero.length-1);
        $("#header").val(texto);
        
    }else{

    }
}

function readURL(input) { /// cargar la imagen de cabecera 

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


                $('#imageadd').attr('src', e.target.result);
                document.getElementById('imageadd').style.display = 'block';
            };
            return true;
        }else{
            document.getElementById('imageadd').style.display = 'none';
            toast1("Error al cargar el archivo","El archivo no es una imagen",8000,"error");
            $('#imagen').val('');
            return false;
        }
    }
}


$(document).on("change", "#imagen", function(){
    readURL(this);

});


$(document).on("click", "#SubirContenido", function(){ // subir la noticia


    var altura = document.getElementById("imageadd").height;
    var ancho= document.getElementById('imageadd').width;
    var formData = new FormData($("#formimage")[0]);


    var flag=true;

    if(formData==""){
        toast1("Error","Favor de subir una imagen",8000,"error");
        flag=false;

    }

    var header=$("#header").val();

    if(header==""){

        toast1("Cabecera","Ingrese Cabecera",8000,"error");
        flag=false;
    }

    var Texto = $("#textadd").val();;
    if(Texto==""){
        toast1("Cuerpo","Ingrese Cuerpo De La Noticia",8000,"error");
        flag=false;
    }else{
        
        var texto = $("#textadd").val();;
        if(texto.length > 1000000){

            toast1("Atención","Longitud máxima de caracteres excedida",3000,"warning");

            flag=false;
        }else{
        
        }
    }

    var categoria= $("#select_categoria").val();
    if(categoria=="0"){
        toast1("Categoria","Categoria Invalida",8000,"error");
        flag=false;
    }

    var Etiquetas=$("#tags").val();
    if(Etiquetas==""){
        toast1("Etiquetas","Etiquetas Necesarias",8000,"error");
        flag= false;
    }

    if (flag==false){
        return;
    }

    if(ancho>=min_width && ancho<=max_width && altura>=min_height && altura<=max_height){

        var message = "";

        //hacemos la petición ajax, subimos primero la imagen de cabecera
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

            },
            //una vez finalizado correctamente
            success: function(data){

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
                $.ajax({ // enviamos toda la noticia

                    url:"resources/routes/routeNoticias.php",
                    type:"POST",
                    data:{info:info, action:"add"},
                    beforeSend: function(){
                       
                    },
                    error: function(error){
                        toast1("error",error,8000,"error");
                        
                    },
                    success: function(data){
                        removeSpinner();
                        if(data!=false){
                            //console.log(data);
                            toast1("¡Exito!", "adicion correcta", 8000, "success");

                            resetForm("formtext");
                            resetForm("formimage");
                            resetForm("get-data-form");
                            document.getElementById('imageadd').style.display = 'none';
                            window.location.href = "adminNoticias.php";
                            //$('#tags').tagsinput('removeAll');

                        }

                    }

                });

            }

        });


    }else{
        console.log(ancho);
        console.log(altura);
        toast1("error", "Tamaño o imagen no valida", 8000, "error");
        return;
    }

});
