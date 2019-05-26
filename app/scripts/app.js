var App = {
  options: {},

  init: function() {
    // this.navMob();
    this.animateScroll();
    this.pricesToggle();
  },

  // navMob: function() {
  //   var btnMenu = document.querySelector(".navigation-mob__btn");
  //   var blockMenu = document.querySelector(".navigation-mob__block");
  //   // var arrow = document.querySelector(".arrow");
  //   var check = 0;
  //   console.log(check);

  //   btnMenu.onclick = () => {
  //     console.log(check);
  //     if (check === 0) {
  //       // если меню скрыто - открыть
  //       blockMenu.style.display = "block";
  //       // arrow.style.transform = "rotate(270deg)";
  //       check = 1;
  //     } else {
  //       // если меню открыто - скрыть
  //       blockMenu.style.display = "none";
  //       // arrow.style.transform = "rotate(90deg)";
  //       check = 0;
  //     }
  //   };

  //   document.querySelector(".navigation-mob__block").onmouseleave = () => {
  //     // скрыть менюшку при уходе мышки
  //     if (window.matchMedia("(max-width: 900px)").matches) {
  //       blockMenu.style.display = "none";
  //       check = 0;
  //       // arrow.style.transform = "rotate(90deg)";
  //     }
  //   };

  //   window.onscroll = function() {
  //     blockMenu.style.display = "none";
  //     check = 0;
  //   };
  // },

  animateScroll: function() {
    $("body").on("click", "a", function(event) {
      var href = event.target.getAttribute("href");
      console.log(href);
      //отменяем стандартную обработку нажатия по ссылке
      if (href.indexOf("tel") != 0 && href.indexOf("mailto") != 0) {
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id = $(this).attr("href"),
          //узнаем высоту от начала страницы до блока на который ссылается якорь

          position = $(id).offset().top;

        if (window.matchMedia("(max-width: 900px)").matches) {
          position = position - 60;

          // arrow.style.transform = "rotate(90deg)";
        }
        console.log(position);

        //анимируем переход на расстояние - top за 1500 мс
        $("body,html").animate({ scrollTop: position }, 1500);
      }
    });
  },

  pricesToggle: function() {
    var animateTime = 300;

    $(".navigation-mob__btn").click(function() {
      // $(".prices__item-spoiler", this).toggleClass(
      //   "prices__item-spoiler--active"
      // );
      if (
        $(this)
          .parents(".navigation-mob")
          .find(".navigation-mob__block")
          .height() === 0
      ) {
        App.autoHeightAnimate(
          $(this)
            .parents(".navigation-mob")
            .find(".navigation-mob__block"),
          animateTime
        );
      } else {
        $(this)
          .parents(".navigation-mob")
          .find(".navigation-mob__block")
          .stop()
          .animate({ height: "0" }, animateTime);
      }
    });

    document.querySelector(".navigation-mob__block").onmouseleave = () => {
      // скрыть менюшку при уходе мышки
      if (window.matchMedia("(max-width: 900px)").matches) {
        $(".navigation-mob__block")
          .stop()
          .animate({ height: "0" }, animateTime);
      }
    };

    window.onscroll = function() {
      // $(this)
      //     .parents(".navigation-mob")
      //     .find(".navigation-mob__block")
      //     .stop()
      //     .animate({ height: "0" }, animateTime);
      $(".navigation-mob__block")
          .stop()
          .animate({ height: "0" }, 0);
    };
  },

  autoHeightAnimate: function(element, time) {
    var curHeight = element.height(),
      autoHeight = 200;
    element.height(curHeight);
    element.stop().animate({ height: autoHeight }, time);
  }
};

$(document).ready(function() {
  App.init();
});
