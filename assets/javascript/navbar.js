$(document).ready(function() {

  $('#sidebarCollapse').on('click', function() {
    $('#sidebar').toggleClass('active');
  });

  $('#sidebarCollapse').on('click', function() {
    $('.btnNavbar').toggleClass('activeBtn');
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
      $('.navbar').addClass('altNav')
    }
    if ($(this).scrollTop() < 500) {
      $('.navbar').removeClass('altNav')
    }
  });

});