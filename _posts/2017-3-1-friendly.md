---
layout: post
title: css兼容性处理总结
leftImg:  /images/ie.png
---

<style>
    h3{
        color: #ff5400;
    }
    ::selection { background: #e2eae2; }
    ::-moz-selection { background: #e2eae2; }
    ::-webkit-selection { background: #e2eae2; }
</style>
### ie8及以下background-size:100% 100%;不起作用
浏览器兼容：
IE 和遨游不支持；
Firefox 添加私有属性 -moz-background-size 支持；
Safari 和 Chrome 添加私有属性 -webkit-background-size 支持；
Opera 不支持 background-size 属性，添加其私有属性 -o-background-size 也不支持。
<pre>
  background:#00ff00 url(img.jpg) no-repeat;
  -moz-background-size:60% 80%;
  -webkit-background-size:60% 80%;
  -o-background-size:60% 80%;}
  background-size:60% 80%;
</pre>
在IE不支持这个属性的时候可以通过滤镜来实现这样的一个效果。(据说路径要是绝对路径)
<pre>
  background-image: url('file:///F:/test/images/flashbg.jpg');
  background-size:
  cover;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='file:///F:/test/images/flashbg.jpg',sizingMethod='scale');
</pre>
注意：路径须要一样，并且是绝对路径
### ie6及以下版本不支持fixed;
在IE7以上的浏览器以及标准浏览器，都支持一个属性 position:fixed ，可以很简单地实现想要的效果，而且当窗口滚动时，该元素的滚动也会很平滑，但是在IE6及以下的版本浏览器下，并不支持该属性，所以只好使用position:absolute来代替实现，但新问题出现，你会发现，当滚动窗口时，该元素会出现抖动的现象，看起来就很不舒服，为了去掉这个抖动的BUG，为了实现平滑滚动，就有了以下这个css代码；
``` python
*html{_background-image:url(about:blank);_background-attachment:fixed;}
```
### 检测ie版本的利器
http://caibaojian.com/detect-ie-version.html
### 透明度
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
### 兼容性代码可以去[http://caniuse.com](http://caniuse.com)看看
### better-scroll
滚动插件，有空去看看（iscroll没人维护了）
### position
如果设置了position:absolute .fixed用于打底或者遮盖最好写上z-index
### transition
transition: all .5s
-webkit-transition:all .5s
### 动画库
js动画库Velocity.js
css动画库 animation.min.css
### 毛玻璃透明效果(只有苹果手机可见效果)
SS 3 的 filter 想必大家都知道，可以做色调变和模糊处理之类高大上的效果。不过，我今天要讲的是 backdrop-filter，它可以实现 filter 的绝大多数效果，但仅对背景生效。
比如：
background-color: rgba(255, 255, 255, 0.5);
-webkit-backdrop-filter: blur(10px);
这两行就能实现与 iOS 系统 UI 相同的毛玻璃透明效果
### @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){}
``` python
-webkit-min-device-pixel-ratio为1.0
所有非Retina的Mac
所有非Retina的iOS设备
Acer Iconia A500
Samsung Galaxy Tab 10.1
Samsung Galaxy S

-webkit-min-device-pixel-ratio为1.3
Google Nexus 7

-webkit-min-device-pixel-ratio为1.5
Google Nexus S
Samsung Galaxy S II
HTC Desire
HTC Desire HD
HTC Incredible S
HTC Velocity
HTC Sensation

-webkit-min-device-pixel-ratio为2.0
iPhone 4
iPhone 4S
iPhone 5
iPad (3rd generation)
iPad 4
所有Retina displays 的MAC
Google Galaxy Nexus
Google Nexus 4
Google Nexus 10
Samsung Galaxy S III
Samsung Galaxy Note II
Sony Xperia S
HTC One X
js判断
if (window.devicePixelRatio) {
    alert(window.devicePixelRatio)
}
### z.less库
http://www.aibusy.com/zless/
```
### 手机端分割线的颜色
``` python
1px solid rgba(90, 90, 90, 0.1)
1px solid #eee
1px solid #D9D9D9
```
###三角形
``` python
.triangle(left,@w:5px,@c:#ccc){
border-width : @w;
border-color:  transparent @c transparent transparent;
border-style:  dashed solid dashed dashed;//解决ie6下面的黑色
```
### flex
注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。
### ie8以下不兼容placeholder
直接引入补丁文件就可以https://github.com/danbentley/placeholder
### ie8以下不兼容h5新特性 和css3 新属性
使用补丁文件
html5shiv.min和respond.min（媒体查询文件，主义只有在服务器端才能生效）
### layer弹出层的使用
注意下载官网的layer文件夹整个放在目录下 只需引入layer.js就可
### input placeholder颜色
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #ddd; opacity:1;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #ddd;opacity:1;
}

input:-ms-input-placeholder{
    color: #ddd;opacity:1;
}

