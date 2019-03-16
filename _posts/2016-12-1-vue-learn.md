---
layout: post
title:  易用、高效、灵活的vue
excerpt_separator:  '[^_^]:more'
categories: 框架
tags: vue
---
<style>
    img{
        max-width: 100%;
    }
</style>
####  简单介绍
vueJS是一种轻量级的MVVM框架，它同时吸收了react和angular的优点，强调了react组件化的概念，可以轻松的实现数据和展现的分离。也吸收了angular灵活的指令和页面操作的一些方法。
实现双向数据绑定，目前主要有三种方式：脏检查、观察机制、封装属性访问器
脏检查：框架将所有需要监控的属性放在一个序列中，当发生特定事件时，遍历整个序列，对被监控的属性做对比，如果发生变化，则调用相应的处理函数。
观察机制：通过 Object.observe() 「已废弃」方法对对象进行监控，一旦其发生变化，将会执行相应的handler。
封装属性访问器：使用 Object.defineProperty 将对象的属性转换为 getter/setter ，当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。
vue易用、高效、灵活
高效：
文件很小16kb min+gzip的运行大小
超快虚拟DOM
灵活---渐进式
[^_^]:more
<img src="/images/vue-1.png" alt="" />
解决很多问题 行驶ajax的功能,可以实现与后台的交互用到vue -resourse
做单页面的时候要用到vue-router插件
项目组够复杂我们就用v-x
最后用bulid工具来构建系统
从简单到复杂用什么安装什么
#### vue.js的一个组件
.vue文件其实就是一个vue.js的组件，相当于HTML + javascript + css
#### 安装
命令行工具
解决npm国内网络慢的问题。http://npm.taobao.org/  以后使用要用cnpm代替npm就ok
接下来就可以用：$ cnpm install --global vue-cli
<pre>
# 全局安装 vue-cli
$ cnpm install --global vue-cli
# 创建一个基于 webpack (打包工具)模板的新项目
$ vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ cnpm install
$ cnpm run dev
</pre>
#### 从.vue到页面
<img src="/images/vue.png" alt="" />
#### vue组件的重要选项data、methods、watch
vue所有的数据都是放在data里面的

<img src="/images/data.png" alt="" />
#### 模板指令--html和vue对象额粘合剂
数据渲染v-text、v-html、{{}}]

<img src="/images/html-vue.png" alt="" />
#### 模板指令--v-if/v-show

<img src="/images/vi-v-show.png" alt="" />
#### 模板指令--v-for

渲染循环列表

<img src="/images/v-for.png" alt="" />
#### 模板指令--v-on
事件绑定

<img src="/images/for-on.png" alt="" />
#### 模板指令--v-bind
属性绑定

<img src="/images/bind.png" alt="" />
思考上面的变量哪些是字符串哪些是布尔值
#### 总结

<img src="/images/1-zj.png" alt="" />

#### 组件
只有注册了组件才能在html上使用
#### .vue 开发的组件 怎么加到已有的项目里去？
比如你开发了一个header.vue组件，当你需要应用这个组件时需要import header from "路径/header"，别忘了在引用的文件中注册：components: {header }

#### 如何划分组件

<img src="/images/zujian.png" alt="" />
#### 组件调用

<img src="/images/diaoyong.png" alt="" />
#### 组件之间的通信
父组件向子组件传递信息（参数）

<img src="/images/tongxin.png" alt="" />
子组件向父组件传递信息（参数）
<pre>
    vm.$on('test', function (msg) {
      console.log(msg)
    })
    vm.$emit('test', 'hi')
    // -> "hi"  $emit触发当前实例上的事件。附加参数( hi )都会传给监听器回调。
</pre>

####vue2.0 vue-router
<pre>
<router-link to="/goods">商品</router-link>//相当于a
<router-link to="/seller">商家</router-link>
<router-link to="ratings">评论</router-link>
<router-view></router-view>//展示窗口
import VueRouter from 'vue-router';//引进路由
Vue.use(VueRouter);//使用路由
let routes = [//设置路由
 { path: '/goods', component: goods },
 { path: '/ratings', component: ratings },
 { path: '/seller', component: seller }
];
let router = new VueRouter({//实例化一个路由
'linkActiveClass': 'active',//当前的class
  routes: routes
});
 new Vue({//初始化一个vue实例并挂载
    el: '#app',
  router,
  template: '<App/>',
  components: { App }
  // render: h => h(App)
});
router.push('/goods');//默认显示
</pre>
####vue2.0 ref
<pre>
<div ref="menuWrapper">
    <div class="food-list-hook"></div>
</div>
</pre>
在dom中定义了ref之后
就可以通过：
<pre>
let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');方式去获得她以及她的子元素
</pre>
#### nextTick
当要计算跟dom相关的东西的时候，要保证我们的dom已经渲染上去（虽然说vue中dom中有自然映射
但是实际dom发生变化是在nextTick之后）所以此时到调用nextTick( () => {})这个接口，这样比较安全
#### created
创建实例，但还未挂载
#### Vue脚手架与组件库收藏
【饿了吗Vue组件库 element】，外观简洁大方，包含大部分常用组件










