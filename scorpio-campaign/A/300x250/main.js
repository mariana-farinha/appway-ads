window.addEventListener("load", function() {
  var ad = (function() {
    var CONST = {
      CSS_CLASS: {
        SHOW: " show ",
        HIDE: " hide ",
        SHOW_BACKGROUND: " show-background "
      }
    };
    var adContainer = document.getElementById("aw_ad");
    var logo = document.getElementsByClassName("aw_top-banner_logo")[0];
    var slides = document.getElementsByClassName("aw_slide");

    var init = function() {
      logo.className += CONST.CSS_CLASS.SHOW;
    };

    var replaceCssClassName = function(element, target, replacement) {
      element.className = element.className.replace(target, replacement);
    };

    var showSlide = function(index) {
      replaceCssClassName(
        slides[index],
        CONST.CSS_CLASS.HIDE,
        CONST.CSS_CLASS.SHOW
      );

      if (index === slides.length - 1) {
        adContainer.className += CONST.CSS_CLASS.SHOW_BACKGROUND;
      } else {
        replaceCssClassName(adContainer, CONST.CSS_CLASS.SHOW_BACKGROUND, "");
      }

      index++;

      setTimeout(function() {
        replaceCssClassName(
          slides[index - 1],
          CONST.CSS_CLASS.SHOW,
          CONST.CSS_CLASS.HIDE
        );
        showSlide(index % slides.length);
      }, 2500);
    };

    var run = function() {
      init();
      showSlide(0);
    };

    return {
      run: run
    };
  })();

  ad.run();
});
