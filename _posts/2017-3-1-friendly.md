---
layout: post
title: 兼容性处理的总结
leftImg:  /images/ie.png
---

###透明度
``` python
filter:alpha(opacity=80); /* IE */ 
-moz-opacity:0.8; /* Moz + FF */ 
opacity: 0.8; /* 支持CSS3的浏览器（FF 1.5也支持）*/ 
```
