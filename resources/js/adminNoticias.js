$(document).ready(function() {

  var d = new Date(),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  var date = year+"-"+month+"-"+day;

  $('#Inputdate1').val(date);
  $('#Inputdate2').val(date);

  getCategorias();
  CargaContenido();

})

var error = "Ocurrió un error insesperado en el sitio, por favor intentelo mas tarde o pongase en contacto con su administrador.";
var success = "La accion se ralizó con exito";
var datosIncorrectos = "Datos incorrectos, vuelve a intentarlo.";
var idUsuario;
var idEquipo;

var state = {
  editar : false,
  Edit : {},
  alldata : [],
};

function getCategorias(){//obtenemos las categorias
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

        let select = $("#select_categoriaload");
        let children = select.children();
        for(let i = 1; i < children.length; i++) {
          children[i].remove();
        }
        
        data.forEach(categoria => {
          let option = document.createElement("option");
          option.text = categoria.categoria;
          option.value = categoria.id;
          select.append(option);
        });

      } else {

          //no hay categorias que mostrar
  
      }
    }
  }); //fin ajax
}

function CargaContenido(){//obtenemos las noticias
  $("tbody2").empty();

  $.ajax({
    url:"resources/routes/routeNoticias.php",
    type:"POST",
    async: true,
    data:{action:"read"},
    dataType:"JSON",
    beforesend:function(){
      showspinner();
      $("tbody2").empty();
    },
    error:function(error){
      toast1("error", error,8000, "error");
    },
    success:function(data){

      if (data!=""){

        let tbody = "";

        for (var i = 0; i < data.length; i++) {
          //Console.log(data[i]);
          tbody += '<tr data-toggle="tooltip" row_'+data[i][0]+'> ';
          tbody += '<td>' + data[i][0] + '</td>';
          tbody += '<td>' + data[i][1] + '</td>';
          tbody += '<td>' + data[i][2]+ '</td>';
          tbody += '<td>' + data[i][3] + '</td>';
          
          tbody += '<td>' + data[i][5] + '</td>';
          tbody += '<td>' + formatDate2(new Date(data[i][6])) + '</td>';
            
          tbody +=`
            <td>
              <a href="#" onclick="verNews(`+data[i][0]+`)" class="btn btn-success btn-xs">
                <i class="glyphicon glyphicon-eye-open"></i> Ver 
              </a>&nbsp&nbsp&nbsp

              <a href="#" onclick="editarNews(`+data[i][0]+`)" class="btn btn-primary btn-xs">
                <i class="glyphicon glyphicon-pencil"></i> Editar 
              </a>&nbsp&nbsp&nbsp

              <a href="#" onclick="eliminarNews(`+data[i][0]+`)" class="btn btn-danger btn-xs">
                <i class="glyphicon glyphicon-trash"></i> Eliminar 
              </a>&nbsp&nbsp&nbsp
          `;
        }

        $('#tbody2').append(tbody);
        
      }else{
        toast1("Atención","Tabla vacia", 5000, "warning");
        
      }
    }
  });
}

function formatDate2(date) {// damos formato a la fecha
 //console.log(date);
  var monthNames = [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciember"
  ];

  var dayNames = [
    "Lunes", "Martes", "Miercoles",
    "Jueves", "Viernes", "Sabado","Domingo"
  ];

  var day = date.getDate() +1;
  var monthIndex = date.getMonth() ;
  var year = date.getFullYear();
  var nomday = date.getDay();
  //console.log(nomday);
  return dayNames[nomday]+ ' ' + day + ' de ' + monthNames[monthIndex] + ' de ' + year;
}



$(document).on("click","#add_content",function(e){//abrimos la pagina para crear noticias

    window.location.href = "agregar.php";

    e.preventDefault();

});

function verNews(id){// abrimos la pagina para ver la noticia

  window.open("../noticias.php?n="+id, '_blank');

}

function editarNews(id){// abrimos la pagina para editar la noticia

  window.location.href = "editar.php?id="+id;

}

function eliminarNews(id){ //abrimos modal de confirmacion
    $('#del_id').val(id);
    $('#mEliminar').modal('show');

}

