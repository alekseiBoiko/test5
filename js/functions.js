$(function(){
  sortIsotope();
  }
);

function sortIsotope() {

  // var itemSelector: '.works-item';

  var $list = $('.works-list').isotope({
    itemSelector: '.works-item',
    percentPosition: true,
    layoutMode: 'fitRows'
  });
  var $checkboxes = $('.filter-item');


  var responsiveIsotope = [ [480, 4] , [720, 6] ];
  var itemsPerPageDefault = 8;
  var itemsPerPage = defineItemsPerPage();
  var currentNumberPages = 1;
  var currentPage = 1;
  var currentFilter = '*';
  var filterAttribute = 'data-filter';
  var filterValue = "";
  var pageAttribute = 'data-page';
  var pagerClass = 'isotope-pager';

  
  
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
  
  function changeFilter(selector) { $list.isotope({ filter: selector }); }
  
  function goToPage(n) {
    currentPage = n;
    var selector = '.works-item';
    var exclusives = [];
        // for each box checked, add its value and push to array
    $checkboxes.each(function (i, elem) {
      if (elem.checked) {
        selector += ( currentFilter != '*' ) ? '.'+elem.value : '';
        exclusives.push(selector);
      }
    });
        // smash all values back together for 'and' filtering
    filterValue = exclusives.length ? exclusives.join('') : '*';
        
        // add page number to the string of filters
    var wordPage = currentPage.toString();
    filterValue += ('.'+wordPage);
   
    changeFilter(filterValue);
  }

  function defineItemsPerPage() {
    var pages = itemsPerPageDefault;

    for( var i = 0; i < responsiveIsotope.length; i++ ) {
        if( $(window).width() <= responsiveIsotope[i][0] ) {
            pages = responsiveIsotope[i][1];
            break;
        }
    }
    return pages;
  }

  function setPagination() {

    var SettingsPagesOnItems = function(){
      var itemsLength = $list.children('.works-item').length;
      var pages = Math.ceil(itemsLength / itemsPerPage);
      var item = 1;
      var page = 1;
      var selector = '.works-item';
      var exclusives = [];

            // for each box checked, add its value and push to array
        $checkboxes.each(function (i, elem) {
          if (elem.checked) {
              selector += ( currentFilter != '*' ) ? '.'+elem.value : '';
              exclusives.push(selector);
          }
        });      
            // smash all values back together for 'and' filtering
        filterValue = exclusives.length ? exclusives.join('') : '*';
            // find each child element with current filter values
        $list.children(filterValue).each(function(){
              // increment page if a new one is needed
          if( item > itemsPerPage ) {
            page++;
            item = 1;
          }
              // add page number to element as a class
          wordPage = page.toString();
              
          var classes = $(this).attr('class').split(' ');
          var lastClass = classes[classes.length-1];
              // last class shorter than 4 will be a page number, if so, grab and replace
          if(lastClass.length < 4){
            $(this).removeClass();
            classes.pop();
            classes.push(wordPage);
            classes = classes.join(' ');
            $(this).addClass(classes);
          } else {
                  // if there was no page number, add it
              $(this).addClass(wordPage); 
          }
          item++;
        });    
      currentNumberPages = page;
    }();

    // create page number navigation
    var CreatePagers = function() {
      var $isotopePager = ( $('.'+pagerClass).length == 0 ) ? $('<div class="'+pagerClass+'"></div>') : $('.'+pagerClass);

        $isotopePager.html('');
        if(currentNumberPages > 1){
          for( var i = 0; i < currentNumberPages; i++ ) {
            var $pager = $('<a href="javascript:void(0);" class="pager" '+pageAttribute+'="'+(i+1)+'"></a>');
              $pager.html(i+1);

              $pager.click(function(){
                var page = $(this).eq(0).attr(pageAttribute);
                goToPage(page);
              });
              
            $pager.appendTo($isotopePager);
          }
        }
        $list.after($isotopePager);
    }();
  }
};
