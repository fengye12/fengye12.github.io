---
layout: post
title: gulp篇
categories: 工具类
tags: gulp
excerpt_separator:  '[^_^]:more'
---

#### gulp命令
你仅仅需要知道的5个gulp命令

gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数

gulp.run(tasks...)：尽可能多的并行运行多个task

gulp.watch(glob, fn)：当glob内容发生改变时，执行fn

gulp.src(glob)：置需要处理的文件的路径，可以是多个文件以数组的形式，也可以是正则

gulp.dest(path[, options])：设置生成文件的路径
glob：可以是一个直接的文件路径。他的含义是模式匹配。
gulp将要处理的文件通过管道（pipe()）API导向相关插件。通过插件执行文件的处理任务。

gulp.task('default', function () {...});
default 任务执行的话简单只要运行 gulp就可以

gulp.task这个API用来创建任务，在命令行下可以输入$ gulp [default]，（中括号表示可选）来执行上面的任务。
前段时间折腾Gulp，主要是搜寻一些插件，组合之以优化前端开发流程。这段折腾历程除了达成所愿外，给予最大的收获是：只要你想实现某功能，基本就已有对应插件供使用；
<br>
[^_^]:more
比如，伊始觉得使用SublimeText的 SFTP 上传代码到FTP很方便（Ctrl+S），而用gulp就会竟也有对应插件 gulp-sftp :heart_eyes::blush:，这下打开了使用 Gulp 的任督二脉;你想让各个task按顺序执行，就有 gulp-sequence 供你搞起；你想使用熊猫压图，果不其然就有 gulp-tinypng ;你想让gulp命令能够接受传参，就有npm的 yargs 模块在等着你去宠幸,如此等等，实在太爽，根本停不下来。此文就使用各路插件路上的些许心得做下记载，以供参考。
<br>
#### gulp-sequence Run a series of gulp tasks in order.
超级有用的类库；众所周知js是单线程的，运用此类库可以： 保证任务按顺序执行，让gulp任务，可以相互独立，解除任务间的依赖，增强task复用；对于复杂的操作非常有用；安装:
<pre>
npm install --save-dev gulp-sequence
</pre>
#### gulp-sftp ：上传本地文件到FTP
个人觉得这个插件太好了。单纯采用传统模式开发，可用 xftp , WinScp 等工具上传到FTP；当然这个好麻烦；为求更方便可以使用SublimeText插件 SFTP ， Ctrl+S 之时就可以上传此文件到FTP；但，一旦用SASS，Gulp等工具，这事儿就得重新考量了。幸好有 gulp-sftp 这样的工具，可以一键上传本地文件到FTP；其gulpfile配置也很简单，并且折腾起来没遇到什么问题。
<pre>
var gulp        = require('gulp'),
    sftp        = require('gulp-sftp'),
    config      = require('./config.json');
//上传到远程服务器任务
gulp.task('upload', function () {
    var workDirectory = 'xxx';
    return gulp.src( workDirectory + '/**' )
        .pipe(sftp({
            host: config.sftp.host,
            user: config.sftp.user,
            port: config.sftp.port,
            key: config.sftp.key,
            pass: config.sftp.pass,
            remotePath: config.sftp.remotePath+objectDirectoryName
        }));
});

为了安全(毕竟这个需要userName和password)，将重要的配置信息保存到项目目录下的一个json 文件中，名为 config.json，该文件示例代码如下：

{
    "project" : "Gulp",     
    "localserver" : {
 "host" : "localhost",
 "port" : "8081"
 },
    "tinypngapi": "Tinypng API KEY(所申请的api key)",
    "sftp" : {
 "host" : "8.8.8.8",
 "user" : "username",
 "port" : "22",
 "key" : "~/.ssh/sdfsfdsf",
 "remotePath" :"/",
 "pass": "jeffjade"
 }
}
</pre>
#### gulp.spritesmith 生成雪碧图
gulp.spritesmith：Convert a set of images into a spritesheet and CSS variables via gulp

这个库需要额外依赖 spritesmith 库；
<pre>
npm install --save-dev gulp.spritesmith  spritesmith
</pre>
当然安装的时候极有可能出现问题（Win下）；比如，安装的类库无法使用，并且也删除（指定的路径或文件名太长）；额，这是一个超蛋疼的问题；也是在尝试几次后才成功(没闹明白失败和成功的原因)；至于删掉那坏的类库，最后也是采用将部分 剪切出去 或者手动rename致使路径变短些才得以干掉它【用del rd命令都不足以删除之,我屮艸芔茻，醉了~】；

del : 指定的路径或文件名太长，或者两者都太长。完全限定文件名必须少于 260 个字符，并且目录名必须少于 248 个字符。

[Y] 是(Y) [A] 全是(A) [N] 否(N) [L] 全否(L) [S] 挂起(S) [?] 帮助 (默认值为“Y”): Ard : 指定的路径或文件名太长，或者两者都太长。完全限定文件名必须少于 260 个字符，并且目录名必须少于 248 个字符。
<pre>
gulpfile配置如下即可：

