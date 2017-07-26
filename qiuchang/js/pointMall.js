// JavaScript Document
$(document).ready(function(e) {
var currYear = (new Date()).getFullYear();
    var setDate=$(".date1")
var dd = new Date();
  var Year=dd.getFullYear();
  var Month=dd.getMonth()+1;
  var day=dd.getDate();
setDate.val(Year+"-"+Month+"-"+day)
    $("#date").mobiscroll({ preset: 'date',
      theme: 'android-ics light', //皮肤样式
            display: 'bottom', //显示方式
            mode: 'scroller', //日期选择模式
            lang: 'zh',
            startYear: currYear - 10, //开始年份
            endYear: currYear + 1 ,//结束年份
            cancelText: '取消',
            minDate: new Date(),
            maxDate:new Date(2017,2,31)

   })
    var tips=$(".tip-wrap .tips")
    var tipWrap=$(".tip-wrap")
    tipWrap.on("click",function(event){
    	// event.preventDefault()
        tipWrap.fadeOut(200)
    })
    tips.on("click",function(e){
        e.stopPropagation();
    })
    var duihuan=$(".cp3 img")
    duihuan.on("click",function(){
    tipWrap.fadeIn(200)
    })
//点击更多
$("#more1").click(function(e) {
	$('#morek').show();
	$(".lplm").hide();
    });
	//点击返回
$("#fh").click(function(e) {
        $('#morek').hide();
	$(".lplm").show();
    });
//点击商品更多
//
$("#more2").click(function(e) {
        $('#moreS').css('display','block');
		$(".lplm").hide();
		$("#morek").hide();
    });
$("#spfh").click(function(e) {
        $('#moreS').hide();
	$(".lplm").show();
    });
//	点击礼品类目和我可兑换
var myPoint = sessionStorage.getItem('score');
console.log(myPoint)
if(myPoint==null||myPoint==""){
	myPoint=1;
}
	var flag=1;
    $("#span1").click(function() {
		flag=0;
		$(".parent").find('.jfz').closest('li').css('display','block');
        $("#span1").css("border-bottom","2px solid #ff5400");
		 $("#span2").css("border","none");
		 $(".wkdh").hide();
		 $(".lplm").show();
		 $('#morek').hide();
		  $('#moreS').hide();
    });
	$("#span2").click(function() {
		$(".parent").find('.jfz').closest('li').css('display','block');
		 $('#morek').hide();
    		 $(".lplm").hide();
        $("#span2").css("border-bottom","2px solid #ff5500");
		 $("#span1").css("border","none");
		 $(".lplm").hide();
		 $(".wkdh").show();
		  $('#morek').hide();
		  $('#moreS').hide();
		// 点击我可兑换后显示的内容列表
		if(flag==1){
		var arry=new Array();
		$("#lplm").find(".jfz").each(function(index, element) {
            if($(this).text()<=myPoint){
            	 //前台js去掉2016-10 替换后台数据
            	//var zjHtml=$(this).closest("li").html();
            	//$("#wkdh").append('<li>'+zjHtml+'</li>')

            	}
        });
		// getVoucher(0,500);//初始显示0-500积分
		// 	flag=0;
	}
    });
	//点击积分区间
	var x1;
	var x;
	var a1;
	var a2;
	var j;
	$('#wrap').find('p').click(function(e) {
        a1=parseInt($(this).text().split('~')[0]);
        a2=parseInt($(this).text().split('~')[1]);
	/*前台固定JS去掉 2016-10月*/
     $(".parent").find('.jfz').closest('li').css('display','block');
        for(var r=0;r<$(".parent").find('.jfz').length;r++){
			var nn=parseInt($(".parent").find('.jfz').eq(r).text());
			if((nn<a1)||(nn>a2)){
			$(".parent").find('.jfz').eq(r).closest('li').hide();
			}}
	 		// getVoucher(a1, a2);
    });
	//我的分以上的积分区间不能点击样式灰化
	var pointArray=new Array;
	pointArray=[0,500,2000,10000,50000]
	for(i=0;i<5;i++){
		if(pointArray[i]>=myPoint){
			j=i;
			break;
		}
	}
	for(j;j<$('#wrap').find('p').length;j++){
		$('#wrap').find('p').eq(j).unbind('click');
		$('#wrap').find('p').eq(j).css('color','#ccc');
	}

});
   function datechange(el){
  var newD=$(el).val();
  $(".date1").val(newD);
 }

