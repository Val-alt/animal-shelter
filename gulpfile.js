var gulp = require("gulp"),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  prefixer = require("gulp-autoprefixer"),
  newer = require("gulp-newer"),
  cssmin = require("gulp-cssnano"),
  imagemin = require("gulp-imagemin"),
  uglify = require("gulp-uglify"),
  browserSync = require("browser-sync"),
  del = require("del");

var paths = { src: "app/", dist: "dist/" },
  src = {
    sass: paths.src + "sass/**/**/*.+(scss|sass|less)",
    js: paths.src + "scripts/**/*.js",
    images: paths.src + "images/**/*",
    fonts: paths.src + "fonts/**/*"
  },
  dist = {
    sass: paths.dist + "styles",
    js: paths.dist + "scripts",
    images: paths.dist + "images",
    fonts: paths.dist + "fonts"
  };

gulp.task("sass", function() {
  return gulp
    .src(["app/libs/**/*.css", "app/sass/app.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("main.min.css"))
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(gulp.dest(dist.sass));
});

gulp.task("js", function() {
  return gulp
    .src(["app/libs/**/*.js", src.js])
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest(dist.js));
});

gulp.task("images", function() {
  return gulp
    .src(src.images)
    .pipe(newer(dist.images))
    .pipe(imagemin())
    .pipe(gulp.dest(dist.images));
});

gulp.task("fonts", function() {
  return gulp
    .src(src.fonts)
    .pipe(newer(dist.fonts))
    .pipe(gulp.dest(dist.fonts));
});

gulp.task("html", function() {
  return gulp
    .src("app/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.reload({ stream: true }));
});

// очистка папки с готовым проектом
gulp.task("clean", function() {
  return del.sync("dist");
});

gulp.task(
  "build",
  gulp.parallel("clean", "html", "sass", "js", "images", "fonts")
);

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "dist"
    }
  });
});

gulp.task(
  "default",
  gulp.parallel("browser-sync", function() {
    gulp
      .watch("app/*.html", gulp.parallel("html"))
      .on("change", browserSync.reload);
    gulp
      .watch(src.sass, gulp.parallel("sass"))
      .on("change", browserSync.reload);
    gulp.watch(src.js, gulp.parallel("js")).on("change", browserSync.reload);
    gulp
      .watch(src.images, gulp.parallel("images"))
      .on("change", browserSync.reload);
    gulp
      .watch(src.fonts, gulp.parallel("fonts"))
      .on("change", browserSync.reload);
  })
);
