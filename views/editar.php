<section class="content">

  <div class="panel panel-info">

    <div class="panel-heading">
      <h4 align="center">Componentes de la noticia</h4>
    </div>

    <div class="panel-body">

      <div class="col-xs-6">

        <input type='text' class='form-control' value='' id='headeredit'></input>
        <br>

      </div>

      <div class="col-xs-3">

        <input id="Editcat" class="form-control" type="text" />

      </div>

      <div class="col-xs-3">

        <input type='text' class='form-control' value='' id='marksedit' data-role='tagsinput'></input>

      </div>

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

            <p align="center">
              <img src="#" id="imageadd"  style="display:none">
            </p>

            <input type="hidden" id="tipo" name="tipo" value="2"/>
            <!-- start project list -->
            <textarea  id="texteditar" value=""></textarea>
            <form enctype="multipart/form-data" class="formedit" id="formimage" hidden >
              <input id="imagenedit" name="imagenedit" type="file"  />
              <input type="hidden" id="tipo" name="tipo" value="1" />
              <input type="hidden" id="action" name="action" value="editImg" />
            </form><br><br>

            <div class="containerimage">
              <div class="col-md-12">
                <image id='profile-image' style='margin-left:auto; margin-right:auto' class='image' src="" ></image >
                <div class="middle" style="position: absolute;  background-color:rgba(85, 205, 251, 0.42); width: 750px ">
                  <span class="text">Cambiar Imagen?<br>
                    Tamaño aceptado -  Minimo: 974x380 Maximo: 1074x480
                  </span>
                </div>
              </div >
            </div>

            <br>
            <div class="messages" id="messages"></div>
            <button class="btn btn-primary" id="Guardar_cambios" style="float:right">Guardar Cambios</button>
            <!-- end project list -->
          </div>
        </div>
      </div>
    </div>
  </div>


  <input id="inputSRC2" type="text" style="display: none;" value='<? echo NOTI_PATH?>' >
  <input id="inputID" type="text" style="display: none;" value='<? echo $id?>' >
  <input id="inputUser" type="text" style="display: none;" value='<? echo $idUser?>' >
  <input type='hidden' class='form-control' value='' id='imagen_actual' hidden  >
  <input type='hidden' class='form-control' value='' id='idedit' hidden >
</section>