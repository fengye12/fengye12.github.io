---
layout: default
title: FENGYE'S CORNER
---
<div style="contentBox">
<h3>hi, I am fengye12.Welcom to my blog !</h3>
  <ul class="posts">
    {% for post in site.posts %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a>
      <div class="post-content-preview">
            {{ post.content | strip_html | truncate:100 }}
        </div>
        <p class="post-meta">
            Posted by {% if post.author %}{{ post.author }}{% else %}{{ site.title }}{% endif %} on {{ post.date | date: "%B %-d, %Y" }}
        </p>
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
