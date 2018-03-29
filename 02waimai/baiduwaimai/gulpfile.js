const gulp =require('gulp');

const less=require('gulp-less');
const lessChanged = require('gulp-less-changed');
gulp.task('distTask',function(){
	gulp.src('src/**/*.*')
	//将less转成css gulp-less
	.pipe(gulp.dest('dist/'))
})

gulp.task('less2css',function(){
	gulp.src('src/less/*.less')
	//将less转成css gulp-less
	.pipe(lessChanged())
	.pipe(less())
	.pipe(gulp.dest('dist/css/'))
})
gulp.task('multiLess',function(){
	gulpMultiProcess('less2css',function () {
		
	})
})
gulp.task('default',function () {
	gulp.watch('src/**/*.*',['less2css','distTask']);
})

const connect=require('gulp-connect');
//定义一个http服务,默认监听8080端口
gulp.task('server',function(){
	connect.server({
	    root: 'dist',
	    port:'8899',
	    livereload: true
	  });
	gulp.watch('dist/**/*.*',['reload']);
})

gulp.task('reload',function(){
	gulp.src('dist/**/*.*')
	.pipe(connect.reload());
})