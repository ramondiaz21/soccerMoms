<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>AdminLTE 2 | Simple Tables</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.6 -->
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="assets/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="assets/css/skins/_all-skins.min.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>

<body class="hold-transition skin-blue sidebar-mini">
	<div class="wrapper">

	  <?php include('includes/navbar.php'); ?>
	  <?php include('includes/sidebar_left.php'); ?>


		<div class="content-wrapper">

		    <section class="content-header">
		      <h1>
		        Simple Tables
		        <small>preview of simple tables</small>
		      </h1>
		      <ol class="breadcrumb">
		        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
		        <li><a href="#">Tables</a></li>
		        <li class="active">Simple</li>
		      </ol>
		    </section>

		    <section class="content">
		      
		      <div class="row">
		        <div class="col-xs-12">

		          <div class="box">

		            <div class="box-header">
		              <h3 class="box-title">Responsive Hover Table</h3>

		              <div class="box-tools pull-right">
		                <div class="input-group input-group-sm" style="width: 150px;">
		                  <input type="text" name="table_search" class="form-control pull-right" placeholder="Search">

		                  <div class="input-group-btn">
		                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
		                  </div>
		                </div>
		              </div>
		            </div>

		            <div class="box-body table-responsive no-padding">
		              <table class="table table-hover">
		                <tr>
		                  <th>ID</th>
		                  <th>User</th>
		                  <th>Date</th>
		                  <th>Status</th>
		                  <th>Reason</th>
		                </tr>
		                <tr>
		                  <td>183</td>
		                  <td>John Doe</td>
		                  <td>11-7-2014</td>
		                  <td><span class="label label-success">Approved</span></td>
		                  <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
		                </tr>
		                <tr>
		                  <td>219</td>
		                  <td>Alexander Pierce</td>
		                  <td>11-7-2014</td>
		                  <td><span class="label label-warning">Pending</span></td>
		                  <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
		                </tr>
		                <tr>
		                  <td>657</td>
		                  <td>Bob Doe</td>
		                  <td>11-7-2014</td>
		                  <td><span class="label label-primary">Approved</span></td>
		                  <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
		                </tr>
		                <tr>
		                  <td>175</td>
		                  <td>Mike Doe</td>
		                  <td>11-7-2014</td>
		                  <td><span class="label label-danger">Denied</span></td>
		                  <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
		                </tr>
		              </table>
		            </div>

		            <div class="box-footer clearfix">
		              <ul class="pagination pagination-sm no-margin pull-right">
		                <li><a href="#">&laquo;</a></li>
		                <li><a href="#">1</a></li>
		                <li><a href="#">2</a></li>
		                <li><a href="#">3</a></li>
		                <li><a href="#">&raquo;</a></li>
		              </ul>
		            </div>

		          </div>

		        </div>
		      </div>

					
					<button class="btn btn-defaul" id="modal">Abrir modal</button>

		      <div class="modal fade bs-example-modal" id="modal1">
          
					  <div class="modal-dialog modal-lg">
					    <div class="modal-content">

					      <div class="modal-header auto-overflow skins myModal-header">
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true" style="color: white">&times;</span>x</button>
					        <h4 class="modal-title" id="title_contratantes">NUEVO CONTRATANTE</h4>
					      </div>
					      
					      <div class="modal-body" id="div_modal_body">
					        
					        <form action="" id="form_contratantes_gmc">
					        
					          <input type="text" name="contratante_action" id="contratante_action" value="new_contratante_gmc" hidden>
					          <input type="text" id="contratante_id" name="contratante_id" hidden>

					          <div class="form-group col-md-8">
					            <label for="">RAZÓN SOCIAL</label>
					            <input type="text" class="form-control col-md-12" id="gmc_rsocial" name="gmc_rsocial" placeholder="Ej. CAMARA MEXICANA DE LA INDUSTRIA DE LA CONSTRUCCIÓN ">
					          </div>

					          <div class="form-group col-md-4">
					            <label for="">RFC</label>
					            <input type="text" class="form-control col-md-12" id="gmc_rfc" name="gmc_rfc" placeholder="Ej. CUPU800825569.">
					          </div>



					        </form>

					      </div>

					      <div class="modal-footer auto-overflow">
					        <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">CERRAR</button>
					        <button type="button" class="btn btn-primary btn_modal_contratantes" id="">GUARDAR CAMBIOS</button>
					      </div>

					    </div>
					  </div>

					</div>


		    </section>

		</div>

	  <?php include('includes/footer.php'); ?>
	  <?php include('includes/sidebar_rigth.php'); ?>

	  
	</div>

	<!-- jQuery 2.2.3 -->
	<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
	<!-- Bootstrap 3.3.6 -->
	<script src="assets/bootstrap/js/bootstrap.min.js"></script>
	<!-- Slimscroll -->
	<script src="plugins/slimScroll/jquery.slimscroll.min.js"></script>
	<!-- FastClick -->
	<script src="plugins/fastclick/fastclick.js"></script>
	<!-- AdminLTE App -->
	<script src="assets/js/app.min.js"></script>
	<!-- AdminLTE for demo purposes -->
	<script src="assets/js/demo.js"></script>

	<script>
		
		$(document).on('click', '#modal', function(e){
			e.preventDefault();

			$('#modal1').modal('show');
			
		});

	</script>
</body>

</html>