input::-webkit-input-placeholder{
    color: #ddd;opacity:1;
}
### box-sizing
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
### input写法(pc端)
<div class="layui-form-item">
    <label class="layui-form-label">输入框输入框输入框输入框输入框输入框</label>
    <div class="layui-input-block">
      <input type="text" name="" placeholder="请输入" autocomplete="off" class="layui-input">
    </div>
  </div>
  <style>
  .layui-form-item {
      margin-bottom: 15px;
      clear: both;

  }
   .layui-form-item:after {
       content: '\20';
       clear: both;
       display: block;
       height: 0;
   }
   .layui-form-label{
    text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        float: left;
            display: block;
            padding: 9px 15px;
            width: 80px;
            font-weight: 400;
            text-align: right;
            line-height: 20px;
                position: relative;
   }
   .layui-input-block {
       margin-left: 110px;
       min-height: 36px;
   }
   .layui-input {
       display: block;
       width: 100%;
       padding-left: 10px;
       height: 38px;
           line-height: 38px;
           line-height: 36px\9;
           border: 1px solid #e6e6e6;
           background-color: #fff;
           border-radius: 2px;
           outline: 0;
           -webkit-box-sizing: border-box;
           -moz-box-sizing: border-box;
           box-sizing: border-box;
   }
  </style>
###  高仿google输入框提示
https://github.com/fengye12/autocomplete（汉字匹配不行）
这个比之前找的都好，因为不会出现程序动态增加input时出现初始化困难。之前的插件使用的是id 选择器更不行
### 两个数组去重的方法
<pre>
  var arr1 = [1,2,3,4,5]; //数组A

  var arr2 = [1,2,3];//数组B

  var temp = []; //临时数组1

  var temparray = [];//临时数组2

  for (var i = 0; i < arr2.length; i++) {

  temp[arr2[i]] = true;//巧妙地方：把数组B的值当成临时数组1的键并赋值为真

  };

  for (var i = 0; i < arr1.length; i++) {

  if (!temp[arr1[i]]) {

  temparray.push(arr1[i]);
  //巧妙地方：同时把数组A的值当成临时数组1的键并判断是否为真，如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组

  } ;

  };
  document.write(temparray.join(",") + "");
</pre>
## 禁止浏览器后退的方法
<pre>
从A页面出去以后就不在能返回daoA，在A上加js
  window.history.forward();
  function StopBack() { window.history.forward(); }
  $('body').on('onload', function(event) {
   StopBack();
  });
  $('body').on('onpageshow', function(event) {
   if (event.persisted) StopBack();
  });
  从A跳转到B禁止在返回A
  window.location.replace("index.html?loginOut=true");//禁止浏览器后退
</pre>
### 模拟遮罩层
<pre>
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="utf-8">
      <script src="js/jquery-1.11.1.min.js"></script>
  </head>
  <style>
      .layui-layer-shade{
          z-index:19891014;
          background-color:#000;
          opacity:0.3;
          filter:alpha(opacity=30);
          position: fixed;
          pointer-events: auto;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: none;
          /* _height: expression(document.body.offsetHeight+"px"); */
      }
      .layui-layer-page{
          z-index: 19891015;
          min-width: 450px;
          min-height: 480px;
          top: 50%;
          left: 50%;
          margin-left: -225px;
          margin-top: -240px;
          display: none;
      }
      .layui-layer{
          background: #fff;
          position: fixed;
          pointer-events: auto;
          border-radius: 2px;
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
          -webkit-animation-duration: .3s;
          animation-duration: .3s;
          -webkit-overflow-scrolling: touch;
          padding: 0;
          background-color: #fff;
          -webkit-background-clip: content;
          box-shadow: 1px 1px 50px rgba(0,0,0,.3);
      }
      .closeIcon{
          position: absolute;
          right: 16px;
          top: 16px;
          height: 16px;
          width: 16px;
          background: url(img/icon.png) no-repeat;
          background-position: 1px -40px;
          cursor: pointer;
      }
    @-webkit-keyframes layer-bounceIn{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}
    @keyframes layer-bounceIn{0%{opacity:0;-webkit-transform:scale(.5);-ms-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}
    .layer-anim{-webkit-animation-name:layer-bounceIn;animation-name:layer-bounceIn}

  </style>
  <body>
      <button>show</button>
      <div class="layui-layer-shade" id="layui-layer-shade1" times="1"></div>
      <div class="layui-layer layui-layer-page  layer-anim" id="layui-layer1" type="page" times="1" showtime="0" contype="string" >
          <i class="closeIcon"></i>
          <script>
              $(".closeIcon").click(function(event) {
                  $("#layui-layer-shade1").hide();
                  $("#layui-layer1").hide();
              });
              $("button").click(function(event) {
                  $("#layui-layer-shade1").show();
                  $("#layui-layer1").show();
              });
          </script>
      </div>
  </body>
  </html>
</pre>
