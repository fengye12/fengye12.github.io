---
layout: post
title: 初探下一代web应用模型PWA（含实例）
tags: serviceWorker
categories: js
excerpt_separator:  '[^_^]:more'
---


在各种网站上经常能看到PWA（渐进式web应用）的概念，每次都是大致的过一遍，基本概念是知道的，具体是怎么实现的还没看过，最近正好有时间去研究。

### PWA为什么值得关注？
移动web的优势（SEO，即时性 ，可查找能力，可链接 ，低阻力）为它带来了很多流量，但是它的缺点平均加载时间也会导致损失很多的用户，并且移动网站无法进行推送通知。
而以上问题的解决方案就是渐进式Web App（PWA）

### 什么是PWA？
PWA结合了最好的Web应用和最好的原生应用的用户体验。  
实现pwa技术点：
- Service Workers 开启服务线程，拦截网络请求
- Cache 用于离线缓存
- manifest.json web 应用清单，添加程序到主屏幕
- Push Notification 推送通知

[^_^]:more

### 1. service worker

是一段脚本，web worker的一种，在后台运行。作为一个独立的线程，运行环境与普通脚本不同，所以不能直接参与web交互行为。native app可以做到离线使用、消息推送、后台自动更新，service worker的出现是正是为了使得web app也可以具有类似的能力。  

#### 1.1 service worker可以

1. 后台消息传递 
2. 网络代理，转发请求，伪造响应
3. 离线缓存
4. 消息推送
5.  … …   



#### 1.2 注意事项

1. service worker运行在它们自己的完全独立异步的全局上下文中，也就是说它们有自己的容器。
2. service worker没有直接操作DOM的权限，但是可以通过postMessage方法来与Web页面通信，让页面操作DOM。
3. service worker是一个可编程的网络代理，允许开发者控制页面上处理的网络请求。
4. 浏览器可能随时回收service worker，在不被使用的时候，它会自己终止，而当它再次被用到的时候，会被重新激活。
5. 安全考虑，只能在https下使用，当然localhost除外

#### 1.3 Service Worker生命周期


service worker拥有一个完全独立于Web页面的生命周期  

