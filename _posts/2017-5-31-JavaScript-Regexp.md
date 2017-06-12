---
layout: post
title: 正则表达式
leftImg:  /images/ie.png
---

### 1、start
var str = "123abc";
var patt1 = /^[0-9]+abc$/;
document.write(str.match(patt1));
1、^ 为匹配输入字符串的开始位置。
2、[0-9]+匹配多个数字， [0-9] 匹配单个数字，+ 匹配一个或者多个。
3、abc$匹配字母 abc 并以 abc 结尾，$ 为匹配输入字符串的结束位置
### 限定符用来指定正则表达式的一个给定组件必须要出现多少次才能满足匹配。有 * 或 + 或 ? 或 {n} 或 {n,} 或 {n,m} 共6种。
? 问号代表前面的字符最多只可以出现一次（0次、或1次）
+ 号代表前面的字符必须至少出现一次（1次或多次）
* 号代表前面的字符可以不出现，也可以出现一次或者多次（0次、或1次、或多次）。
http://www.runoob.com/regexp/regexp-syntax.html
