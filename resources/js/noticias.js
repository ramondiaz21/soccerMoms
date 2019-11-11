//variables
var error = "Ocurrió un error insesperado en el sitio, por favor intentelo mas tarde o pongase en contacto con su administrador.";
var success = "La accion se ralizó con exito";
var datosIncorrectos = "Datos incorrectos, vuelve a intentarlo.";
var count = 8 ;
var PATH = $("#inputSRC").val();
var PATH2 = $("#inputSRC2").val();


$(document).ready(function() { // funciones a realizar cuando se carge la pagina

    loadNoticia();
    //loadRecientes();
});

function loadNoticia(){

    let info = {};
    
    info.lim = count;

    $.ajax({
        url:'resources/routes/routeNoticias.php',
        type:'post',
        async: true,
        data: {info: info, action: 'getnoticias'},
        dataType:'JSON',
        beforeSend: function() {
            showSpinner();
        },
        error: function(error){
            console.log(error);
            //my_toast("Error!", ajaxError, 8000, "error");
            removeSpinner();
        },
        success: function(data) {
            removeSpinner();
            if (data != null) {
                
                if (count == 8) {

                    var i = 0;

                }else{


                    var i = count - 8;

                }
                for ( i ; i < data.length; i++) {

                    var div  = i + 1;
                    var div2 = i + 2;
                    $("#divNoti"+div).after(`

                        <div class="col-lg-3 col-md-3 col-10">
                        	<div class="card" style="width: 100%;">
            			    	<img class="card-img-top" src="`+PATH2+data[i][4]+`" alt="Card image cap">
            			    	<div class="card-body">
            			      		<h5 class="card-title">`+data[i][1]+`</h5>
            			      		<hr>
            			      		<p class="card-text">`+data[i][3]+`</p>
            			      		
            			      		<a href="noticia.php?n=`+data[i][0]+`" >SABER MÁS</a>
            			    	</div>
            			 	</div>
            			</div>
                        
                        <div id="divNoti`+div2+`"></div>
                    `);
                    
                }
                 
            }else{

            }
            
        }
    }); //fin ajax

     
}

function loadRecientes(){

    let info = {};
    
    $.ajax({
        url:'resources/routes/routeNoticias.php',
        type:'post',
        async: true,
        data: {info: info, action: 'LastNews'},
        dataType:'JSON',
        beforeSend: function() {
            showSpinner();
        },
        error: function(error){
            console.log(error);
            //my_toast("Error!", ajaxError, 8000, "error");
            removeSpinner();
        },
        success: function(data) {
            removeSpinner();
            if (data != null) {
                
                for ( var i = 0 ; i < data.length; i++) {

                    var div  = i + 1;
                    var div2 = i + 2;
                    $("#divlast"+div).after(`
                        <a href="noticias.php?n=`+data[i]["id"]+`" title="">
                            <div class="row small-noticias">
                                <div class="col-lg-12 col-md-12 col-12">
                                  <img style="width: 100%;" src="`+PATH2+data[i]["url"]+`" class="card-img-top">
                                </div>
                                <div class="col-lg-12 col-md-12 col-12">
                                  <h6>`+data[i]["cabecera"]+`</h6>
                                  <small class="info-date" style="color: black;">2`+data[i]["fecha"]+`</small>
                                </div>
                            </div>
                        </a>
                        <hr>
                        <div id="divlast`+div2+`"></div>
                    `);
                    
                }
                 
            }else{

            }
            
        }
    }); //fin ajax

     
}

$(document).on("click","#load_content",function(e){//funciona

    e.preventDefault();
    count = count + 5;
    loadNoticia()

});