<?php 
session_start();
?>
<aside class="main-sidebar">
    <ul class="sidebar-menu">
      <li <?php echo $_SESSION['rol'] == "1" ? 'show' : 'hidden' ;?>><a href="usuarios.php"  target=""><i class="fa fa-user"></i> <span>Usuarios</span></a></li>
      <li><a href="perfil.php"  target=""><i class="fa fa-user"></i> <span>Mi Perfil</span></a></li>
      <li><a href="altaEquipos.php"  target=""><i class="fa fa-folder"></i> <span>Administración Equipos</span></a></li>
      <li <?php echo $_SESSION['rol'] == "1" ? 'show' : 'hidden' ;?>><a href="adminEquipos.php"  target=""><i class="fa fa-user"></i> <span>Administración Todos Equipos</span></a></li>
    </ul>
  </section>
  <!-- /.sidebar -->
</aside>