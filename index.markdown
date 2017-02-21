---
layout: default
title: FENGYE'S CORNER
---
<div style="contentBox">
**hi, I am fengye12.Welcom to my blog !**
  <ul class="posts">
    {% for post in site.posts %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
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
