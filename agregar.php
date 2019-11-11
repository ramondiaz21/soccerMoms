<?php 
  session_start();

 ?>

<!DOCTYPE html>
<html>
<head>
  <?php include 'includes/linksTemplate.html'; ?>

  <link type="text/css" rel="stylesheet" href="assets/jodit/build/jodit.min.css">
  <link rel="stylesheet" type="text/css" href="assets/bootstrap-tagsinput-latest/src/bootstrap-tagsinput.css">
  <link rel="stylesheet" href="assets/EasyAutocomplete/easy-autocomplete.min.css">

  <title>Usuarios | COSITEC</title>
</head>

<body class="hold-transition skin-blue sidebar-mini">
  <?php if(isset($_SESSION['login']) == true) {
      echo  "<div class='wrapper'>";

       include('includes/navbarTemplate.php'); 
       include('includes/sidenavTemplate.php'); 

      
      echo "<div class='content-wrapper'>";

      include('views/agregar.php'); 
        

      echo "</div>";

      include ('includes/footerTemplate.php'); 

    
      echo "</div>";
    } else {

      include 'views/404.php';
      die();

    }

    ?>

<?php include 'includes/scriptsTemplate.html'; ?>
<script src="resources/js/agregar.js"></script>
<script type="text/javascript" src="assets/bootstrap-tagsinput-latest/src/bootstrap-tagsinput.js"></script>
<script type="text/javascript" src="assets/jodit/build/jodit.min.js"></script> 
<script src="assets/EasyAutocomplete/jquery.easy-autocomplete.min.js"></script>
</body>

</html>
