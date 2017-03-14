---
layout: post
title: css兼容性处理总结
leftImg:  /images/ie.png
---
###检测ie版本的利器
http://caibaojian.com/detect-ie-version.html
###透明度
``` python
filter:alpha(opacity=80); /* IE */ 
-moz-opacity:0.8; /* Moz + FF */ 
opacity: 0.8; /* 支持CSS3的浏览器（FF 1.5也支持）*/ 
```
### flex
``` python
display:flex
display:-webkit-box;
display:-ms-flexbox
```
``` python
flex:1
-webkit-box-flex :1
-ms-flex:1
相关的知识可以去看看阮一峰老师的文章
```
###兼容性代码可以去[http://caniuse.com](http://caniuse.com)看看
### better-scroll滚动插件，有空去看看（iscroll没人维护了）
###position
如果设置了position:absolute .fixed用于打底或者遮盖最好写上z-index
### transition
transition: all .5s
-webkit-transition:all .5s
### 动画库
js动画库Velocity.js
css动画库 animation.min.css
###毛玻璃透明效果(只有苹果手机可见效果)
SS 3 的 filter 想必大家都知道，可以做色调变和模糊处理之类高大上的效果。不过，我今天要讲的是 backdrop-filter，它可以实现 filter 的绝大多数效果，但仅对背景生效。
比如：
background-color: rgba(255, 255, 255, 0.5);
-webkit-backdrop-filter: blur(10px);
这两行就能实现与 iOS 系统 UI 相同的毛玻璃透明效果