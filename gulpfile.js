//----------------------------------------------------
// gulp: Setting
//----------------------------------------------------

const gulp = require("gulp")
const fs = require("fs")
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const rename = require("gulp-rename")
const sass = require("gulp-sass")
const stylus = require("gulp-stylus")
const browserSync = require("browser-sync")

// Read File
const files = {
  pkg: "./package.json",
  pjt: "./project.json"
}
const pkg = JSON.parse(fs.readFileSync(files.pkg))
const pjt = JSON.parse(fs.readFileSync(files.pjt))

// Paths
const paths = {
  src: {
    dir: pjt.setting.src + "/",
    scss: pjt.setting.src + "/scss/",
    stylus: pjt.setting.src + "/stylus/"
  },
  dist: {
    dir: pjt.setting.dist + "/",
    html: pjt.setting.dist + "/",
    css: pjt.setting.dist + "/css/"
  }
}

// Sass Options
const sassOptions = {
  outputStyle: "expanded",
  includePaths: "./node_modules/"
}

// Stylus Options
const stylusOptions = {
  compress: false,
  include: "./node_modules/"
}

// BrowserSync Options
const browserSyncOptions = {
  server: {
    baseDir: paths.dist.html
  },
  startPath: "index.html",
  open: false,
  notify: false
}

//----------------------------------------------------
// gulp: Task
//----------------------------------------------------

// SCSS > CSS
gulp.task("scss", () => {
  return gulp
    .src(paths.src.scss + "**/*.scss")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sass(sassOptions))
    .pipe(gulp.dest(paths.dist.css))
})

// Stylus > CSS
gulp.task("stylus", () => {
  return gulp
    .src([
      paths.src.stylus + "**/*.styl",
      "!" + paths.src.stylus + "**/_*.styl"
    ])
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(stylus(stylusOptions))
    .pipe(gulp.dest(paths.dist.css))
})

// Browser Sync
gulp.task("browser-sync", function(done) {
  browserSync.init(browserSyncOptions)
  done()
})

gulp.task("reload", function(done) {
  browserSync.reload()
  done()
})

// Watch
gulp.task("watch", () => {
  gulp.watch(paths.dist.html + "index.html", gulp.series("reload"))
  gulp.watch(paths.src.scss + "**/*.scss", gulp.series("scss", "reload"))
  gulp.watch(paths.src.stylus + "**/*.styl", gulp.series("stylus", "reload"))
})

gulp.task("default", gulp.parallel("browser-sync", "watch"))

//----------------------------------------------------
// gulp: Build
//----------------------------------------------------

gulp.task("build", gulp.parallel(gulp.series("scss", "stylus")))
