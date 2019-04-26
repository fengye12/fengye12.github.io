---
layout: post
title:  web Worker
tags: webWorker
categories: js
excerpt_separator:  '[^_^]:more'
---

### 什么是Web Worker？为什么引入？

简单点说，Web Worker就是一个运行在后台的JavaScript线程，不会影响页面的响应。  

我们知道，JavaScript是单线程的脚本语言，即同一时刻只能做一件事情，否则会带来极其复杂的同步问题。比如JavaScript同时有两个线程，一个线程负责给某个DOM节点添加内容，另一个线程删除这个节点，这时，浏览器要以哪个线程为主呢？  

[^_^]:more

所以，为了避免同步复杂性的问题，JavaScript从一诞生起就是单线程，这也是这门语言的特征。  
  

> JavaScript的单线程机制会带来一个问题，当有一些非常复杂的任务需要处理时，页面不得不需要等待任务处理完成才能响应用户的操作，这对于页面的响应及用户体验都会带来一些负面的影响，为了解决这个问题，同时也是为了利用多核CPU的计算能力，HTML5提出了Web Worker标准，允许JavaScript创建多个线程，但是新创建的这些线程将作为子线程并且完全受主线程的控制。并且不得操作DOM，其实本质上还是单线程。 所以，我们可以把一些费时的任务交给Web Worker创建的子线程在后台完成，而前台页面依然可以处理用户的响应。    
  
### 使用限制
由于Web Worker创建的线程是受限的子线程，所以会有一些使用限制： 
- 同源限制(必须与主线程的脚本文件同源。
- Web Worker无法访问DOM节点；
- Web Worker无法访问全局变量或是全局函数；
- Web Worker无法调用alert()或者confirm之类的函数；
- Web Worker无法访问window、document之类的浏览器全局变量； 
- Worker 线程无法读取本地文件,必须来自网络  
  
不过,Web Worker中的Javascript依然可以使用setTimeout(),setInterval()之类的函数，也可以使用XMLHttpRequest对象来做Ajax通信。  

目前所有主流浏览器均支持 web worker，除了 Internet Explorer。  
> 熟悉Angular的朋友应该都清楚，Angular1最被大家诟病就是它的脏检查机制，当scope的数据量过多时会严重影响性能。而Angular2正是借助WebWorker来把繁重的计算工作移入辅助线程，让界面线程不受影响。

### 线程分类

该线程分为两种：  
- dedicated worker
- shared worker  
- ServiceWorkers 
- *Chrome Workers*
- *Audio Workers*


`dedicated worker`只能被初始化它的js上下文中使用；  

`shared worker`可以在多个js上下文中使用。通常使用的worker是dedicated worker，它的工作情况可以通过chrome的调试工具查看。    

`ServiceWorkers ` 一般作为web应用程序、浏览器和网络（如果可用）之前的代理服务器。它们旨在（除开其他方面）创建有效的离线体验，拦截网络请求，以及根据网络是否可用采取合适的行动并更新驻留在服务器上的资源。他们还将允许访问推送通知和后台同步API。  

`Chrome Workers` 是一种仅适用于firefox的worker。如果您正在开发附加组件，希望在扩展程序中使用worker且有在你的worker中访问  js-ctypes 的权限，你可以使用Chrome Workers。详情请参阅[ChromeWorker](https://developer.mozilla.org/en-US/docs/Mozilla/Gecko/Chrome/API/ChromeWorker)。  

`Audio Workers` （音频worker）使得在web worker上下文中直接完成脚本化音频处理成为可能。

### woker是怎么工作的?

Web Worker 使用起来非常简单，在“主线程”中执行如下操作即可创建一个 Worker 实例，通过监听 onmessage 事件获取消息，通过 postMessage 发送消息：  

“主线程”和Worker 之间通过 postMessage 发送消息，通过监听 onmessage 事件来接收消息，从而实现二者的通信。

核心代码如下：  

主线程中代码  


```
var worker = new Worker('worker.js');
worker.onmessage = function (e) {
    var data = e.data;
}
var messageData = {
    message: 'hello worker!'
};
worker.postMessage(messageData);
```
 
 worker.js 中的代码如下  
 
```
self.onmessage = function(e) {
    var messages = e.data;  // e.data为{message: 'hello worker!'}
    var workerResult = {};
    // do something
    ...
    postMessage(workerResult);
}
```

### 其他api
- 关闭 Worker（为了节省系统资源，必须关闭 Worker。）

```
// 主线程
worker.terminate();
// Worker 线程
self.close();
```
- Worker 加载脚本

```
importScripts('script1.js');
```




