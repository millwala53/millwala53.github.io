$(document).ready(function(){

  // MODAL
  var modalText = {
    hireninja: {
      title: 'Hireninja.com',
      tag: 'Hire the right Coding Ninjas efficiently.',
      detail: 'HireNinja offers pre-screened Coding Ninjas, so your project gets the best talent in the shortest time, yielding highest code quality.',
      link: 'http://hireninja.com'
    },
    myndplan: {
      title: 'Myndplan',
      tag: 'A plan for better mental health',
      detail: 'A simple and free service designed to help you explore, understand, and improve your mental health. It helps mental health professionals to get access to user emotions, health history and analyze the data provided.',
      link: 'http://myndplan.com'
    },
    movermap: {
      title: 'MoverMap',
      tag: 'Lead Generation System;',
      detail: 'Easily update your map to receive leads in your accepted pickups & deliveries through a visual map. Keep us updated on the leads you want only in the routes you move.',
      link: 'https://movermap.irelo.com/'
    },
    e2e: {
      title: 'Easy2Employ',
      tag: 'Hiring made easy',
      detail: 'E2E is an online web based solution to efficiently maintain resume database, track the interviews and to maintain ongoing coordination with the candidates. HR ensures that all the hiring needs are filled through use of this system. It is the starting point of an employee’s entry to the organization.',
    },
    topalarm: {
      title: 'Top Alarm Systems Compare',
      tag: 'The Best Home Security Systems of 2018',
      detail: 'Find your home security system with Topalarms so you can skip the hassle of quotes, consultations, and months of uncertainty.',
      link: 'https://topalarmcompanies.com/'
    },
    yasafri: {
      title: 'Y.A Safri Associates',
      tag: 'PROVIDING ALL KINDS OF ARCHITECTURAL SERVICES',
      detail: 'The firm Y.A SAFRI ASSOCIATES, formerly Y.A Safri and Company was established in the year 1948 as a small private consulting Company. However, with increasing demand of its Professional Services, an excellent Professional-Client relationship, and along with its progressive outlook the firm gradually expanded to provide a better and complete service for its clients. Now the firm has a complete in-house facility to provide a wide range of professional multi-disciplinary services.',
      link: 'https://yasafri.herokuapp.com/#/'
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".png') no-repeat center center/contain",
        backgroundSize: 'contain'
      });
              
    });
  }
})
