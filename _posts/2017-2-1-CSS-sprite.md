---
layout: post
title:  常用的css片段
leftImg:  /images/css.png
---
1、垂直对齐
如果你用CSS，则你会有困惑：我该怎么垂直对齐容器中的元素？现在，利用CSS3的Transform，可以很优雅的解决这个困惑：
<pre>
.verticalcenter{
   position: relative;
   top: 50%;
   -webkit-transform: translateY(-50%);
   -o-transform: translateY(-50%);
   transform: translateY(-50%);
}
</pre>
1.1如果出现两个inline-block的div中间有缝隙，将父元素的font-size设置为0.或者两个div中间不要有空白。
1.2如果两个div顶部不对其，可以在第一个div上写vertical-align:top;
2、伸展一个元素到窗口高度
在具体场景中，你可能想要将一个元素伸展到窗口高度，基本元素的调整只能调整容器的大小,因此要使一个元素伸展到窗口高度，我们需要伸展顶层元素：html和body:
<pre>
html,
body {
   height: 100%;
}
</pre>
然后将100%应用到任何元素的高：
<pre>
div {
   height: 100%;
}
</pre>
3、基于文件格式使用不同的样式
为了更容易知道链接的目标，有时你想让一些链接看起来和其它的不同。下面的片段在文本链接前添加一个图标，对不同的资源使用不同的图标或图片：
<pre>
a[href^="http://"]{
   padding-right: 20px;
   background: url(external.gif) no-repeat center right;
}
/* emails */
a[href^="mailto:"]{
   padding-right: 20px;
   background: url(email.png) no-repeat center right;
}
/* pdfs */
a[href$=".pdf"]{
   padding-right: 20px;
   background: url(pdf.png) no-repeat center right;
}
</pre>
看起来是这样的:http://jsfiddle.net/agusesetiyono/3sL1r0mw/light/

4、创建跨浏览器的图像灰度
灰度有时看起来简约和优雅，能为网站呈现更深层次的色调。在示例中，我们将对一个SVG图像添加灰度过滤：
<pre>
<svg xmlns="http://www.w3.org/2000/svg">
   <filter id="grayscale">
       <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"/>
   </filter>
