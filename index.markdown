---
layout: default
title: coral's corner
---
<div class="contentBox col-xs-12 col-sm-9  col-md-8 ">
  <h2 style="border-bottom: 1px solid #ddd; padding-bottom:8px;">文章列表</h2>
  <ul class="posts">
    {% for post in site.posts %}
    <li class="clearfix">
      <div class="post-header">
        <h1>
          <a class="post-title-link">{{ post.title }}</a>
        </h1>
        <i></i>发表于：<span>{{ post.date | date_to_string }}</span>
      </div>
      <div class="post-content-preview">
        {{ post.content | strip_html | truncate: 300 }}
      </div>
      <div class="post-button text-center">
        <a class="btn" href="{{ post.url }}" rel="contents">
          阅读全文 »
        </a>
      </div>
    </li>
    {% endfor %}
  </ul>
  <p><b>Find me on:</b></p>
  <ul>
    <li><a href="https://github.com/fengye12">Github</a></li>
  </ul>
</div>
<div class="hidden-xs col-sm-3  col-md-4">
  <div class="clock" style="text-align:center;">
    <canvas id="clock" width="120px" height="120px" style="margin:20px auto"></canvas>
  </div>
  <div class="user-box">
    <h2>coral</h2>
    <div>专注于前端知识分享，微信公众号：前后端技术分享屋</div>
  </div>
</div>