<?php 
  session_start();
 ?>

<!DOCTYPE html>
<html>
<head>
  <?php include 'includes/linksTemplate.html'; ?>
  <title>Usuarios | COSITEC</title>
</head>

<body class="hold-transition skin-blue sidebar-mini">
  <?php if(isset($_SESSION['login']) == true) {
      echo  "<div class='wrapper'>";

       include('includes/navbarTemplate.php'); 
       include('includes/sidenavTemplate.php'); 


      echo "<div class='content-wrapper'>";

      include('views/perfil.php'); 
        

      echo "</div>";

      include ('includes/footerTemplate.php'); 

    
      echo "</div>";
    } else {

      include 'views/404.php';
      die();

    }

    ?>

<?php include 'includes/scriptsTemplate.html'; ?>
<script src="resources/js/perfil.js"></script>

  
  
</body>

</html>
