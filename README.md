gulp使用方法：
 
 已经安装node、npm
 参考http://www.gulpjs.com.cn/ 官网


 安装gulp命令：
 npm install --global gulp //全局安装
 npm install gulp 或者npm install --save-dev gulp //在项目里面安装gulp,自动生成node_modules，和package.json

 简单应用：
 在项目里创建名为gulpfile.js的文件
 	var gulp = require('gulp');
 	
 	示例1: 
 	gulp.task('default', function() {
 		<!-- 将你的默认代码放进去 -->
 		console.log('gulp 运行成功！')；
 	})；	

 	示例2:
 	<!-- 需要什么gulp插件就安装
 		npm install gulp-coffee --save-dev	
 	-->
 	var gulp = require('gulp');
	var coffee = require('gulp-coffee');
	var concat = require('gulp-concat');
	var uglify = require('gulp-uglify');
	var imagemin = require('gulp-imagemin');
	var sourcemaps = require('gulp-sourcemaps');
	var del = require('del');

 	<!-- Gulp的核心API只有4个：src、dest、task、watch
		gulp.src(globs[, options])：指明源文件路径 globs：路径模式匹配； options：可选参数；
		gulp.dest(path[, options])：指明处理后的文件输出路径 path：路径（一个任务可以有多个输出路径）； options：可选参数；
		gulp.task(name[, deps], fn)：注册任务 name：任务名称（通过 gulp name 来执行这个任务）； deps：可选的数组，在本任务运行中所需要所依赖的其他任务（当前任务在依赖任务执行完毕后才会执行）； fn：任务函数（function方法）；
		gulp.watch(glob [, opts], tasks)：监视文件的变化并运行相应的任务 glob：路径模式匹配； opts：可以选配置对象； taks：执行的任务； -->

 	var paths = {
	  scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],<!-- 放入自己项目相应文件夹地址 -->
	  images: 'client/img/**/*'
	};
	gulp.task('clean', function() {
		return del(['build']);
	});
	gulp.task('scripts', ['clean'], function() {
	  return gulp.src(paths.scripts)
	    .pipe(sourcemaps.init())
	      .pipe(coffee())
	      .pipe(uglify())
	      .pipe(concat('all.min.js')) 
	      <!-- js合并到一个all.min.js文件里 -->
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest('build/js'));
	    <!-- 最终生成的文件输出到build/js文件夹 -->
	});

	gulp.task('images', ['clean'], function() {
	  return gulp.src(paths.images)
	    .pipe(imagemin({optimizationLevel: 5}))
	    .pipe(gulp.dest('build/img'));
	});

	gulp.task('watch', function() {
	  gulp.watch(paths.scripts, ['scripts']);
	  gulp.watch(paths.images, ['images']);
	});

	gulp.task('default', ['watch', 'scripts', 'images']);
	<!-- gulp运行时依次调用了default、watch、script、images任务 -->


 	<!-- 在项目终端运行命令：gulp 回车键即可 -->

