var gulp = require('gulp');

var nodemon = require('gulp-nodemon');

var gulpMocha = require('gulp-mocha');

var env = require('gulp-env');

var sypertest = require('supertest');


//default
gulp.task('default', function() {
  nodemon({
  	script : 'app.js',
  	ext : 'js',
  	env : {
  		PORT:8000
  	},
  	ignore : ['./node_modules/**']

  }).on('restart', function(){
  	console.log('Restarting');

  });
});


//tests
gulp.task('test', function() {
	env({vars : {ENV : 'Test'}});
 gulp.src('tests/*.js', {read : false})
 		.pipe(gulpMocha({reporter : 'nyan'}));
});