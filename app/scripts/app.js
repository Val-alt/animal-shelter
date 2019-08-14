var App = {
  options: {},

  init: function() {
    this.navMob();
    this.animateScroll();
    this.navSticky();
    this.carousel1 = this.carousel();
  },


  animateScroll: function() {
    $("body").on("click", "a", function(event) {
      var href = event.target.getAttribute("href");
      console.log(href);
      //отменяем стандартную обработку нажатия по ссылке
      if (
        href.indexOf("tel") != 0 &&
        href.indexOf("mailto") != 0 &&
        !(href.indexOf("html") !== -1)
      ) {
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id = $(this).attr("href"),
          //узнаем высоту от начала страницы до блока на который ссылается якорь

          position = $(id).offset().top - 60;

        if (window.matchMedia("(max-width: 900px)").matches) {
          position = position - 10;
        }
        console.log(position);

        //анимируем переход на расстояние - top за 1500 мс
        $("body,html").animate({ scrollTop: position }, 1500);
      }
    });
  },

  navMob: function() {
    var animateTime = 300;

    $(".nav-mob__btn").click(function() {
      if (
        $(this)
          .parents(".nav-mob")
          .find(".nav-mob__block")
          .height() === 0
      ) {
        App.autoHeightAnimate(
          $(this)
            .parents(".nav-mob")
            .find(".nav-mob__block"),
          animateTime
        );
        $(".nav-mob__btn").css("background-image", "url(../images/close.png)");
      } else {
        $(this)
          .parents(".nav-mob")
          .find(".nav-mob__block")
          .stop()
          .animate({ height: "0" }, animateTime);
          $(".nav-mob__btn").css("background-image", "url(../images/menu.png)");
      }
    });

    document.querySelector(".nav-mob__block").onmouseleave = () => {
      // скрыть менюшку при уходе мышки
      if (window.matchMedia("(max-width: 900px)").matches) {
        $(".nav-mob__block")
          .stop()
          .animate({ height: "0" }, animateTime);
          $(".nav-mob__btn").css("background-image", "url(../images/menu.png)");
      }
    };

    window.onscroll = function() {
      $(".nav-mob__block")
        .stop()
        .animate({ height: "0" }, 0);
        $(".nav-mob__btn").css("background-image", "url(../images/menu.png)");
    };
  },

  autoHeightAnimate: function(element, time) {
    var curHeight = element.height(),
      autoHeight = 200;
    element.height(curHeight);
    element.stop().animate({ height: autoHeight }, time);
  },

  carousel: function() {
    if (window.matchMedia("(max-width: 500px)").matches) {
      var qwe ="";
      for (var i=1; i<50; i=i+2) {
        qwe +="<div><img src='images/cats/1 (" + i + ").jpg'/></div><div><img src='images/cats/1 (" + (i+1) + ").jpg'/></div>";
      }
    
      $('.owl-carousel').html(qwe);
    }

    var owl = $(".owl-carousel");
    owl.owlCarousel({
      items: 4,
      margin: 10,
      loop: true,
      nav: true,
      autoplay : true,
      navText: [
        '<img src="../images/arrow.png" alt="Назад" />',
        '<img src="../images/arrow.png" alt="Вперед" />'
      ],
      responsive: {
        0: {
          items: 1,
          autoplay : false
        },
        450: {
          items: 2,
          autoplay : false
        },
        700: {
          items: 3
        },
        918: {
          items: 4
        }
      }
    });
  },

  navSticky: function() {
    $(window).scroll(function() {
      var animateTime = 200;
      if ($(".main-page").length) {
        if ($(this).scrollTop() > 660) {
          if ($(".nav-sticky").height() === 0) {
            autoHeightAnimate($(".nav-sticky"), animateTime);
          }
        } else {
          $(".nav-sticky")
            .stop()
            .animate({ height: "0" }, 150);
        }
      }
    });

    function autoHeightAnimate(element, time) {
      var curHeight = element.height(),
        autoHeight = 72;
      element.height(curHeight);
      element.stop().animate({ height: autoHeight }, time);
    }
  }

};

$(document).ready(function() {
  App.init();
});