</svg>
</pre>
为了跨浏览器，会用到filter属性：
<pre>
img {
   filter: url(filters.svg#grayscale); /* Firefox 3.5+ */
   filter: gray; /* IE6-9 */
   -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
}
</pre>
5、背景渐变动画
CSS中最具诱惑的一个功能是能添加动画效果，除了渐变，你可以给背景色、透明度、元素大小添加动画。目前，你不能为渐变添加动画，但下面的代码可能有帮助。它通过改变背景位置，让它看起来有动画效果。
<pre>
button {
   background-image: linear-gradient(#5187c4, #1c2f45);
   background-size: auto 200%;
   background-position: 0 100%;
   transition: background-position 0.5s;
}   
button:hover {
   background-position: 0 0;
}
</pre>
效果在这里：http://jsfiddle.net/agusesetiyono/gw46dk27/1/light/

6、CSS：表格列宽自适用
对于表格，当谈到调整列宽时，是比较痛苦的。然后，这里有一个可以使用的技巧：给td元素添加white-space: nowrap;能让文本正确的换行
<pre>
td {
   white-space: nowrap;
}
</pre>
查看效果：http://jsfiddle.net/agusesetiyono/1uotj8wv/3/light/

7、只在一边或两边显示盒子阴影
如果你要一个盒阴影，试试这个技巧，能为任一边添加阴影。为了实现这个，首先定义一个有具体宽高的盒子，然后正确定位:after伪类。实现底边阴影的代码如下：
<pre>
.box-shadow {
   background-color: #FF8020;
   width: 160px;
   height: 90px;
   margin-top: -45px;
   margin-left: -80px;
   position: absolute;
   top: 50%;
   left: 50%;
}
.box-shadow:after {
   content: "";
   width: 150px;
   height: 1px;
   margin-top: 88px;
   margin-left: -75px;
   display: block;
   position: absolute;
   left: 50%;
   z-index: -1;
   -webkit-box-shadow: 0px 0px 8px 2px #000000;
      -moz-box-shadow: 0px 0px 8px 2px #000000;
           box-shadow: 0px 0px 8px 2px #000000;
}
</pre>
效果：http://jsfiddle.net/agusesetiyono/1kwhsfvo/light/

8、包裹长文本
如果你碰到一个比自身容器长的文本，这个技巧对你很有用。在这个示例中，默认时，不管容器的宽度，文本都将水平填充。 
long text
简单的CSS代码就能在容器中调整文本：
<pre>
pre {
   white-space: pre-line;
   word-wrap: break-word;
}
</pre>
效果看起来如下： 
effect
9、制造模糊文本
想要让文本模糊？可以使用color透明和text-shadow实现。
<pre>
.blurry-text {
  color: transparent;
  text-shadow: 0 0 5px rgba(0,0,0,0.5);
}
</pre>
效果：http://jsfiddle.net/agusesetiyono/n5uh4s0j/light/

10、用CSS动画实现省略号动画
这个片段将帮助你制造一个ellipsis的动画，对于简单的加载状态是很有用的，而不用去使用gif图像。
<pre>
.loading:after {
   overflow: hidden;
   display: inline-block;
   vertical-align: bottom;
   animation: ellipsis 2s infinite;
   content: "\2026"; /* ascii code for the ellipsis character */
}
@keyframes ellipsis {
   from {
       width: 2px;
   }
   to {
       width: 15px;
   }
}
</pre>
效果：http://jsfiddle.net/agusesetiyono/MDzsR/69/light/

11、样式重置
<pre>
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
 margin: 0;
 padding: 0;
 border: 0;
 font-size: 100%;
 font: inherit;
 vertical-align: baseline;
 outline: none;
 -webkit-box-sizing: border-box;
 -moz-box-sizing: border-box;
 box-sizing: border-box;
}
html { height: 101%; }
body { font-size: 62.5%; line-height: 1; font-family: Arial, Tahoma, sans-serif; }
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; }
ol, ul { list-style: none; }
blockquote, q { quotes: none; }
blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; }
strong { font-weight: bold; }
table { border-collapse: collapse; border-spacing: 0; }
img { border: 0; max-width: 100%; }
p { font-size: 1.2em; line-height: 1.0em; color: #333; }
</pre>
12、典型的CSS清除浮动
<pre>
.clearfix:after { content: "."; display: block; clear: both; visibility: hidden; line-height: 0; height: 0; }
.clearfix { display: inline-block; }
html[xmlns] .clearfix { display: block; }
* html .clearfix { height: 1%; }
</pre>
13、新版清除浮动（2011）
<pre>
.clearfix:before, .container:after { content: ""; display: table; }
.clearfix:after { clear: both; }
/* IE 6/7 */
.clearfix { zoom: 1; }
</pre>
14、跨浏览器的透明
<pre>
.transparent {
   filter: alpha(opacity=50); /* internet explorer */
   -khtml-opacity: 0.5;      /* khtml, old safari */
   -moz-opacity: 0.5;       /* mozilla, netscape */
   opacity: 0.5;           /* fx, safari, opera */
}
</pre>
15、CSS引用模板
<pre>
blockquote {
   background: #f9f9f9;
   border-left: 10px solid #ccc;
   margin: 1.5em 10px;
   padding: .5em 10px;
   quotes: "\201C""\201D""\2018""\2019";
}
blockquote:before {
   color: #ccc;
   content: open-quote;
   font-size: 4em;
   line-height: .1em;
   margin-right: .25em;
   vertical-align: -.4em;
}
blockquote p {
   display: inline;
}
</pre>
16、个性圆角
<pre>
#container {
   border-radius: 4px 3px 6px 10px;
}
#container {
    border-radius-top-left: 4px;
    border-radius-top-right: 3px;
    border-radius-bottom-right: 6px;
    border-radius-bottom-left: 10px;
}
</pre>
17、通用媒体查询
<pre>
/* Smartphones (portrait and landscape) ----------- */
@media only screen
and (min-device-width : 320px) and (max-device-width : 480px) {
 /* Styles */
}
/* Smartphones (landscape) ----------- */
@media only screen and (min-width : 321px) {
 /* Styles */
}
/* Smartphones (portrait) ----------- */
@media only screen and (max-width : 320px) {
 /* Styles */
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
 /* Styles */
}
/* iPads (landscape) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {
 /* Styles */
}
/* iPads (portrait) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {
 /* Styles */
}
/* Desktops and laptops ----------- */
@media only screen and (min-width : 1224px) {
 /* Styles */
}
/* Large screens ----------- */
@media only screen and (min-width : 1824px) {
 /* Styles */
}
/* iPhone 4 ----------- */
@media only screen and (-webkit-min-device-pixel-ratio:1.5), only screen and (min-device-pixel-ratio:1.5) {
 /* Styles */
}
</pre>
18、现代字体栈
<pre>
/* Times New Roman-based serif */
font-family: Cambria, "Hoefler Text", Utopia, "Liberation Serif", "Nimbus Roman No9 L Regular", Times, "Times New Roman", serif;
/* A modern Georgia-based serif */
font-family: Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif," "Bitstream Vera Serif", "Liberation Serif", Georgia, serif;
/*A more traditional Garamond-based serif */
font-family: "Palatino Linotype", Palatino, Palladio, "URW Palladio L", "Book Antiqua", Baskerville, "Bookman Old Style", "Bitstream Charter", "Nimbus Roman No9 L", Garamond, "Apple Garamond", "ITC Garamond Narrow", "New Century Schoolbook", "Century Schoolbook", "Century Schoolbook L", Georgia, serif;
/*The Helvetica/Arial-based sans serif */
font-family: Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif;
/*The Verdana-based sans serif */
font-family: Corbel, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "DejaVu Sans", "Bitstream Vera Sans", "Liberation Sans", Verdana, "Verdana Ref", sans-serif;
/*The Trebuchet-based sans serif */
font-family: "Segoe UI", Candara, "Bitstream Vera Sans", "DejaVu Sans", "Bitstream Vera Sans", "Trebuchet MS", Verdana, "Verdana Ref", sans-serif;
/*The heavier "Impact" sans serif */
font-family: Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans-serif;
/*The monospace */
font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
Code Source
</pre>
19、自定义文本选择
<pre>
::selection { background: #e2eae2; }
::-moz-selection { background: #e2eae2; }
::-webkit-selection { background: #e2eae2; }
</pre>
20、为logo隐藏H1
<pre>
h1 {
   text-indent: -9999px;
   margin: 0 auto;
   width: 320px;
   height: 85px;
   background: transparent url("images/logo.png") no-repeat scroll;
}
</pre>

21、图片边框偏光
<pre>
img.polaroid {
   background:#000; /*Change this to a background image or remove*/
   border:solid #fff;
   border-width:6px 6px 20px 6px;
   box-shadow:1px 1px 5px #333; /* Standard blur at 5px. Increase for more depth */
   -webkit-box-shadow:1px 1px 5px #333;
   -moz-box-shadow:1px 1px 5px #333;
   height:200px; /*Set to height of your image or desired div*/
   width:200px; /*Set to width of your image or desired div*/
}
Code Source
</pre>
22、锚链接伪类
<pre>
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: yellow; }
Code Source
</pre>
23、奇特的CSS引用
<pre>
.has-pullquote:before {
   /* Reset metrics. */
   padding: 0;
   border: none;
   /* Content */
   content: attr(data-pullquote);
   /* Pull out to the right, modular scale based margins. */
   float: right;
   width: 320px;
   margin: 12px -140px 24px 36px;
   /* Baseline correction */
   position: relative;
   top: 5px;
   /* Typography (30px line-height equals 25% incremental leading) */
   font-size: 23px;
   line-height: 30px;
}
.pullquote-adelle:before {
   font-family: "adelle-1", "adelle-2";
   font-weight: 100;
   top: 10px !important;
}
.pullquote-helvetica:before {
   font-family: "Helvetica Neue", Arial, sans-serif;
   font-weight: bold;
   top: 7px !important;
}
.pullquote-facit:before {
   font-family: "facitweb-1", "facitweb-2", Helvetica, Arial, sans-serif;
   font-weight: bold;
   top: 7px !important;
}
Code Source
</pre>
24、CSS3：全屏背景
<pre>
html {
   background: url('images/bg.jpg') no-repeat center center fixed;
   background-size: cover;
}
Code Source
</pre>
25、内容垂直居中
<pre>
.container {
   min-height: 6.5em;
   display: table-cell;
   vertical-align: middle;
}
</pre>
26、强制出现垂直滚动条
1
html { height: 101% }
27、CSS3渐变模板
<pre>
#colorbox {
   background: #629721;
   background-image:-webkit-gradient(linear,left top,left bottom,from(#349ee1),to(#1677b5));
   background-image:-webkit-linear-gradient(top,#349ee1 0,#1677b5 100%);
   background-image:linear-gradient(to bottom,#349ee1 0,#1677b5 100%);
   filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#349ee1', endColorstr='#1677b5', GradientType=0);
}
</pre>
28、@font-face模板
<pre>
@font-face {
   font-family: 'MyWebFont';
   src: url('webfont.eot'); /* IE9 Compat Modes */
   src: url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
   url('webfont.woff') format('woff'), /* Modern Browsers */
   url('webfont.ttf')  format('truetype'), /* Safari, Android, iOS */
   url('webfont.svg#svgFontName') format('svg'); /* Legacy iOS */
}
body {
   font-family: 'MyWebFont', Arial, sans-serif;
}
</pre>
29、缝合CSS3元素
<pre>
p {
   position:relative;
   z-index:1;
   padding: 10px;
   margin: 10px;
   font-size: 21px;
   line-height: 1.3em;
   color: #fff;
   background: #ff0030;
   box-shadow: 0 0 0 4px #ff0030, 2px 1px 6px 4px rgba(10,10,0,.5);
   border-radius: 3px;
}
p:before {
   content: "";
   position: absolute;
   z-index: -1;
   top: 3px;
   bottom: 3px;
   left :3px;
   right: 3px;
   border: 2px dashed #fff;
}
p a {
   color: #fff;
   text-decoration:none;
}
p a:hover, p a:focus, p a:active {
   text-decoration:underline;
}
Code Source
</pre>
30、CSS3 斑马线
<pre>
tbody tr:nth-child(odd) {
   background-color: #ccc;
}
Code Source
</pre>
31、有趣的&
<pre>
.amp {
   font-family: Baskerville, 'Goudy Old Style', Palatino, 'Book Antiqua', serif;
   font-style: italic;
   font-weight: normal;
}
Code Source
</pre>
32、大字段落
<pre>
p:first-letter{
   display: block;
   margin: 5px 0 0 5px;
   float: left;
   color: #ff3366;
   font-size: 5.4em;
   font-family: Georgia, Times New Roman, serif;
}
</pre>
33、内部CSS3 盒阴影
<pre>
#mydiv {
   box-shadow: inset 2px 0 4px #000;
}
</pre>
34、外部CSS3 盒阴影
<pre>
#mydiv {
   box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.52);
}
</pre>
35、三角形列表项目符号
<pre>
ul {
   margin: 0.75em 0;
   padding: 0 1em;
   list-style: none;
}
li:before {
   content: "";
   border-color: transparent #111;
   border-style: solid;
   border-width: 0.35em 0 0.35em 0.45em;
   display: block;
   height: 0;
   width: 0;
   left: -1em;
   top: 0.9em;
   position: relative;
}
Code Source
</pre>
36、固定宽度的居中布局
<pre>
#page-wrap {
   width: 800px;
   margin: 0 auto;
}
Code Source
#columns-3 {
   text-align: justify;
   -moz-column-count: 3;
   -moz-column-gap: 12px;
   -moz-column-rule: 1px solid #c4c8cc;
   -webkit-column-count: 3;
   -webkit-column-gap: 12px;
   -webkit-column-rule: 1px solid #c4c8cc;
}
Code Source
</pre>
38、CSS固定页脚
<pre>
#footer {
   position: fixed;
   left: 0px;
   bottom: 0px;
   height: 30px;
   width: 100%;
   background: #444;
}
/* IE 6 */
* html #footer {
   position: absolute;
   top: expression((0-(footer.offsetHeight)+(document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight)+(ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop))+'px');
}
Code Source
</pre>
39、IE6的PNG透明修复
<pre>
.bg {
   width:200px;
   height:100px;
   background: url(/folder/yourimage.png) no-repeat;
   _background:none;
   _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/folder/yourimage.png',sizingMethod='crop');
}
/* 1px gif method */
img, .png {
   position: relative;
   behavior: expression((this.runtimeStyle.behavior="none")&&(this.pngSet?this.pngSet=true:(this.nodeName == "IMG" && this.src.toLowerCase().indexOf('.png')>-1?(this.runtimeStyle.backgroundImage = "none",
      this.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.src + "', sizingMethod='image')",
      this.src = "images/transparent.gif"):(this.origBg = this.origBg? this.origBg :this.currentStyle.backgroundImage.toString().replace('url("','').replace('")',''),
      this.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.origBg + "', sizingMethod='crop')",
      this.runtimeStyle.backgroundImage = "none")),this.pngSet=true));
}
</pre>

