$(function(){
  sortIsotope();
  }
);

function sortIsotope() {

  var $list = $('.works-list').isotope({
    itemSelector: '.works-item',
    percentPosition: true,
    layoutMode: 'fitRows'
  });

  var filterAttribute = 'data-filter';
  
  $list.imagesLoaded().progress(function(){
    $list.isotope('layout');
  });
  
  $('.filter-list').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  // use filterFn if matches value
  // filterValue = filterFns[ filterValue ] || filterValue;
  $('.works-list').isotope({ filter: filterValue });
  });
  
  // change is-checked class on buttons
  $('.filter-list').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.filter-active').removeClass('filter-active');
      $( this ).addClass('filter-active');
    });
  });
};
