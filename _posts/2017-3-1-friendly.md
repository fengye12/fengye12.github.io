---
layout: post
title: css兼容性处理总结
leftImg:  /images/ie.png
---

<style>
    ::selection { background: #e2eae2; }
    ::-moz-selection { background: #e2eae2; }
    ::-webkit-selection { background: #e2eae2; }
</style>
### 转ico
``` python
http://www.bitbug.net/
<link type="image/x-icon" href="../style/image/favcion.ico" rel="shortcut icon" />
<link rel="fluid-icon" href="../style/image/favcion.png" title="meyoung">
```
### 允许添加到主屏幕类似app运行，而不是浏览器中运行
``` python
<meta name="apple-mobile-web-app-capable" content="yes">
```
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
https://github.com/fengye12/autocomplete
缺点：匹配汉字不行
解决方案：manageData()注释掉（841行）
<code>
.on('keydown.xdsoft input.xdsoft cut.xdsoft paste.xdsoft', function( event ){
        var ret = manageKey(event);

        if (ret === false || ret === true) {
          return ret;
        }

        setTimeout(function(){
          manageData();
        },1);

        // manageData();
      })
  </code>
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

### 补充jquery 选择器
<pre>
  1. 先说说通过位置选择的几个操作：
:first：默认情况下是相对整个页面来说的第一个，如：li:first表示整个页面的第一个li元素，而ul li:first表示整个页面的第一个li元素，并且是在ul下的子元素；
:last：同上了，只是是最后一个而已；
:first- child：为每个父元素匹配第一个子元素，如li:first-child返回每个ul的第一个li元素。可以这样理解，页面中的元素有相同的父元素 的，并且里面又包含li元素的，那么就取第一个li元素，每个子类集合都要进行判断，直到找出所有符合要求的li元素；
:last-child：这个也与上面相对了，只是取的是最后一个；
:only- child：返回所有没有兄弟节点的元素，注意，文本元素不是，也就是说类似这样的<div>hello<a href="">jquery</a></div>，对于这段会选出<a>元素；对 于$(”label:only-child“)会选出是label元素，同时它是它父类唯一的子元素的label元素；
:nth-child(n)：返回第n个子节点，n从1开始，如果n取0，那么就会选择所有的元素。如：[*]li:nth-child(2)返回li元素，并且该元素是其父元素的第二个子元素；
:nth-child(even|odd)：返回偶数或奇数的子节点；
:nth-child(An+B)：返回满足表达式An+B的所有子节点，比如3n+1返回所处位置为父节点子元素的是3的倍数加1的那个子元素；
:even：页面范围内的处于偶数位置的元素，如：li:even返回全部偶数li元素；
:odd：页面范围内的处于奇数位置的元素；
:eq(n)：第n个匹配的元素(n从0开始)，如：li:eq(3)返回整个页面的第四个li元素，ul li:eq(1)返回页面中第一个ul元素下的第二个li元素，注意：只匹配一次就返回了；
:gt(n)：第n个匹配元素(不包括)之后的元素(n从0开始)，如：ul:gt(2)返回从第3个ul开始的所有ul元素(含第三个)；
:lt(n)：第n个匹配元素(不包括)之前的元素(n从0开始)，如：ul:lt(2)返回从第0个和第1个ul元素；
2. 利用css选择器进行选择：
元素标签名：比如说$(”a“)会选出所有链接元素；
#id：通过元素id进行选择，比如说$("#form1")会选择id为form1的元素；
.class：通过元素的CSS类来选择，比如说$(".boldstyle")会选择CSS为boldstyle类的元素；
标签 名#id.class：通过某类元素的id属性和class属性来选择，如：$(a#blog.boldStyle)会选择id为blog并且CSS类型 为.boldStyle类型的链接元素(<a id='blog' class='.boldStyle'>)；
父标签名 子标签名.class：通过选择父标签下的某种CSS类型的子元素，如：$(p a.redStyle)会选择p段落元素中的链接子元素a，且其css类型为.redStyle；
3. 通过子选择器，容器选择器和属性选择器进行选择：
*：匹配所有的元素，比如说:$(*)会把页面中的所有元素都返回；
E：匹配标签名为E的所有元素，如$("a")返回所有链接元素；
E F：匹配父元素E下的标签名为F的所有子元素（F可以为E的子类的子类，甚至更远）；
E>F：匹配父元素E下的所有标签名为F的直接子元素；
E+F：匹配所有标签名为F的元素，并且有E类型的兄弟节点在该F元素之前（E,F紧挨着）；
E~F：匹配前面是任何兄弟节点E的所有元素F(E,F不必紧挨着);
E:has(F)：匹配标签名为E，至少有一个标签名为F的后代节点的所有元素E；
E.C：匹配带有类名C的所有元素E。.C等效于*.C；
E#I：匹配id为I的所有元素E，#I等效于*#I；
E[A]：匹配带有属性A的所有元素E；
E[A=V]：匹配所有属性A的值为V的元素E；
E[A^=V]：匹配所有元素E，且A的属性值是V开头的；
E[A$=V]：匹配所有元素E，且A的属性值是V结尾的；
E[A*=V]：匹配所有元素E，且A的属性值中包含有V；
4.利用jQuery自定义的选择器进行选择：
:button：选择任何按钮类型的元素，包括input[type=submit]等等；
:checkbox：选择复选框元素；
:file：选择所有文件类型元素，即input[type=file]；
:image：选择表单中的图像元素，即input[type=image]，注意此处和前面根据标签名img选择图像有点不同哈；
:input：选择表单元素，如<input>,<select>,<textarea>,<button>等；
:radio：选择单选按钮元素；
:reset：选择复位按钮元素，如input[type=reset]，button[type=reset]；
:submit：选择提交按钮元素；
:text：选择文本字段元素，即input[type=text]；
:animated：选择当前处于动态控制下的元素；
:contains(hello)：选择包含文本hello的元素；
:header：选择标题元素，如<h1>；
:parent：选择拥有后代节点(包括文本)的元素，而排除空元素；
:selected：选择已选中的选项元素；
:visible：选择可见元素；
:enable：选择界面上已经可以使用的表单元素；
:disabled：选择界面上被禁用的表单元素；
:checked：选择已选中的复选框或单选按钮；
</pre>

### 兼容各个浏览器的完美placeholder
<pre>
  <input type="text" value="Name *" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Name *';}">
</pre>
<script>
  var eventshiv = {
    // event兼容
    getEvent: function(event) {
        return event ? event : window.event;
    },
 
    // type兼容
    getType: function(event) {
        return event.type;
    },
 
    // target兼容
    getTarget: function(event) {
        return event.target ? event.target : event.srcelem;
    },
 
    // 添加事件句柄
    addHandler: function(elem, type, listener) {
        if (elem.addEventListener) {
            elem.addEventListener(type, listener, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + type, listener);
        } else {
            // 在这里由于.与'on'字符串不能链接，只能用 []
            elem['on' + type] = listener;
        }
    },
 
    // 移除事件句柄
    removeHandler: function(elem, type, listener) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, listener, false);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + type, listener);
        } else {
            elem['on' + type] = null;
        }
    },
 
    // 添加事件代理
    addAgent: function (elem, type, agent, listener) {
        elem.addEventListener(type, function (e) {
            if (e.target.matches(agent)) {
                listener.call(e.target, e); // this 指向 e.target
            }
        });
    },
 
    // 取消默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
 
    // 阻止事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};
</script>
