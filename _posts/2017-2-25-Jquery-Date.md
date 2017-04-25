---
layout: post
title: jquery 日期Date
leftImg:  /images/2before.png
---

## 现在开始往后面推5天是什么时间？往后推5个月呢？
<pre>
五天后：<br>
var CurrentDate=new Date();
CurrentDate.setDate(CurrentDate.getDate()+5);
<br>
五个月后：<br>
var CurrentDate=new Date();
CurrentDate.setMonth(CurrentDate.getMonth()+5);
alert(CurrentDate.getMonth()+1)
</pre>
##  Js计算时间差（天、小时、分钟、秒）
<pre>          
    var date1= '2015/05/01 00:00:00';  //开始时间  
    var date2 = new Date();    //结束时间  
    var date3 = date2.getTime() - new Date(date1).getTime();   //时间差的毫秒数        
  
    //------------------------------  
  
    //计算出相差天数  
    var days=Math.floor(date3/(24*3600*1000))  
  
    //计算出小时数  
  
    var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数  
    var hours=Math.floor(leave1/(3600*1000))  
    //计算相差分钟数  
    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数  
    var minutes=Math.floor(leave2/(60*1000))  
    //计算相差秒数  
    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数  
    var seconds=Math.round(leave3/1000)  
    alert(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")  
</pre>


