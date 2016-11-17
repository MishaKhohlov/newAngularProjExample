const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  compass = require('gulp-compass'),
  minifyCSS = require('gulp-minify-css'),
  htmlmin = require('gulp-htmlmin'),
  gcmq = require('gulp-group-css-media-queries'),
  autoprefixer = require('gulp-autoprefixer'),
  gutil = require('gulp-util'),
  ignoreErrors = require('gulp-ignore-errors'),
  named = require('vinyl-named'),
  webpack = require('webpack-stream'),
  reload = browserSync.reload;

const pagesWatch = [
  'build/index.html',
  'build/app/components/company/company.html',
  'build/app/components/careers/careers.html',
  'build/app/components/call_back_form/call_back_form.html',
  'build/app/components/vacancy_description/vacancy_description.html',
  'build/app/components/services/services.html',
  'build/app/components/admin/admin.html',
  'build/app/components/admin_edit/admin_edit.html',
  'build/app/components/edit_section/edit_section.html',
  'build/app/components/work/work.html',
  'build/app/components/work_about/work_about.html',
  'build/app/components/blog/blog.html',
  'build/app/components/blog_about/blog_about.html',
  'build/app/components/contacts/contacts.html',
  'build/app/components/article/article.html'
];

gulp.task('es6', function () {
  gulp.src('build/app/app.js')
    .pipe(named())
    .pipe(webpack(require('./webpack.config.js'), null, function (err, stats) {}))
    .on('error', gutil.log)
    .pipe(gulp.dest('dist/script'))
    .pipe(reload({stream: true}));
});

gulp.task('html', function () {
  gulp.src(pagesWatch)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream: true}));
});

gulp.task('scss',  function () {
  gulp.src('build/app/style/common.scss')
    .pipe(compass({
      sourcemap: true,
      image: 'dist/assets/images/',
      sass: 'build/app/style',
      css: 'dist/style'
    }))
    .on('error', function (error) {
      // Would like to catch the error here
      console.log(error);
      this.emit('end');
    })
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.stream());
});

gulp.task('scss_admin',  function () {
  gulp.src('build/app/style/common_admin.scss')
    .pipe(compass({
      sourcemap: true,
      image: 'dist/assets/images/',
      sass: 'build/app/style',
      css: 'dist/style'
    }))
    .on('error', function (error) {
      // Would like to catch the error here
      console.log(error);
      this.emit('end');
    })
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.stream());
});

gulp.task('language', function () {
  gulp.src('build/app/language/*.json')
    .pipe(gulp.dest('dist/language/'))
    .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    },
    open: false,
    browser: "google chrome",
    reloadDelay: 300
  });
});

const styleCommon = [
  'build/app/style/font/*.scss',
  'build/app/style/mixin/*.scss',
  'build/app/style/variables/*.scss'
];

gulp.task('watch', function () {
  gulp.watch(pagesWatch, ['html']);
  gulp.watch([...styleCommon, 'build/app/style/blocks/*.scss', 'build/app/style/common.scss'], ['scss']);
  gulp.watch([...styleCommon, 'build/app/style/blocks_admin/*.scss', 'build/app/style/common_admin.scss'], ['scss_admin']);
  gulp.watch('dist/assets/images/icons/*.png', ['scss', 'scss_admin']);
  gulp.watch('build/app/language/*.json', ['language']);
  gulp.watch(['build/app/app.html', 'build/app/components/home/home.html', 'build/app/**/*.js'], ['es6']);
});

gulp.task('default', [
  'language',
  'html',
  'scss',
  'scss_admin',
  'es6',
  'browser-sync',
  'watch'
]);
