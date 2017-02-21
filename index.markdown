---
layout: default
title: FENGYE'S CORNER
---
<div style="width:80%;margin:0 auto">
hi, I am fengye12.Welcom to my blog !

<p><br /><b>My Blog:</b></p>
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
<p><br /><b>Contact Information:</b></p>

<blockquote>
欢迎所有朋友加我微信：zjs123zjs1234
</blockquote>
</div>
[oss]:http://en.wikipedia.org/wiki/Open_source