40、跨浏览器设置最小高度
<pre>
#container {
   min-height: 550px;
   height: auto !important;
   height: 550px;
}
</pre>
41、CSS3 鲜艳的输入
<pre>
input[type=text], textarea {
   transition: all 0.30s ease-in-out;
   outline: none;
   padding: 3px 0px 3px 3px;
   margin: 5px 1px 3px 0px;
   border: 1px solid #ddd;
}
input[type=text]:focus, textarea:focus {
   box-shadow: 0 0 5px rgba(81, 203, 238, 1);
   padding: 3px 0px 3px 3px;
   margin: 5px 1px 3px 0px;
   border: 1px solid rgba(81, 203, 238, 1);
}
</pre>
42、基于文件类型的链接样式
<pre>
/* external links */
a[href^="http://"] {
   padding-right: 13px;
   background: url('external.gif') no-repeat center right;
}
/* emails */
a[href^="mailto:"] {
   padding-right: 20px;
   background: url('email.png') no-repeat center right;
}
/* pdfs */
a[href$=".pdf"] {
   padding-right: 18px;
   background: url('acrobat.png') no-repeat center right;
}
</pre>

43、强制换行
<pre>
pre {
   white-space: pre-wrap;       /* css-3 */
   white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
   white-space: -pre-wrap;      /* Opera 4-6 */
   white-space: -o-pre-wrap;    /* Opera 7 */
   word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
Code Source
</pre>
44、在可点击的项目上强制手型
<pre>
a[href], input[type='submit'], input[type='image'], label[for], select, button, .pointer {
   cursor: pointer;
}
Code Source
</pre>
45、网页顶部盒阴影
<pre>
body:before {
   content: "";
   position: fixed;
   top: -10px;
   left: 0;
   width: 100%;
   height: 10px;
   box-shadow: 0px 0px 10px rgba(0,0,0,.8);
   z-index: 100;
}
</pre>