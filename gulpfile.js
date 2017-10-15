


var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    del = require('del'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    spriter = require("gulp-spriter"),//这个不能用了，记得删掉
    cssSpriter=require('gulp-css-spriter'),
    autoprefixer = require("gulp-autoprefixer"),
    connect = require("gulp-connect");

// 启动服务
/*
想启动各种服务监控，在每个任务下添加，
        .pipe(connect.reload());
如果想做监控并自动刷新，在新建个watch的任务，监控目录下的某个目录下所有的html文件情况，如有变动，则自动刷新
    gulp.task('watch', function () {
       gulp.watch(['./build/*.html'], ['minifyhtml']);
    });
*/

/*
gulp.task('webserver',function () {
    return connect.server({
        livereload:true
    });
})
*/


// 压缩html
gulp.task('minifyhtml', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build'))
});

//压缩css
gulp.task('minifycss', function() {
    return gulp.src('src/css/*.css')      //压缩的文件
        .pipe(minifycss())   //执行压缩
        .pipe(autoprefixer()) //自动补全CSS浏览器前缀
        .pipe(gulp.dest('build/css'))   //输出文件夹
});

// 压缩js
gulp.task('minifyjs', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('build/js'))    //输出main.js到文件夹
        .pipe(rename({ suffix: '.min' }))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('build/js'));  //输出
});

// 压缩图片
gulp.task('minifyimages', function() {
    return gulp.src('src/images/*')      //压缩的文件
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))   //执行压缩
        .pipe(gulp.dest('build/images'))   //输出文件夹
});

//待minifycss结束后，在执行图片雪碧图 
gulp.task('imageSprite',['minifycss'], function() {
    return gulp.src('./src/css/home.css')
        .pipe(cssSpriter({
            //打包到哪的图片 
            'spriteSheet': './build/images/1.png',
            //引入哪里的图片  
            'pathToSpriteSheetFromCSS': '../images/1.png'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('./build/css'));
});

// 先clean下build里的垃圾
gulp.task('clean', function(cb) {
    del(['build/css', 'build/js', 'build/iamges'], cb)
});

gulp.task('default', function() {
    gulp.start('minifycss','minifyjs', 'minifyimages', 'minifyhtml', 'imageSprite');
});