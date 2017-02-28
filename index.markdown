---
layout: default
title: FENGYE'S CORNER
---
<div class="contentBox col-xs-12 col-sm-10  col-md-8 ">
<h1 style="margin-bottom: 0;">文章列表</h1>
  <ul class="posts">
    {% for post in site.posts %}
      <li class="clearfix">
      <div class="leftD">
        <img src="{{page.leftImg}}"/>
      </div>
      <div class="rightD">
    <h3>
        {{ post.title }}
    </h3>
    <div class="post-content-preview">
          {{ post.content | strip_html | truncate:100 }}
      </div>
      <p class="post-meta">
      <!-- <span>{{ post.date | date_to_string }}</span> --><!--  &raquo; -->
          <!-- Posted by {% if post.author %}{{ post.author }}{% else %}{{ site.title }}{% endif %} -->
        <span>{{ post.date}}</span><span><a href="{{ post.url }}">阅读全文</a></span>
      </p>
      </div>

      </li>
    {% endfor %}
  </ul>

<!-- {% highlight console %}
$ git clone ...
{% endhighlight %}
{% highlight ruby %}
put hello
{% endhighlight %} -->
<p><b>Find me on:</b></p>
<ul>
<li><a href="http://github.io/fengye12/">Github</a></li>
</ul>
<p><b>Contact Information:</b></p>
<blockquote>
欢迎所有朋友加我微信：zjs123zjs1234
</blockquote>
</div>
