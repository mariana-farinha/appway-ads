window.addEventListener("load", function() {
  // Appway Ad Module
  var ad = (function() {
    // Constant Values
    var CONST = {
      CSS_CLASS: {
        SHOW: " show ",
        HIDE: " hide ",
        LAST_SLIDE: " last-slide "
      }
    };

    // HTML Elements of interest
    var adContainer = document.getElementById("aw_ad");
    var logo = document.getElementsByClassName("aw_top-banner_logo")[0];
    var slides = document.getElementsByClassName("aw_slide");

    // Exposes the config obj
    var getConfig = function() {
      return CONST;
    };

    // Utility to replace a css class name by another
    var replaceCssClassName = function(element, target, replacement) {
      element.className = element.className.replace(target, replacement);
    };

    // Logic to run the slide show
    var showSlide = function(index) {
      replaceCssClassName(
        slides[index],
        CONST.CSS_CLASS.HIDE,
        CONST.CSS_CLASS.SHOW
      );

      if (index === slides.length - 1) {
        adContainer.className += CONST.CSS_CLASS.LAST_SLIDE;
      } else {
        replaceCssClassName(adContainer, CONST.CSS_CLASS.LAST_SLIDE, "");
      }

      index++;

      setTimeout(function() {
        replaceCssClassName(
          slides[index - 1],
          CONST.CSS_CLASS.SHOW,
          CONST.CSS_CLASS.HIDE
        );
        showSlide(index % slides.length);
      }, 3500);
    };

    // Run the add
    var run = function() {
      showSlide(0);
    };

    return {
      run: run,
      getConfig: getConfig
    };
  })();

  ad.run();
});
