---
layout: post
title: 前端小插件
excerpt_separator:  '[^_^]:more'
categories: js
tags: 插件
---

#### 代码改动比较的插件，直接在线使用就好

[https://www.diffchecker.com](https://www.diffchecker.com/ "diffchecker")
<br>
#### 下拉刷新

第一步：
{% highlight console %}
$.ajax({
            url: basePath + '你自己的url',
            type: 'get',
            async: true,
            cache: false,
            dataType: 'json',
            data:{curpage:curpage,rows:rows},
            success: function(jsondata) {
                if(jsondata.code==1){
                var investStatus="";
                totalCount= jsondata.obj.totalCount;
                var dataList=jsondata.obj.data;
                for(var i=0;i<dataList.length;i++){
                    if(dataList[i].status==2){
                        investStatus="立即投资";
                    }else{
                        investStatus="已抢光";
                    }
                    var html='<li data-id="'+dataList[i].id+'" data-status="'+dataList[i].status+'"><span><input name="'+dataList[i].id+'" type="checkbox" data-status="'+dataList[i].status+'"/></span><span>'+dataList[i].amount+'</span><span>'+isDayOrMonth(dataList[i].isDayLoan,dataList[i].periods)+'</span><span>'+dataList[i].process+'</span><span>'+investStatus+'</span></li>';
                    $("#mainList").append(html);

                }
              }
            }
        });
{% endhighlight %}
[^_^]:more
第二步：
{% highlight ruby %}
//下拉刷新
    $(window).scroll(function(){
        console.log("下拉刷新");
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
            if (curpage * rows < totalCount) {
                getData(++curpage);
            };
        }
    });
{% endhighlight %}
