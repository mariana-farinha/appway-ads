const { src, dest, parallel, series, watch } = require("gulp");
const clean = require("gulp-clean");
const panini = require("panini");
const browser = require("browser-sync");
const fs = require("fs");

function cleanup() {
  return src("dist", { read: false, allowEmpty: true }).pipe(clean());
}

// Reset Panini's cache of layouts and partials
function resetCache(done) {
  panini.refresh();
  done();
}

function html() {
  return src("src/ads/**/*.html")
    .pipe(
      panini({
        root: "src",
        layouts: "src/layouts",
        data: "src/data",
        partials: "src/partials"
      })
    )
    .pipe(dest("dist/ads"));
}

function css() {
  return src("src/css/**/*.css").pipe(dest("dist/css"));
}

function js() {
  return src("src/js/**.js").pipe(dest("dist/js"));
}

function images() {
  return src("src/images/**/*").pipe(dest("dist/images"));
}

// Start a server with LiveReload to preview the site in
function server(done) {
  browser.init({
    server: {
      baseDir: "dist",
      directory: true
    }
  });
  done();
}

// Watch for file changes
function watchFiles() {
  watch("src/ads/**/*.html").on("all", series(html, browser.reload));
  watch("src/layouts/**/*").on("all", series(resetCache, html, browser.reload));
  watch("src/partials/**/*").on(
    "all",
    series(resetCache, html, browser.reload)
  );
  watch("src/data/*").on("all", series(resetCache, html, browser.reload));
  watch("src/css/**/*.css").on("all", series(css, browser.reload));
  watch("src/images/**/*").on("all", series(images, browser.reload));
}

exports.build = series(resetCache, cleanup, parallel(html, css, js, images));
exports.default = series(
  resetCache,
  cleanup,
  parallel(html, css, js, images),
  server,
  watchFiles
);
