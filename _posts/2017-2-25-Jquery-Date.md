---
layout: post
title: jquery 日期Date
---

现在开始往后面推5天是什么时间？往后推5个月呢？

五天后：<br>
var CurrentDate=new Date();
CurrentDate.setDate(CurrentDate.getDate()+5);
<br>
五个月后：<br>
var CurrentDate=new Date();
CurrentDate.setMonth(CurrentDate.getMonth()+5);
alert(CurrentDate.getMonth()+1)


