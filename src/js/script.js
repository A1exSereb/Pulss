$(document).ready(function(){
  $('.carousel__inner').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  //adaptiveHeight: true,
  prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
  nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
  responsive: [
    {
      breakpoint: 900,
      settings: {
        dotsClass: "my-dots",
        dots: true,
        arrows: false
      }
    }
  ]
});

//Tabs
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });
  
  //More

  function toggleSlide(item){
      $(item).each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
  })
  };
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //Modal

  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function(){
    $('.overlay, #consultation,#thanks ,#order').fadeOut('slow');
  })
  $('.button_itm').on('click', function(){
    $('.overlay, #order').fadeIn();
  });
  $('.button_itm').each(function(i){
    $(this).on('click', function(){
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
    })
  });

  $('.feed-form').validate({
    name: "required",
    phone: "required",
    email: {
      required: true,
      email: true
    },
    messages:{
      name: "Пожалуйста введите свое имя",
      phone:"Пожалуйста введите свой номер телефона",
      email:{
        required: "Пожалуйста введите свой email",
        email:"Провеьте правильность написания email"
      }
    }
  });
  $('#consultation form').validate({
    name: "required",
    phone: "required",
    email: {
      required: true,
      email: true
    },
    messages:{
      name: "Пожалуйста введите свое имя",
      phone:"Пожалуйста введите свой номер телефона",
      email:{
        required: "Пожалуйста введите свой email",
        email:"Провеьте правильность написания email"
      }
    }
  });
  $('#order form').validate({
    name: "required",
    phone: "required",
    email: {
      required: true,
      email: true
    },
    messages:{
      name: "Пожалуйста введите свое имя",
      phone:"Пожалуйста введите свой номер телефона",
      email:{
        required: "Пожалуйста введите свой email",
        email:"Провеьте правильность написания email"
      }
    }
  });
  //Validation
  $('form').validate();
  function validateForms(form){
    $('form').validate({
    name: "required",
    phone: "required",
    email: {
      required: true,
      email: true
    },
    messages:{
      name: "Пожалуйста введите свое имя",
      phone:"Пожалуйста введите свой номер телефона",
      email:{
        required: "Пожалуйста введите свой email",
        email:"Провеьте правильность написания email"
      }
    }
  });
};

  validateForms('#order form');
  validateForms('#consultation form');
  validateForms('#consultation-form');
    
  $('input[name=phone]').mask("+7 (999) 999-99-99")


  $('form').submit(function(e){
    e.preventDefault();
    $.ajax({
      type:"POST",
      url:"mailer/smart.php",
      data: $(this).serialize()
    }).done(function(){
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut('slow');
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });
});
  