`install -> installed（安装） -> actvating -> Active -> Activated(激活) -> Redundant(废弃)`
![生命周期](https://img.alicdn.com/imgextra/i3/1641711921/O1CN01jq0pGc1Q3rLp3O2e3_!!1641711921.png)  

1. 注册service worker，在网页上生效 
2. `install` 安装成功，激活 或者 安装失败（下次加载会尝试重新安装）
3. `Activate` 激活后，在sw的作用域下作用所有的页面，首次控制sw不会生效，下次加载页面才会生效。可以处理功能性的事件 fetch、push、sync
4. sw作用页面后，处理fetch（网络请求）和message（页面消息）事件 或者 被终止（节省内存）。

#### 1.4 Service Worker支持使用

[service worker support](https://jakearchibald.github.io/isserviceworkerready/)  

polyfill
使用ServiceWorker cache polyfill让旧版本浏览器支持 ServiceWorker cache API，

#### 1.5 调试

在调试的时候可以用于unregister、stop、start等操作

`chrome application`

![调试](https://img.alicdn.com/imgextra/i2/1641711921/O1CN016pbLnY1Q3rLrFNwGc_!!1641711921.png)

### 2. 离线存储数据

对URL寻址资源，使用[Cache API](https://davidwalsh.name/cache)。对其他数据，使用IndexedDB。

### 3. 离线缓存例子（效果）

想直接看效果的[这里是demo地址](https://github.com/fengye12/service-worker)

目录结构

![目录结构](https://img.alicdn.com/imgextra/i3/1641711921/O1CN01OL5wOt1Q3rLsSSS72_!!1641711921.png)

本地起个服务(`http-server`)直接访问`test.html`


刷新页面成功后控制台出现`installed And cached`说明页面缓存成功了。

再次刷新提示`image cached`说明图片等其他get请求资源缓存成功了

控制台查看状态  
`application->service workers`插件创建的service。  `application->Cache Storage`查看缓存情况

![image](https://img.alicdn.com/imgextra/i1/1641711921/O1CN01IyOdMk1Q3rLp72Ly2_!!1641711921.png)
![image](https://img.alicdn.com/imgextra/i2/1641711921/O1CN01pzGKWO1Q3rLsSgLJB_!!1641711921.png)  

断网  

![image](https://img.alicdn.com/imgextra/i3/1641711921/O1CN01AOpgRy1Q3rLr25zlG_!!1641711921.png)


刷新页面或者从其他页面返回，`页面依然存在`

### 4. 离线缓存例子（原理）

#### 4.1 注册 service worker  
创建一个 JavaScript 文件（比如：sw.js）作为 service worker  
告诉浏览器注册这个JavaScript文件为service worker，检查service worker API是否可用，如果可用就注册service worker  

```
  if ('serviceWorker' in navigator && navigator.onLine) {
    navigator.serviceWorker.register('/sw.js', {scope: '/'}).then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ',    registration.scope);
    }).catch(function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
    }
```
sw.js文件被放在这个域的根目录下，和网站同源。这个service work将会收到这个域下的所有fetch事件。 

如果将service worker文件注册为/example_service/sw.js，那么，service worker只能收到/example_service/路径下的fetch事件。 
如果希望改变它的作用域，可在第二个参数设置 scope 范围。示例中将其改为了根目录，即对整个站点生效。 

#### 4.2 sw.js文件内实现缓存文件  

定义需要缓存的文件，然后在sw注册安装后使用cache Api将资源文件写入缓存。如果所有的文件都被缓存成功了，那么service worker就安装成功了。如果任何一个文件下载失败，那么安装步骤就会失败。


```
var CACHE_NAME = 'main_v1.0.6';

// Assesto catche
var assetsToCache = [
  '/example_service/test.html',
  '/example_service/extend.css',
  '/example_service/offline-sw.js',
  '/service.css',
  '/sw.js',
  'https://g.alicdn.com/sj/qnui/1.3.0/css/sui.min.css',
];

self.addEventListener('install', function(event) {
//  waitUntil()方法接收一个promise对象，直到这个promise对象成功resolve之后，才会继续运行sw.js。
  event.waitUntil(
   //caches是一个CacheStorage对象，使用open()方法打开一个缓存，缓存通过名称进行区分。

    caches.open(CACHE_NAME).then(function(cache) {
     // 获得cache实例之后，调用addAll()方法缓存文件。
        return cache.addAll(assetsToCache);
    }).then(function() {
        return self.skipWaiting();
    })
  );
});
```

#### 4.3 fetch拦截请求

上面只是缓存成功了，我们真正要取缓存中的文件是通过拦截fetch实现的。

```
self.addEventListener('fetch', function (evt) {
  console.log("fetch");
  evt.respondWith(
    caches.match(evt.request).then(function (response) {
      if (response) {
        return response;
      }
      var request = evt.request.clone();
      return fetch(request).then(function (response) {
        // 不成功的请求不缓存
        if (!response || response.status != 200) {
          return response;
        }
        // 缓存图片等其他get请求
        var responseClone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          console.log("image cached")
          cache.put(evt.request, responseClone);
        });
        return response;
      });
    })
  )
});
```

通过监听fetch事件，service worker可以返回自己的响应。  

首先检查缓存中是否已经缓存了这个请求，如果有，就直接返回响应，就减少了一次网络请求。否则由service workder发起请求，这时的service workder起到了一个中间代理的作用。

service worker请求的过程通过fetch api完成，得到response对象以后进行过滤，如果请求结果不是200，就直接返回请求，不会缓存。


如果是正常返回的请求，要先复制一份response，原因是request或者response对象属于stream，只能使用一次，之后一份存入缓存，另一份发送给页面。
这就是service worker的强大之处：拦截请求，伪造响应。fetch api在这里也起到了很大的作用。  
另外需要提到一点，Fetch 请求默认是不附带 Cookies 等信息的，在请求静态资源上这没有问题，而且节省了网络请求大小。但对于动态页面，则可能会因为请求缺失 Cookies 而存在问题。
此时可以给 Fetch 请求设置第二个参数。示例：`fetch(fetchRequest, { credentials: 'include' } )`

> 注意：以上方法，并不会在用户第一次访问网站的时候激活 Service Worker 来控制页面，只有当 Service Worker 安装完成后用户刷新页面或者用户跳转至网站其他页面，才会被激活并且拦截请求


#### 4.4 缓存版本管理
自动更新：
> 如果需要在每次更改 Service Worker 文件后，马上更新所有资源，则可以在 install 事件中执行 self.skipWaiting() 方法跳过 waiting 状态，然后会直接进入 activate 阶段。接着在 activate 事件发生时，通过执行 self.clients.claim() 方法，更新所有客户端上的 Service Worker，参考下边例子  
版本修改的时候会触发activate，将旧版本的缓存清理掉。

```
self.addEventListener('activate', function (event) {
  console.log('activate')
  var mainCache = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      console.log("cacheNames", cacheNames)
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (mainCache.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});
```
手动更新
```
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('successful', registration);
        document.getElementById('btn').addEventListener('click', function() {
            registration.update().then(() => console.log('update'));
        });
    });
}
```
Service Worker 处除了由浏览器触发更新之外，还应用了特殊的缓存策略： 如果该文件已 24 小时没有更新，当 Update 触发时会强制更新。这意味着最坏情况下 Service Worker 会每天更新一次。


>api 解析  
> event.waitUntil() 方法，用来确保 service worker 不会再 waitUntil() 里边的代码执行完毕之前安装完成    
> caches.open(cacheName) 方法用来创建一个名为 cacheName 的缓存，成功后返回 promise  
> cache.addAll([]) 方法用来指定缓存的资源列表  
> self.skipWaiting() 函数强制等待中的 Service Worker 被激活，如果配合 self.clients.claim() 一起使用，可以确保底层 Service Worker 的更新立即生效  

### 5. manifest.json 添加应用至桌面
>web 应用清单是一个简单的 `json `文件，其中包含 `short_name` 以及 `icons` 字段，目的是提供将应用添加至桌面的功能，从而使用户可以无需下载如同原生应用一般从桌面打开 web 应用，只要在 `service worker` 基础上添加一个描述性的配置文件 `manifest.json` 就可以了

#### 5.1 添加到主屏幕功能是浏览器提供的不需要写代码，但是需要满足以下的条件  
1. manifest.json 文件
2. 清单文件需要启动 URL
3. 需要 144x144 的 PNG 图标
4. 网站正在使用通过 HTTPS 运行的 Service Worker
5. 用户需要至少浏览网站两次，并且两次访问间隔在五分钟之上
  
#### 5.2 使用方法 
根目录增加一个文件`manifest.json`,上一个最简单的例子
```
{
    "short_name": "coral pwa", // 用作当应用安装后出现在用户主屏幕上的文本
    "display": "standalone",// 定义应用的显示方式
    "start_url": "/", // 打开后第一个出现的页面地址
    "theme_color": "#999",// 主题颜色，用于控制浏览器地址栏着色
    "background_color": "#666",//  应用加载之前的背景色，用于应用启动时的过渡
    "icons":[
        {
            "src":"/pwa-icon.png",//添加至桌面显示的图标
            "sizes":"144x144", //最小像素144x144
            "type":"image/png" // 非必填
        }
    ]
}
```
html引入

```
 <link rel="manifest" href="/manifest.json" />
```

#### 5.3 提示用户添加应用至桌面
```
// 手动添加，要等到符合规格后才能起效
let savedPrompt = null; // 用来保存 事件
const btn = document.getElementById('btn');
// 添加到主屏幕后响应
window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  savedPrompt = e;
  return false;
});
btn.addEventListener('click', function() {
  if (savedPrompt) {
    console.log(savedPrompt);
    // 异步触发横幅显示，弹出选择框，代替浏览器默认动作
    savedPrompt.prompt();
    // 接收选择结果
    savedPrompt.userChoice.then(result => {
      console.log(result);
    });
  }
});
```
### 6. 推送通知

> 推送通知可以很好的与用户进行互动，尤其是当他们关闭了标签页或访问其他网页的时候，体验类似于原生应用，要给用户发送通知，需要首先通过用户授权

#### 6.1 技术点
1. Notification h5 中用来给用户发送通知
2. push API 获取服务器推送，然后通过 Service Workers 调用 Notification 发送通知
   
#### 6.2 发送通知步骤
1. 浏览器会显示一个提示以询问用户是否愿意接受通知
2. 如果接受，就可以将用户的订阅详细信息保存在服务器上
3. 需要的时候使用订阅信息来发送通知，不同用户、不用设备、不同浏览器订阅信息都不一样

> 注意：如果用户拒绝订阅，那么不但没法向其推送消息，而且下次用户访问网站的时候也不会被提示

#### 6.3 Notification使用
```
// 注册后显示通知
function execute() {
    registerServiceWorker().then(registration => {
        registration.showNotification('notification');
    });
}

window.addEventListener('load', function() {
    // 测试兼容性
    // 支持 serviceWorker
    if (!('serviceWorker' in navigator)) return;
    // 支持 push API
    if (!('PushManager' in window)) return;

    // 获取通知权限
    let promiseChain = new Promise((resolve, reject) => {
        return Notification.requestPermission(result => resolve(result));
    }).then(result => {
        if (result === 'granted') {
            // 有权限就直接执行，弹出通知
            execute();
        } else {
            console.log('no permission');
        }
    });
});

```
`showNotification(title, options) 参数说明`
```
// 注册后显示通知
function execute() {
    registerServiceWorker().then(registration => {
        registration.showNotification('notification', {
            body: 'this is body', // 内容
            icon: '/center.png', // 图标
            badge: '/min.png', // 小图标，手机上展现通知缩略信息时使用
            image: '/max.jpg', // 给用户的预览图
            vibrate: [100, 200, 200, 300], // 设置震动
            requireInteraction: true, // 显示通知直到用户交互
            actions: [
                // 给通知增加一些按钮
                {
                    action: 'f-action',
                    title: 'first-action',
                    icon: '/f.png'
                },
                {
                    action: 's-action',
                    title: 'second-action',
                    icon: '/s.png'
                }
            ]
        });
    });
}

```

#### 6.4 sw中接受消息、监控消息点击、关闭
接收消息
```
// 接收通知并与之互动
self.addEventListener('push', function(event) {
    console.log('get push');
    var payload = event.data ? JSON.parse(event.data.text()) : 'no payload';
    var title = '测试通知！！';

    event.waitUntil(
        // 接收到通知后，显示
        self.registration.showNotification(title, {
            body: payload.msg,
            url: payload.url,
            icon: payload.icon
        })
    );
});

```
监控点击通知
```
self.addEventListener('notificationclick', event => {
    if (!event.action) {
        // 没有点击在按钮上
        console.log('Notification click.');
        return;
    }

    // 对应 registration.showNotification(title, options) 中 options 中设置的按钮
    switch (event.action) {
        case 'f-action':
            console.log('f-action click');
            break;
        case 's-action':
            console.log('s-action click');
            break;
        default:
            console.log('Unknow action click', event.action);
    }
});

```
 监控关闭通知

```
// 点击关闭通知后触发
self.addEventListener('notificationclose', event => {
    console.log('notificationclose');
});
```


### Service Worker 库
- [offline-plugin](https://github.com/NekR/offline-plugin)  
- [sw-toolbox](https://github.com/GoogleChromeLabs/sw-toolbox)  
- [sw-precache](https://github.com/GoogleChromeLabs/sw-precache) 

### 参考资料

- [渐进式 Web App 的离线存储](https://segmentfault.com/a/1190000006640450)
- [service worker初体验](http://www.alloyteam.com/2016/01/9274/)
- [Service Worker API](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)
