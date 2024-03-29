<section class="content-header">
  <h1 style="padding: 0 15px">
    Administración De Equipos
    <!--<small>preview of simple tables</small>-->
  </h1>
  <!--<ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Tables</a></li>
            <li class="active">Simple</li>
          </ol>
        </section>-->
  <div class="" style="padding: 0 15px; margin-top: 10px">
    <div class="row">
      <!--<div class="col-lg-4 col-md-4 col-12">
        <button class="btn btn-primary" style="width: 100%;" data-toggle="modal" data-target="#modAgregarUsuario">Agregar Usuario</button>
      </div>-->
      <div class="col-lg-4 col-md-4 col-12">
        <select name="" id="select_equipo" class="form-control">
          <option value="1">ACTIVOS</option>
          <option value="0">INACTIVOS</option>
        </select>
      </div>
      <!--<div class="col-lg-4 col-md-4 col-12">
        <div class="input-group input-group-sm" style="width: 100%;">
          <input type="text" id="txt_busqueda" name="table_search" class="form-control pull-right" placeholder="Buscar username o nombre...">
          <div class="input-group-btn">
            <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
          </div>
        </div>
      </div>-->
    </div>
  </div>
  <div class="" style="padding: 0 15px; margin-top: 10px">
    <div class="row">
      <div class="col-lg-4 col-md-4 col-12">
        <button disabled class="btn btn-primary inputDisabled" style="width: 100%;" data-toggle="modal" data-target="#modAgregarJugadora">Agregar Jugadora</button>
      </div>
      <div class="col-lg-4 col-md-4 col-12">
        <select disabled name="" id="select_status" class="form-control inputDisabled">
          <option value="1">ACTIVOS</option>
          <option value="0">INACTIVOS</option>
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-12">
        <div class="input-group input-group-sm" style="width: 100%;">
          <input disabled type="text" id="txt_busqueda" name="table_search" class="form-control pull-right inputDisabled" placeholder="Buscar nombre jugadora...">
          <div class="input-group-btn">
            <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section class="content">
    <div class="row">
      <div class="col-lg-12 col-xs-12">
        <div class="box">
          <div class="box-header">
            <div class="box-tools pull-right">
            </div>
          </div>
          <div class="box-body table-responsive no-padding">
            <table class="table table-hover">
              <thead id="thead">
              </thead>
              <tbody id="tbody">
              </tbody>
            </table>
          </div>
          <!--<div class="box-footer clearfix">
            <ul class="pagination pagination-sm no-margin pull-right">
              <li><a href="#">&laquo;</a></li>
              <li><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">&raquo;</a></li>
            </ul>
          </div>-->
        </div>
      </div>
    </div>
    <!--<button class="btn btn-defaul" id="modal">Abrir modal</button>-->
    <!-- ----------------MODAL AGREGAR USUARIO------------------ -->
    <div class="modal fade bs-example-modal" id="modAgregarJugadora">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header auto-overflow skins myModal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" style="color: white">&times;</span>x</button>
            <h4 class="modal-title" id="title_contratantes">NUEVA JUGADORA</h4>
          </div>
          <form action="" id="formAgregar" method="" accept-charset="">
            <div class="modal-body" id="div_modal_body">
              <div class="row">
                <div class="col-lg-8 col-md-8 col-12">
                  <div class="col-lg-12" style="margin-top: 15px">
                    <input type="text" class="form-control necesary" id="txtNombre" name="" value="" placeholder="Nombre De Jugadora*">
                  </div>
                  <div class="col-lg-12" style="margin-top: 15px">
                    <input type="tel" class="form-control necesary" id="txtTelefono" name="" value="" placeholder="Teléfono*">
                  </div>
                  <div class="col-lg-12 text-center" style="margin-top: 15px">
                    <!--<button type="button" style="width: 60%;" class="btn btn-info"><i class="fa fa-upload" aria-hidden="true"></i></i>&nbsp;Subir Documento</button>
                    <form action="upload.php" method="post" enctype="multipart/form-data">
                      Select image to upload:
                      <input type="file" name="fileToUpload" id="fileToUpload">
                      <input type="submit" value="Upload Image" name="submit">
                    </form>-->
                    <!--<form id="myform" enctype="multipart/form-data">
                      <input class="form-control-file" id="filePrueba" name='filePrueba' type="file" accept='image/jpeg, image/x-png'>
                    </form>-->
                    <!--<form method="post" action="#" enctype="multipart/form-data">
                      <input type="file" class="form-control-file" name="image" id="image">
                      <input type="button" class="btn btn-primary upload" value="Subir">
                    </form>-->
                    <form id="uploadimage" action="" method="post" enctype="multipart/form-data">
                      <input type="file" name="file" id="file" required />
                      <input type="submit" value="Upload" class="submit" />
                    </form>
                    <div id="respuesta"></div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-12 text-center">
                  <div class="image-wrapper" style="margin: auto; width: 250px; height: 250px;">
                    <img src="assets/images/usuaria.jpg" style="width: 100%; height: 100%;" alt="">
                  </div>
                  <button type="button" class="btn btn-primary" style="margin:auto; width:80%;margin-top: 15px;"><i class="fa fa-cloud-upload" aria-hidden="true"></i> Subir Imagen</button>
                </div>
              </div>
            </div>
            <div class="modal-footer auto-overflow">
              <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">CERRAR</button>
              <button type="submit" class="btn btn-primary btn_modal_contratantes" id="btnAgregarNew">AGREGAR USUARIO</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- ----------------FIN MODAL AGREGAR USUARIO------------------ -->
    <!-- ----------------MODAL EDITAR JUGADORA------------------ -->
    <div class="modal fade bs-example-modal" id="modEditarJugadora">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header auto-overflow skins myModal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" style="color: white">&times;</span>x</button>
            <h4 class="modal-title" id="title_contratantes">EDITAR JUGADORA</h4>
          </div>
          <form action="" id="formEditar" method="" accept-charset="">
            <div class="modal-body" id="div_modal_body">
              <input type="text" class="form-control necesary" id="txtIdE" name="" value="" placeholder="Nombre De Jugadora*" style="display: none">
              <div class="row">
                <div class="col-lg-8 col-md-8 col-12">
                  <div class="col-lg-12" style="margin-top: 15px">
                    <label style="width: 100%;"><b>Nombre:</b></label>
                    <input type="text" class="form-control necesary" id="txtNombreE" name="" value="" placeholder="Nombre De Jugadora*">
                  </div>
                  <div class="col-lg-12" style="margin-top: 15px">
                    <label style="width: 100%;"><b>Teléfono:</b></label>
                    <input type="tel" class="form-control necesary" id="txtTelefonoE" name="" value="" placeholder="Teléfono*">
                  </div>
                  <div class="col-lg-12 text-center" style="margin-top: 15px">
                    <button type="button" style="width: 60%;" class="btn btn-info"><i class="fa fa-upload" aria-hidden="true"></i></i>&nbsp;Subir Documento</button>
                    <form action="upload.php" method="post" enctype="multipart/form-data">
                      Select image to upload:
                      <input type="file" name="fileToUpload" id="fileToUpload">
                      <input type="submit" value="Upload Image" name="submit">
                    </form>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-12 text-center">
                  <div class="image-wrapper" style="margin: auto; width: 250px; height: 250px;">
                    <img src="assets/images/usuaria.jpg" style="width: 100%; height: 100%;" alt="">
                  </div>
                  <button type="button" class="btn btn-primary" style="margin:auto; width:80%;margin-top: 15px;"><i class="fa fa-cloud-upload" aria-hidden="true"></i> Subir Imagen</button>
                </div>
              </div>
            </div>
            <div class="modal-footer auto-overflow">
              <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">CERRAR</button>
              <button type="submit" class="btn btn-primary btn_modal_contratantes" id="btnEditar">EDITAR JUGADORA</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- ----------------FIN MODAL EDITAR JUGADORA------------------ -->
  </section>