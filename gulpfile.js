const gulp = require('gulp');
const webserver = require('gulp-webserver');
const minify = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const fs = require('fs');
const path = require('path');
gulp.task('minifyCss',function (){
    gulp.src('./css/*.css')
    .pipe(minify())
    .pipe(gulp.dest('public'));
});
gulp.task('uglify',function (){
    gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./fs'));
});
gulp.task('first',function(){
    gulp.src('./')
    .pipe(webserver({
        host:'localhost',
        port: 8090,
        livereload: true,
        open: true,
        fallback:'demo.html'
    }))
})
gulp.task('webserver',function(){
    gulp.src('./')
        .pipe(webserver({
            host:'localhost',
            port: 8080,
            middleware:function(req,res){
                res.writeHead(200,{
                    "content-type":"text/json",
                    'Access-Control-Allow-Origin':"*"
                })
                if(req.url === '/news'){
                    res.end(fs.readFileSync('./data.json'));
                }   
            }
    }))
});

gulp.task('default',['first','webserver','minifyCss','uglify']);