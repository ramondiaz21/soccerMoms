<section class="content-header">
  <h1 style="padding: 0 15px">
    Usuarios
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
      <div class="col-lg-4 col-md-4 col-12">
        <button class="btn btn-primary" style="width: 100%;" data-toggle="modal" data-target="#modAgregarUsuario">Agregar Usuario</button>
      </div>
      <div class="col-lg-4 col-md-4 col-12">
        <select name="" id="select_status" class="form-control">
          <option value="1">ACTIVOS</option>
          <option value="0">INACTIVOS</option>
          <!--<option value="3">ELIMINADOS</option>-->
          <option value="2">TODOS</option>
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-12">
        <div class="input-group input-group-sm" style="width: 100%;">
          <input type="text" id="txt_busqueda" name="table_search" class="form-control pull-right" placeholder="Buscar username o nombre...">
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
    <div class="modal fade bs-example-modal" id="modAgregarUsuario">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header auto-overflow skins myModal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" style="color: white">&times;</span>x</button>
            <h4 class="modal-title" id="title_contratantes">NUEVO USUARIO</h4>
          </div>
          <form action="" id="formAgregar" method="" accept-charset="">
            <div class="modal-body" id="div_modal_body">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12" style="margin-top: 15px">
                  <input type="text" class="form-control necesary" id="txtUsername" name="" value="" placeholder="Nombre de usuario*">
                </div>
                <div class="col-lg-6 col-md-6 col-12" style="margin-top: 15px">
                  <input type="password" class="form-control necesary" id="txtPassword" name="" value="" placeholder="Contraseña*">
                </div>
                <div class="col-lg-6 col-md-6 col-12" style="margin-top: 15px">
                  <select name="" id="slcRoles" class="form-control">
                  </select>
                </div>
                <div class="col-lg-6 col-md-6 col-12" style="margin-top: 15px">
                  <input type="text" class="form-control" id="txtNombre" name="" value="" placeholder="Nombre">
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
    <!-- ----------------MODAL EDITAR USUARIO------------------ -->
    <div class="modal fade bs-example-modal" id="modEditarUsuario">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header auto-overflow skins myModal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" style="color: white">&times;</span>x</button>
            <h4 class="modal-title" id="title_contratantes">EDITAR USUARIO</h4>
          </div>
          <form action="" id="formEditar" method="" accept-charset="">
            <div class="modal-body" id="div_modal_body">
              <div class="row">
                <input type="text" style="display: none" id="txtIdE" name="" value="" placeholder="">
                <div class="col-lg-6 col-md-6 col-12" style="margin-top: 15px">
                  <label><b>Nombre de usuario:</b></label>
                  <input type="text" class="form-control necesary" id="txtUsernameE" name="" value="" placeholder="Nombre de usuario*">
                </div>
                <div class="col-lg-6 col-md-6 col-12" style="margin-top: 15px">
                  <label><b>Contraseña:</b></label>
                  <input type="password" class="form-control necesary" id="txtPasswordE" name="" value="" placeholder="Contraseña*">
                </div>
                <div class="col-lg-6 col-md-6 col-12" style="margin-top: 15px">
                  <label><b>Rol:</b></label>
                  <select name="" id="slcRolesE" class="form-control">
                  </select>
                </div>
                <div class="col-lg-6 col-md-6 col-12" style="margin-top: 15px">
                  <label><b>Nombre</b></label>
                  <input type="text" class="form-control" id="txtNombreE" name="" value="" placeholder="Nombre">
                </div>
              </div>
            </div>
            <div class="modal-footer auto-overflow">
              <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">CERRAR</button>
              <button type="submit" class="btn btn-primary btn_modal_contratantes" id="btnguardarEdit">EDITAR USUARIO</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- ----------------FIN MODAL EDITAR CLIENTE------------------ -->
  </section>