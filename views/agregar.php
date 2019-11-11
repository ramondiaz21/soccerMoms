<section class="content-header row">
</section>

<section class="content">

  <div class="panel panel-info">

    <div class="panel-heading">
      <h4 align="center">Componentes de la noticia</h4>
    </div>

    <div class="panel-body">

      <form id="formtext">

        <div class="col-xs-4">

          <input type="text" id="header" class="form-control" placeholder="Encabezado..."></input>

        </div>

        <div class="col-xs-4">

          <input id="select_categoria" placeholder="Categoria..." class="form-control" type="text" />

        </div>

        <div class="col-xs-4">

          <form id="formtags">

            <input id="tags" type="text" data-role="tagsinput" class="form-control" placeholder="Etiquetas..."><br><br>

          </form>

        </div>
      </form>
    </div>
  </div>

  <div class="panel panel-success">
    <div class="panel-heading">
      <h4 align="center">Cuerpo e imagen</h4>
    </div>

    <div class="panel-body">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="x_panel">

            <form enctype="multipart/form-data" class="formulario" id="formimage" name="formimage">
              <p align="center"><label >Subir imagen</label></p>
              <p align="center"><label >Tamaño de la imagen - Minimo: 974x380 Maximo: 1074x480</label></p>
              <p align="center">
                <input  type="file" id="imagen" name="imagen"></input>
              </p><br />
            </form>

            <p align="center">
              <img src="#" id="imageadd"  style="display:none">
            </p>

            <div class="messages" id="messages"></div>
            <br /><br />

            <input type="hidden" id="tipo" name="tipo" value="2"/>

            <!-- start project list -->
            <form id="get-data-form" method="POST">
              <!--<textarea class="tinymce" id="textadd"  style="width: 100%; height: 1000px" value=""></textarea>-->
              <textarea id="textadd"  style="width: 100%; height: 1000px" value=""></textarea>
            </form><br>
            <button type="button" id="SubirContenido" class="btn btn-success" style="float:right">Agregar Contenido</button>
            <!-- end project list -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <input id="inputID" type="text" style="display: none;" value='<? echo $_SESSION['idUser']?>' >

</section>

