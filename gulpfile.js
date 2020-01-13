const { src, dest, parallel, series, watch } = require("gulp");
const panini = require("panini");
const browser = require("browser-sync");
const glob = require("glob");
const path = require("path");
const plugins = require("gulp-load-plugins");
const yargs = require("yargs");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const $ = plugins({ camelize: true });
const PRODUCTION = !!yargs.argv.production; // Convert to boolean value

// Outputs an array of our campaign names (e.g. scorpio-campaign, client-onboarding)
const campaignNames = (function() {
  // Synchronous glob search
  return glob.sync("src/ads/*").map(function(filename) {
    return filename.replace("src/ads/", "");
  });
})();

// Outputs an array of the target directory names for each build
const targetDirnames = (function() {
  // Synchronous glob search
  return glob.sync("src/ads/**/*.html").map(function(filename) {
    var dir = path.dirname(filename).replace("src", "dist");
    return dir + "/" + path.basename(filename, ".html");
  });
})();

// Bring folder structure back to its initial state
function clean() {
  return src(["dist", "zip"], { read: false, allowEmpty: true }).pipe(
    $.clean()
  );
}

// Reset Panini's cache of layouts and partials
function resetCache(done) {
  panini.refresh();
  done();
}

// Compile Panini templates, partials, data and layouts into html
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
    .pipe(
      $.rename(function(path) {
        path.dirname += "/" + path.basename;
      })
    )
    .pipe($.htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist/ads"));
}

// Handle sass compilation
sass.compiler = require("node-sass");

function sass() {
  const plugins = [autoprefixer(), cssnano()];
  return src("src/sass/**/*.scss")
    .pipe($.sass().on("error", $.sass.logError))
    .pipe($.postcss(plugins))
    .pipe(
      $.multiDest(
        targetDirnames.map(function(dir) {
          return dir + "/css";
        })
      )
    );
}

// Handle JavaScript files
function js() {
  return src("src/js/**.js")
    .pipe($.babel())
    .pipe($.if(PRODUCTION, $.uglify()))
    .pipe(
      $.multiDest(
        targetDirnames.map(function(dir) {
          return dir + "/js";
        })
      )
    );
}

// Handle image files
function images() {
  return src("src/images/**/*")
    .pipe($.if(PRODUCTION, $.imagemin()))
    .pipe(
      $.multiDest(
        targetDirnames.map(function(dir) {
          return dir + "/images";
        })
      )
    );
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
  watch("src/sass/**/*.scss").on("all", series(sass, browser.reload));
  watch("src/images/**/*").on("all", series(images, browser.reload));
}

function zip(done) {
  campaignNames.forEach(function(campaignName) {
    src("dist/ads/" + campaignName + "/**")
      .pipe($.zip(campaignName + ".zip"))
      .pipe(dest("zip"));
  });
  done();
}

// Gulp tasks
exports.zip = series(resetCache, clean, parallel(html, sass, js, images), zip);
exports.build = series(resetCache, clean, parallel(html, sass, js, images));
exports.default = series(
  resetCache,
  clean,
  parallel(html, sass, js, images),
  server,
  watchFiles
);
