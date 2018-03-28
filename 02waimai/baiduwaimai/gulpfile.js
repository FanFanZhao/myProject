const gulp =require('gulp');

const less=require('gulp-less');
gulp.task('dist',function(){
	// gulp.src(['src/**/*.*','!src/less/*.*'])
	gulp.src('src/**/*.*')
	//将less转成css gulp-less
	.pipe(gulp.dest('dist/'))
})

gulp.task('less2css',function(){
	gulp.src('src/less/*.less')
	//将less转成css gulp-less
	.pipe(less())
	.pipe(gulp.dest('dist/css/'))
})

gulp.task('default',function () {
	gulp.watch('src/**/*.*',['dist','less2css']);
})

const connect=require('gulp-connect');
//定义一个http服务,默认监听8080端口
gulp.task('server',function(){
	connect.server({
	    root: 'dist',
	    port:'8889',
	    livereload: true
	  });
	gulp.watch('dist/**/*.*',['reload']);
})

gulp.task('reload',function(){
	gulp.src('dist/**/*.*')
	.pipe(connect.reload());
})