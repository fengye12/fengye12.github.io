---
layout: post
title: apply和call方法的作用及区别说明
leftImg:  /images/2before.png
---

### 一、call和apply的说明
1、call，apply都属于Function.prototype的一个方法，它是JavaScript引擎内在实现的，因为属于Function.prototype，所以每个Function对象实例(就是每个方法)都有call，apply属性。既然作为方法的属性，那它们的使用就当然是针对方法的了，这两个方法是容易混淆的，因为它们的作用一样，只是使用方式不同。
2、语法：foo.call(this, arg1,arg2,arg3) == foo.apply(this, arguments) == this.foo(arg1, arg2, arg3);
3、相同点：两个方法产生的作用是完全一样的。
4、不同点：方法传递的参数不同。
### 二、实例代码
``` python
<script type="text/javascript">
    function A(){
        this.flag = 'A';
        this.tip = function(){
            alert(this.flag);
        };
    }
    function B(){
        this.flag = 'B';
    }
    var a = new A();
    var b = new B();
    //a.tip.call(b);
    a.tip.apply(b);
</script>
```
### 三、代码解释(即说明apply和call作用)
1、实例代码定义了两个函数A和B，A中包含flag属性和tip属性(这个属性赋值一个函数)，B中有一个flag属性。
2、分别创建A和B的对象a和b。
3、无论是a.tip.call(b);和a.tip.apply(b);运行的结果都是弹出B。
4、从结果中可以看出call和apply都可以让B对象调用A对象的tip方法，并且修改了this的当前作用对象。
### 在Javascript中什么是伪数组？如何将伪数组转化为标准数组？
伪数组（类数组）：无法直接调用数组方法或期望length属性有什么特殊的行为，但仍可以对真正数组遍历方法来遍历它们。典型的是函数的argument参数，还有像调用getElementsByTagName,document.childNodes之类的,它们都返回NodeList对象都属于伪数组。可以使用Array.prototype.slice.call(fakeArray)将数组转化为真正的Array对象。
<pre>
function log(){
      var args = Array.prototype.slice.call(arguments);  
//为了使用unshift数组方法，将argument转化为真正的数组
      args.unshift('(app)');
      console.log.apply(console, args);
};
</pre>
### 转成数组的通用函数
<pre>
var toArray = function(s){
    try{
        return Array.prototype.slice.call(s);
    } catch(e){
            var arr = [];
            for(var i = 0,len = s.length; i < len; i++){
                //arr.push(s[i]);
                   arr[i] = s[i];  //据说这样比push快
            }
             return arr;
    }
}
</pre>
