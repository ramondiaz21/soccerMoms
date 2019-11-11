<section class="content-header row">

  <div class="page-title">
    <div class="form-group col-md-12 col-sm-12 col-xs-12 header_tablas">
      <div class="col-md-6 col-sm-12 col-xs-12" >
        <div class="input-group input-daterange">
          <div class="input-group">
            <!--<div class="input-group-addon">De</div>-->
            <span class="input-group-addon">De</span>
            <input type='date' id='Inputdate1' class='form-control' />
            <span class="input-group-addon">a</span>
            <input type='date' id='Inputdate2' class='form-control' />
            <span class="input-group-btn">
              <a  class="btn btn-info btn-md" id="Dates">
                <i class="glyphicon glyphicon-search"></i>
              </a>
              <a class="btn btn-danger btn-md" id="Datesdelete" type="button">
                <i class="glyphicon glyphicon-remove"></i>
              </a>
            </span>
          </div>
        </div>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-6">
        <div class="input-group">

          <select id="select_categoriaload" class="form-control">
            <option value="0">Busqueda por categoria</option>
          </select>

          <div class="input-group-btn">
            <a  class="btn btn-success btn-md" id="Agregar_cat">
              <i class="glyphicon glyphicon-plus"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-6">
        <input type="text" id="txt_busqueda" class="form-control" placeholder="Busqueda..."></input>
      </div>
    </div>
  </div>
</section>

<section class="content">
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Noticias</h2>

          <ul class="nav navbar-right panel_toolbox">
            <li>
              <div class="col-md-1 col-sm-4 col-xs-4">
                <button class="btn btn-primary" id="add_content" >
                  <span class="fa fa-plus"></span>
                  Agregar Noticia
                </button>
              </div>
            </li>
          </ul>

          <div class="clearfix"></div> 
        </div>

        <div id="tableContainer" class="x_content table-responsive">
          <!-- start project list -->
          <table class="table table-striped projects">
            <thead>
              <tr>
                <th style="width:25px ">No.</th>
                <th style="width:90px ">TÍTULO</th>
                <th style="width:90px ">CATEGORIA</th>
                <th style="width:130px ">NOTICIA</th>
                <th style="width:130px ">TAGS</th>
                <th style="width:150px ">FECHA ALTA</th>
                <th style="width:275px ">OPCIONES</th>
              </tr>
            </thead>

            <tbody id="tbody2">
            </tbody>
          </table>
          <!-- end project list-->
        </div>
      </div>
    </div>
  </div>

  <input id="inputSRC" type="text" style="display: none;" value='<? echo IMG_PATH?>' >
  <input id="inputID" type="text" style="display: none;" value='<? echo $id?>' >
</section>

<div class="modal fade" id="Modalcat" role="dialog">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Agregar Categoria Nueva</h4>
      </div>
      <div class="modal-body">
        <label >Categoria Nueva</label>
        <input type="text" class="form-control" id="cat_nueva"></input>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" id="Agregar_Categoria">Agregar</button>
        <button type="button" class="btn btn-error" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div id="mEliminar" class="modal fade">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Eliminar Noticia</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Desea eliminar la noticia ?</p>
        <input id="del_id" type="hidden" value="" />
      </div>
      <div class="modal-footer">
        <button id="Confirm_eliminar" type="button" class="btn btn-primary">Aceptar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>
