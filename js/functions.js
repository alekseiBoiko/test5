function changeHamburger() {
    $('.menu-btn').on('click', function(e) {
      e.preventDefault();
      $(this).toggleClass('menu-btn_active');
      $('.nav-block').toggleClass('nav_active');
    })
};

function turnonFancybox() {
    $("[data-fancybox]").fancybox();
};

let servicesList = $('.service-list'),
    servicesItem = servicesList.find('.service-item');
  servicesItem.on('click', function (event) {
    event.stopPropagation();
    let cur = $(this);
    cur.toggleClass('active').siblings().removeClass('active');
  });

changeHamburger();
turnonFancybox();