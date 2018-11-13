//----------------------------------------------------
// gulp: Setting
//----------------------------------------------------

const gulp = require("gulp")
const fs = require("fs")
const del = require("del")
const exec = require("gulp-exec")
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const rename = require("gulp-rename")
const replace = require("gulp-replace")
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
  lib: {
    dir: pjt.setting.lib + "/",
    json2clr: pjt.setting.lib + "/ColorGen/Build/",
    clr2ase: pjt.setting.lib + "/ColorTools-0.3/"
  },
  dist: {
    dir: pjt.setting.dist + "/",
    html: pjt.setting.dist + "/",
    css: pjt.setting.dist + "/css/",
    data: pjt.setting.dist + "/data/",
    swatches: pjt.setting.dist + "/swatches/"
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

// SCSS > Stylus
gulp.task("scss2stylus", () => {
  return gulp
    .src(paths.src.scss + "tone/_" + pkg.name + ".scss")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(replace(/\:/g, " ?="))
    .pipe(replace(/ \!default\;/g, ""))
    .pipe(
      rename({
        extname: ".styl"
      })
    )
    .pipe(gulp.dest(paths.src.stylus + "./tone/"))
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

gulp.task("sass-export", () => {
  return gulp
    .src(paths.src.scss + "tone/_" + pkg.name + ".scss")
    .pipe(
      exec(
        "sass-export " +
          paths.src.scss +
          "tone/_" +
          pkg.name +
          ".scss" +
          " -o " +
          paths.dist.data +
          pkg.name +
          "-data.json" +
          " -a"
      )
    )
    .pipe(exec.reporter())
})

gulp.task("data-replace", () => {
  return gulp
    .src(paths.dist.data + pkg.name + "-data.json")
    .pipe(replace(/\$/g, ""))
    .pipe(replace(/-/g, " "))
    .pipe(replace(/.*\"value\"[\s\S]*?\,\n/g, ""))
    .pipe(replace(/compiledValue/g, "color"))
    .pipe(replace(/whitesmoke/g, "#f5f5f5"))
    .pipe(replace(/\"hex\"\: \"black\"/g, '"hex": "#000000"'))
    .pipe(replace(/\"hex\"\: \"white\"/g, '"hex": "#ffffff"'))
    .pipe(
      rename({
        basename: pkg.name + "-data-out"
      })
    )
    .pipe(gulp.dest(paths.dist.data))
})

gulp.task("json2clr", () => {
  return gulp
    .src(paths.dist.data + pkg.name + "-data-out.json")
    .pipe(
      exec(
        paths.lib.json2clr +
          "ColorGen -i " +
          paths.dist.data +
          pkg.name +
          "-data-out.json -o " +
          paths.dist.swatches +
          pkg.name +
          ".clr"
      )
    )
    .pipe(exec.reporter())
})

gulp.task("clr2ase", () => {
  return gulp
    .src(paths.dist.swatches + pkg.name + ".clr")
    .pipe(gulp.dest(paths.lib.clr2ase))
    .pipe(
      exec("cd ./" + paths.lib.clr2ase + "&& ./Clr2Ase " + pkg.name + ".clr")
    )
    .pipe(exec.reporter())
})

gulp.task("copy-ase", () => {
  return gulp
    .src(paths.lib.clr2ase + pkg.name + ".ase")
    .pipe(gulp.dest(paths.dist.swatches))
})

gulp.task("clean-tmp", function(done) {
  del([
    paths.lib.clr2ase + pkg.name + ".clr",
    paths.lib.clr2ase + pkg.name + ".ase"
  ])
  done()
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
  gulp.watch(
    paths.src.scss + "**/*.scss",
    gulp.series("scss", "scss2stylus", "reload")
  )
  gulp.watch(paths.src.stylus + "**/*.styl", gulp.series("stylus", "reload"))
})

gulp.task("default", gulp.parallel("browser-sync", "watch"))

//----------------------------------------------------
// gulp: Build
//----------------------------------------------------

gulp.task(
  "build",
  gulp.parallel(
    gulp.series("scss", "scss2stylus", "stylus"),
    gulp.series(
      "sass-export",
      "data-replace",
      "json2clr",
      "clr2ase",
      "copy-ase",
      "clean-tmp"
    )
  )
)
