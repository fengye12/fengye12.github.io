---
layout: post
title: flex篇
leftImg:  /images/2before.png
---

### flex语法
网页布局（layout）是CSS的一个重点应用。<br>
布局的传统解决方案，基于盒状模型，依赖 display属性 + position属性 + float属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。
2009年，W3C提出了一种新的方案----Flex布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。
### 一、Flex布局是什么？
任何一个容器都可以指定为Flex布局。<br>
行内元素也可以使用Flex布局。<br>
Webkit内核的浏览器，必须加上-webkit前缀。<br>
注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。
### 二、基本概念
采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。<br>
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。
### 三、容器的属性
以下6个属性设置在容器上
flex-direction 属性决定主轴的方向（即项目的排列方向）。<br>
flex-wrap 默认情况下，项目都排在一条线（又称"轴线"）上<br>
flex-flow 属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。<br>
justify-content属性定义了项目在主轴上的对齐方式。<br>
align-items 属性定义项目在交叉轴上如何对齐。<br>
align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用<br>
.box {
  flex-direction: row （默认）| row-reverse | column | column-reverse;
}<br>
.box{
  flex-wrap: nowrap(（默认）) | wrap | wrap-reverse;
}<br>
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}<br>
.box {
  justify-content: flex-start（默认） | flex-end | center | space-between | space-around;
}<br>
.box {
  align-items: flex-start默认值 | flex-end | center | baseline | stretch（默认）
}<br>
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch（默认）;
}<br>
### 四、项目的属性
order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。<br>
flex-grow 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。<br>
flex-shrink 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。<br>
flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。<br>
flex 属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。<br>
align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。<br>
### 兼容性问题
``` python
1、display:flex
display:-webkit-box;
display:-webkit-flex;
display:flex;
2、align-items:center
-webkit-box-align:center;
-webkit-align-items:center;
align-items:center;
3、flex:1
-webkit-box-flex:1;
-webkit-flex:1;
flex:1;
```
