window.addEventListener("load", function() {
  var ad = (function() {
    var CONST = {
      CSS_CLASS: {
        SHOW: "show",
        HIDE: "hide",
        SHOW_BACKGROUND: "show-background"
      }
    };
    var adContainer = document.getElementById("aw_ad");
    var logo = document.getElementsByClassName("aw_top-banner_logo")[0];
    var slides = document.getElementsByClassName("aw_slide");

    var init = function() {
      logo.classList.add(CONST.CSS_CLASS.SHOW);
    };

    var showSlide = function(index) {
      setTimeout(function() {
        index > 0
          ? slides[index - 1].classList.replace(
              CONST.CSS_CLASS.SHOW,
              CONST.CSS_CLASS.HIDE
            )
          : null;
        slides[index].classList.add(CONST.CSS_CLASS.SHOW);
        if (index === slides.length - 1) {
          adContainer.classList.add(CONST.CSS_CLASS.SHOW_BACKGROUND);
        }
      }, 2500 * index + 1000);
    };

    var run = function() {
      init();
      var i;
      for (i = 0; i < slides.length; i++) {
        showSlide(i);
      }
    };

    return {
      run: run
    };
  })();

  ad.run();
});
