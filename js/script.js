//Carusel
$(document).ready(function(){
    $('.carousel_inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
        nextArrow:'<button type="button" class="slick-next"><img src="icons/right.png"></button>'
});
//Tabs
$('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
  $(this)
    .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
  .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
});

function toggleSlide(item) {
  $(item).each(function(i) {
      $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog_item_content').eq(i).toggleClass('catalog_item_content_active');
          $('.catalog_item_list').eq(i).toggleClass('catalog_item_list_active');
      })
  });
};

toggleSlide('.catalog_item_link');
toggleSlide('.catalog_item_back');


//Modal
  $('[data-modal=consultation]').on('click', function() {
   $('.overlay, #consultation').fadeIn('slow');
});
  $('.modal_close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });
 
  $('.button_mini').each(function(i){
    $(this).on('click', function(){
      $('#order .modal_descr').text($('.catalog_item_subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  function validateForms(form){
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Будьласка, введіть своє імя",
                minlength: jQuery.validator.format("Введіть {0} символа!")
              },
            phone: "Будьласка, введіть свій номер телефона",
            email: {
              required: "Будьласка, введіть свою почту",
              email: "Неправильно введенний адрес почти"
            }
        }
    });
};

validateForms('#consultation-form');
validateForms('#modal-form');
validateForms('#order form');

$('input[name=phone]').mask("+380 (99) 999-99-99");

//Mailer

$('form').submit(function(e) {
  e.preventDefault();
  $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
  }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
  });
  return false;
});

// Smooth scroll and pageup

$(window).scroll(function(){
  if($(this).scrollTop() > 1600){
    $('.pageup').fadeIn();
  }else{
    $('.pageup').fadeOut();
  }
});

$("a[href=#up]").click(function(){
  const _href = $(this).attr("href");
  $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  return false;
});
new WOW().init();
});