var gulp        = require('gulp'),
    spritesmith = require('gulp.spritesmith');
//运用gulp一键生成[雪碧图]
gulp.task('sprite', function(){
    var workDirectory = 'xxx', outPut = 'yyy';
    return gulp.src( workDirectory+'/images/*.png' )
    .pipe( spritesmith({
        imgName:'sprite.png',
        cssName:'sprite.css'
    }) )
    .pipe( gulp.dest(outPut+'/images') );
});
</pre>
#### gulp-tinypng 使用熊猫压图
gulp-tinypng：gulp plugin to compress png images using tinypng api
``` python
var gulp        = require('gulp'),
    tinypng     = require('gulp-tinypng');
//压缩图片 - tinypng
gulp.task('tinypng', function () {
    var workDirectory = 'xxx', outPut = 'yyy';
    gulp.src( workDirectory+'/images/*.{png,jpg,jpeg}')
        .pipe(tinypng(config.tinypngapi))
        .pipe(gulp.dest( outPut+'/images' ));
});
```
这里折腾起来没遇到什么问题；当然这里需要配置 API Key ;需要去tinypng开发者https://tinypng.com/developers ,获得一个合法的API Key；否则运行会出现如下错误：

gulp-tinypng - Credentials are invalid

#### gulp-replace :A string replace plugin for gulp
``` python
npm install --save-dev gulp-replace
```
在项目中这个插件还是挺有用的，可以批量替换字符串，并且支持使用正则替换；使用示例：
``` python
var replace = require('gulp-replace');
gulp.task('templates', function(){
  gulp.src(['file.txt'])
    .pipe(replace(/foo(.{3})/g, '$1foo'))
    .pipe(gulp.dest('build/file.txt'));
});
```
#### gulp-tap :Easiest way to tap into a pipeline
看其描述“最简单打通管道的方法”，官方给出的示例如下：
``` python
gulp.src("src/**/*.{coffee,js}")
    .pipe(tap(function(file, t) {
        if (path.extname(file.path) === '.coffee') {
            return t.through(coffee, []);
        }
    }))
    .pipe(gulp.dest('build'));
```
这个插件很有作用，它可以用来遍历 gulp.src() 指定的那些文件；利用这个特性，以及npm下自带的 path 插件，即可获取到每个文件的文件名；在特定场景需求里，它帮了我很大忙。
``` python
var gulp = require('gulp');
var path = require('path');
var tap = require('gulp-tap');
 
gulp.task('examples', function() {
return gulp.src('./examples/*.html')
    .pipe(tap(function (file,t) {
        console.log(path.basename(file.path));
        // Do something with the file name
    }))
    .pipe(gulp.dest('./build'));
});
```
#### lazypipe :Use to create an immutable, lazily initialized pipeline from a series of streams.
``` python
npm install --save-dev lazypipe
```
如果你在多个任务中使用了相同的插件，你可能发现你很想把这些东西以 DRY原则 [^footnote]去处理。这个方法可以创建一些工厂来把你经常使用的 stream 链分离出来。这可以使用 lazypipe 来完成这件事；参考文章： 通过 stream 工厂来共享 stream 。
``` python
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var coffee = require('gulp-coffee');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var lazypipe = require('lazypipe');
 
// 赋给 lazypipe
var jsTransform = lazypipe()
  .pipe(jshint)
  .pipe(jshint.reporter, stylish)
  .pipe(uglify);
 
gulp.task('bootstrap', function() {
  return gulp.src('bootstrap/js/*.js')
    .pipe(jsTransform())
    .pipe(gulp.dest('public/bootstrap'));
});
 
gulp.task('coffee', function() {
  return gulp.src('lib/js/*.coffee')
    .pipe(coffee())
    .pipe(jsTransform())
    .pipe(gulp.dest('public/js'));
});
```
你可以看到，多个任务中都在使用的 JavaScript 管道（JSHint + Uglify）分离到了一个工厂。工厂可以在任意多的任务中重用。你也可以嵌套这些工厂，或者把它们连接起来，已达到更好的效果。分离出每个共享的管道，也可以让你能够集中地管理，当你的工作流程更改后，你只需要修改一个地方即可。

#### 此外还有 yargs ， path ， gulp-changed 等等诸多模块，君之所需，可谓应有尽有—只要你愿意去折腾；实在没有自己写一个也并不是什么大难事。折腾，只为让事物变得更简洁。Not Fucking Excuse ,Just Do It。

[^footnote]:DRY是“Don’t Repeat Yourself”的缩写。意思是说，在一个设计里，对于任何东西，都应该有且只有一个表示，其它的地方都应该引用这一处。这样需要改动的时候，只需调整这一处，所有的地方就都变更过来了。
