const gulp = require('gulp');
const rimraf = require('rimraf');
const header = require('gulp-header');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');

gulp.task('build:clean', function(done) {
	rimraf('./dist/*', done);
});

gulp.task('build:css', function(done) {
	gulp.src('./src/loadingScreen.css')
		.pipe(cleanCSS())
		.pipe(header('/*! loadingScreen stylesheet ~ (c)2018 Federico Tibaldo ~ MIT license */'))
		.pipe(rename('loadingScreen.min.css'))
		.pipe(gulp.dest('./dist'));
	done();
});

gulp.task('build:js', function(done) {
	gulp.src('./src/loadingScreen.js')
		.pipe(babel({
			presets: ['es2015-nostrict'],
			plugins: ['babel-plugin-minify-mangle-names'],
			minified: true,
			comments: false
		}))
		.pipe(header('/*! loadingScreen ~ (c)2018 Federico Tibaldo ~ MIT license */'))
		.pipe(rename('loadingScreen.min.js'))
		.pipe(gulp.dest('./dist'));
	done();
});

gulp.task('build:all', gulp.series( 'build:clean', gulp.parallel( 'build:css', 'build:js' ) ));