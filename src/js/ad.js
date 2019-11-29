window.addEventListener("load", function() {
  // Appway Ad Module
  var ad = (function() {
    // Constant Values
    var CONST = {
      CSS_CLASS: {
        SHOW: "aw_slide--show",
        HIDE: "aw_slide--hide",
        LAST_SLIDE: "aw_slide--last"
      }
    };

    // HTML Elements of interest
    var adContainer = document.getElementById("aw_ad");
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
        adContainer.className += " " + CONST.CSS_CLASS.LAST_SLIDE;
      } else {
        replaceCssClassName(adContainer, CONST.CSS_CLASS.LAST_SLIDE, "");
      }

      index++;

      if (index === slides.length) {
        return;
      }

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
