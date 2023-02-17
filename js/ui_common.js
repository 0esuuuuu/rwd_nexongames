$(function () {
  $('#header .gnb_wrap').on('mouseenter', function () {
    $('#header').addClass('on');
    $(this).find('.depth02').stop().fadeIn(500);
  });

  $('#header .gnb_wrap').on('mouseleave', function () {
    $('#header').removeClass('on');
    $(this).find('.depth02').hide();
  });

  $('#header .btn_open').on('click', function (e) {
    e.preventDefault();
    $('  #header .m_gnb_area').addClass('on');
    $('.dimmed').show();
  });
  $('#header .btn_close, .dimmed').on('click', function () {
    $('  #header .m_gnb_area').removeClass('on');
    $('.dimmed').hide();
  });

  // 모바일 gnb
  $('#header .m_gnb_wrap .m_gnb>li>a').on('click', function (e) {
    e.preventDefault();

    if (!$(this).next().is(':visible')) {
      $(this).parent().toggleClass('on').siblings().removeClass('on');
      $(this).next().slideDown().parent().siblings().find('.depth02').slideUp();
    } else {
      $(this).parent().removeClass('on');
      $(this).next().slideUp();
    }
  });

  // 메인 비디오 슬라이더
  // 가독성과 지역변수로 선언하기 위해 함수로 묶음
  function mainVideoSlider() {
    var mainSlider = new Swiper('.main_slider', {
      loop: true,
      autoplay: {
        delay: 16000,
        disableOnInteraction: false,
      },

      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },

      navigation: {
        nextEl: '.swiper-button-next',
      },
      // 여기서 on은 스와이퍼 슬라이더의 문법임
      // slideChange는 나중에 슬라이드가 체인지 될때 발생함
      // slideChangeTransitionStart는 슬라이드가 이동되기전에 발생함
      on: {
        // 슬라이드가 변하기시작할 때 바로 실행
        slideChangeTransitionStart: function () {
          // 영상 무조건 처음부터 실행
          // 선택된(active된)영상에서 자바스크립트를 제이쿼리에서 건들기 위해 배열 속성 0번째 선택
          $('.main_slider .swiper-slide-active video')[0].currentTime = 0;
          $('.main_slider .swiper-slide-active video')[0].play();
        },
        // 현재페이지
        // slideChangeTransitionStart 에서는 realindex값이 잡히지 않아서 slidechange에서 함
        slideChange: function () {
          if (mainSlider.realIndex + 1 < 10) {
            $('.main_slider .current').text('0' + (mainSlider.realIndex + 1));
          } else {
            $('.main_slider .current').text(mainSlider.realIndex + 1);
          }

          // loop모드는 realIndex를 가져옴 / 초기화코드 다음에 올 수 있음
          $('.main_slider .current').text('0' + (mainSlider.realIndex + 1));
        },
      },
    });

    // 페이지 네이션이 하나만 가능해서 따로 만들어줌
    // 메인비디오슬라이더 페이징
    // loop 모드일 경우 :not 복제된 슬라이더를 제외한 갯수를 가져옴
    // 토탈페이지
    var total = $('.main_slider .swiper-slide:not(.swiper-slide-duplicate)').length;

    // 10부터는 앞에 0을 붙이지 않게 처리
    var newTotal = total < 10 ? '0' + total : total;

    $('.main_slider .total').text(newTotal);
  }
  mainVideoSlider();

  // interview슬라이더
  var interviewSlider = new Swiper('.interview_slider', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // 탑버튼
  $('#footer .top_wrap .btn_top').on('click', function (e) {
    e.preventDefault();
    $('body, html').animate({ scrollTop: 0 }, 500);
  });
});
