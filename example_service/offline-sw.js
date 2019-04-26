// 注册 serviceWorker
var registe = null;
function registerServiceWorker () {
  return navigator.serviceWorker
    .register('/sw.js')
    .then(registration => {
      console.log('success registe serviceworker');
      registe = registration;
      return registration;
    })
    .catch(err => console.error('Unable to register service worker.', err));
}

// 注册后显示通知
function execute () {
  registerServiceWorker().then(registration => {
    // 延缓一下，可能sw还没激活
    setTimeout(function () {
      registration.showNotification && registration.showNotification('我的博客实现了离线缓存哦');
    }, 1000)
  });
}

window.addEventListener('load', function () {
  // 测试兼容性
  // 支持 serviceWorker
  if (!('serviceWorker' in navigator)) {
    alert('no serviceWorker');
    return;
  }
  // 支持 push API
  if (!('PushManager' in window)) {
    alert('no PushManager');
    return;
  }

  // 获取通知权限
  let promiseChain = new Promise((resolve, reject) => {
    // 允许通知提示
    return Notification.requestPermission(result => resolve(result));
  }).then(result => {
    if (result === 'granted') {
      // 有权限就直接执行，弹出通知
      execute();
    } else {
      alert('no permission');
    }
  });
});


$('body').on('click', '#btnUpdate', function () {
  registe.update().then(() => alert('update'));
})


// 手动添加，要等到符合规格后才能起效
let savedPrompt = null; // 用来保存 事件
// 添加到主屏幕后响应
window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault();
  savedPrompt = e;
  return false;
});

$('body').on('click', '#btn', function () {
  if (savedPrompt) {
    // 异步触发横幅显示，弹出选择框，代替浏览器默认动作
    savedPrompt.prompt();
    // 接收选择结果
    savedPrompt.userChoice.then(result => {
      console.log(result);
    });
  }
})


