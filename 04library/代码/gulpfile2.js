const gulp =require('gulp');
gulp.task('hello',function(){
	console.log('say hello')
});
//拷贝文件
gulp.task('copy',function(){
	//获取文件
	gulp.src('src/index.html')
	.pipe(gulp.dest('dist/'));
});
gulp.task('copyAll',function(){
	//获取src目录下边的文件
	gulp.src('src/*.*')
	.pipe(gulp.dest('dist/'))
})
gulp.task('copyAllAll',function(){
	//获取src目录下边的第一级目录中的文件
	gulp.src('src/*/*.*')
	.pipe(gulp.dest('dist/'))
});
gulp.task('copyall',function(){
	gulp.src('src/**/*.*')
	.pipe(gulp.dest('dist/'))
})
//拷贝多个文件夹
gulp.task('arr',function(){
	gulp.src(['src/**/*.*','src2/**/*.*'])
	.pipe(gulp.dest('arr/'))
})
//拷贝多个文件夹内容，排除某一项
gulp.task('arr2',function(){
	gulp.src(['src/**/*.*','src2/**/*.*','!src/js/index.js'])
	.pipe(gulp.dest('arr3'))
})
gulp.task('arr3',function(){
	gulp.src(['src/**/*.*','src2/**/*.*','!src/js/*.*'])
	.pipe(gulp.dest('arr4'))
})
//引入less
const less=require('gulp-less');
gulp.task('style',function(){
	gulp.src('src/**/*.less')
	//将less转成css gulp-less
	.pipe(less())
	.pipe(gulp.dest('style/'))
})

gulp.task('default',function () {
	gulp.watch('src/*',['style']);
})
const connect=require('gulp-connect');
//定义一个http服务,默认监听8080端口
gulp.task('server',function(){
	connect.server({
	    root: 'public',
	    port:'8889',
	    livereload: true
	  });
	gulp.watch('public/**/*.*',['reload']);
})

gulp.task('reload',function(){
	gulp.src('public/**/*.*')
	.pipe(connect.reload());
})