$('#Confirm_eliminar').click(function(){//eliminamos la noticia

  let info = {};

  info.id = $("#del_id").val();

  $.ajax({

        url:"resources/routes/routeNoticias.php",
        type:"POST",
        data:{info:info, action:"del"},
        dataType:"JSON",
        beforesend: function(){
            showspinner();
        },
        error: function(error){
            console.log(error);
            toast1("error", error, 8000,"error");
        },
        success: function(data){

            if(data==true){
                $("#tbody2").empty();
                CargaContenido();
                $("#mEliminar").modal("hide");
                toast1("Exito","Eliminado Correctamente",8000,"success");

            }
        }

    });
});

function search(){//busqueda de noticias con parametro
  let info = {}
    var Date1= $('#Inputdate1').val();
    var Date2= $('#Inputdate2').val();

    var fechas={
        Date1: Date1, Date2: Date2
    };

    var search_txt = $('#txt_busqueda').val();
    var categoria=$("#select_categoriaload").val();

    info.fechas = fechas;
    info.categoria = categoria;
    info.search = search_txt;
    
    $("#tbody2").empty();

    $.ajax({
      url:"resources/routes/routeNoticias.php",
      type:"POST",
      async: true,
      data:{info:info, action:"search_info"},
      dataType:"JSON",
        beforesend: function(){
            $("#tbody2").empty();
            showspinner();
        },
        error: function(error){

            toast1("error", error, 8000, error);
        },
        success: function(data){

            if(data!=""){

              let tbody = "";
              $("#tbody2").empty();
              for (var i = 0; i < data.length; i++) {
                //Console.log(data[i]);
                tbody += '<tr data-toggle="tooltip" row_'+data[i][0]+'> ';
                tbody += '<td>' + data[i][0] + '</td>';
                tbody += '<td>' + data[i][1] + '</td>';
                tbody += '<td>' + data[i][2]+ '</td>';
                tbody += '<td>' + data[i][3] + '</td>';
                
                tbody += '<td>' + data[i][6] + '</td>';
                tbody += '<td>' + formatDate2(new Date(data[i][6])) + '</td>';
                  
                tbody +=`
                  <td>
                    <a href="#" onclick="verNews(`+data[i][0]+`)" class="btn btn-success btn-xs">
                      <i class="glyphicon glyphicon-eye-open"></i> Ver 
                    </a>&nbsp&nbsp&nbsp
      
                    <a href="#" onclick="editarNews(`+data[i][0]+`)" class="btn btn-primary btn-xs">
                      <i class="glyphicon glyphicon-pencil"></i> Editar 
                    </a>&nbsp&nbsp&nbsp
      
                    <a href="#" onclick="eliminarNews(`+data[i][0]+`)" class="btn btn-danger btn-xs">
                      <i class="glyphicon glyphicon-trash"></i> Eliminar 
                    </a>&nbsp&nbsp&nbsp
                `;
              }
      
              $('#tbody2').append(tbody);

            }else{

                toast1("Atención", "No hay noticias con estos parametros", 5000, "warning");
                $("tbody").empty();
            }
        }

    });
}

$(document).on('click', "#Dates", function(e) {// precionar el boton de buscar en fechas
    e.preventDefault();
    search();

});

$(document).on("click","#Agregar_cat", function(e){//abrimos el modal para agregar categorias
   $("#Modalcat").modal("show");
});

$(document).on("click","#Agregar_Categoria", function(e){// agregamos una categorias
   
  let info = {};
  let categoria = $("#cat_nueva").val();

  if (categoria == "") {

    toast1("Atención", "La Inserte un texto en categoria", 5000,"warning");

  }else{

   info.categoria = categoria;

    $.ajax({
  
        url:"resources/routes/routeNoticias.php",
        type:"POST",
        data:{info:info, action:"Agregar_cat"},
        dataType:"JSON",
        beforesend: function(){
            showspinner();
        },
        error: function(error){
            toast1("error", "error", 8000,"error");
        },
        success: function(data){
            if(data==true){
               
              $("#cat_nueva").val("");
              $("#Modalcat").modal("hide");
              getCategorias();
              toast1("Exito","Categoria Agregada Correctamente",8000,"success");
               
  
            }
        }
  
    });
  }

});

$(document).on("keyup", "#txt_busqueda", function(e){//detonar la funcion de filtrar noticias
    search();
});

$(document).on("change","#select_categoriaload", function(e){// detonar la funcion de filtrar noticias 
  search();
});
