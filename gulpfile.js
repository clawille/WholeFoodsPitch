var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jade = require('gulp-jade'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    data = require('gulp-data'),
    path = require('path'),
    fs = require('fs'),
    del = require('del');

var outputDir = 'dist',
    jadeSources = ['site/templates/**/*.jade'],
    jsSources = ['site/js/*.js'],
    cssSources = ['site/css/**/*.css'],
    videosSources = ['site/videos/**/*.mp4'],
    filesSources = ['site/files/**/*'],
    sassSources = ['site/sass/*.scss'],
    imagesSources = ['site/images/**/*.+(png|jpg|jpeg|gif|svg)'],
    fontsSources = ['site/fonts/**/*'];

gulp.task('copy', function() {
    gulp.src('index.html')
        .pipe(gulp.dest(outputDir))
});

gulp.task('jade', function() {
    gulp.src(jadeSources)
        .pipe(data(function(file) {
            var team = JSON.parse(fs.readFileSync('./site/data/team.json'));
            var work = JSON.parse(fs.readFileSync('./site/data/work.json'));
            var contact = JSON.parse(fs.readFileSync('./site/data/contact.json'));

            return {
                timestamp: + new Date(),
                team: team,
                clients: {},
                work: work,
                rfp: {},
                contact: contact,
            };
        }))
        .pipe(jade())
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
});

gulp.task('sass', function() {
    gulp.src(sassSources)
        .pipe(sass({outputStyle: 'extended'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(outputDir+'/css'))
        .pipe(connect.reload())
});

gulp.task('css', function() {
    return gulp.src(cssSources)
        .pipe(gulp.dest(outputDir+'/css'))
});

gulp.task('images', function(){
    return gulp.src(imagesSources)
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest(outputDir+'/images'))
});

gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(outputDir+'/js'))
        .pipe(connect.reload())
});

gulp.task('fonts', function() {
    return gulp.src(fontsSources)
        .pipe(gulp.dest(outputDir+'/fonts'))
});

gulp.task('videos', function() {
    return gulp.src(videosSources)
        .pipe(gulp.dest(outputDir+'/videos'))
});

gulp.task('files', function() {
    return gulp.src(filesSources)
        .pipe(gulp.dest(outputDir+'/files'))
});

gulp.task('watch', function() {
    gulp.watch(jadeSources, ['jade']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['sass']);
});

gulp.task('connect', function() {
    connect.server({
        root: '.',
        livereload: true
    })
});

gulp.task('clean:dist', function() {
    return del.sync(outputDir);
});

gulp.task('default', ['clean:dist', 'jade', 'js', 'css', 'sass', 'images', 'fonts', 'videos', 'files', 'connect', 'watch']);
