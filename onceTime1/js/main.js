var init = function(){
	requestData();
	action();
	//首页的倒计时截止日期年月日时分秒
	leftTimer(2017,12,11,11,11,11)
}
var requestData = function(){

}
var leftTimer = function(year,month,day,hour,minute,second){
	 var leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数 
	 var days;
	 var hours;
	 var minutes;
	 var seconds;
	 if(leftTime <= 0){
       days = 00;
       hours = 00;
       minutes = 00;
       seconds = 00;
	 }
	 else{
	 days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
	 hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
	 minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
	 seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
	 days = checkTime(days); 
	 hours = checkTime(hours); 
	 minutes = checkTime(minutes); 
	 seconds = checkTime(seconds); 
	 setInterval("leftTimer(2017,12,11,11,11,11)",1000); 
	}
	 $('.least-time').html(days+"天" + hours+"小时" + minutes+"分"+seconds+"秒"); 
} 
var checkTime = function(i){
  if(i<10){
  	i = "0" + i;
  }
  return i;
}
var action = function(){
	//导航栏的切换
	$('.navbar').click(function(){
		$(document).scrollTop(0);
		$('.nav-pic').eq(0).attr('src','../images/grey1.png');
		$('.nav-pic').eq(1).attr('src','../images/grey2.png');
		$('.nav-pic').eq(2).attr('src','../images/grey3.png');
		$('.nav-pic').eq(3).attr('src','../images/grey4.png');
		$('.name').css('color','rgb(138,138,138)');
		var index = $(this).index();
		$('.nav-pic').eq(index).attr('src','../images/blue' + (index + 1) +'.png');
		$('.name').eq(index).css('color','rgb(76,161,236)');
        $('.more').hide();
		if(index!=3){
			$('.sections').hide();
			$('.sections').eq(index).show();
			$('.shade').hide();
			$('.item-content').hide();
	    }
	    else{
	    	$('.search').show();
	    	$('.shade').show();
	    	$('.shade').height($(window).height() - 50);
	    }

	})


	 //选择地区进行投票
	 $('.regions-li').click(function(){
	 	var index = $(this).index();
	 	 $('.regions-li').css({
	 	 	"border": "1px solid black",
	 	 	"color": "black"
	 	 })
	 	 var region = '';
 		 $(".regions-li").eq(index).css({
            "border": "1px solid rgb(76,161,236)",
            "color": "rgb(76,161,236)"
         });
	 })

	 //查看更多
	 $('.readsMore').click(function(){
	 	 $('.vote').hide();
	 	 $('.more').show();
	 })
	 
	 //投票点赞按钮的切换
	 // $("body").on('click', '.light', function(event) {
	 $('.light').click(function(){
	 	 var event = event || window.event;
         event.stopPropagation();
        if($(this).hasClass('extra')){
            $(this).css({
                "background": "url(../images/favor.png)",
                "background-size": "100% 100%"
            });
		 	var favorNumbers = parseInt($(this).siblings().html()) - 1;
		 	$(this).siblings().html(favorNumbers);
		 	$(this).removeClass('extra');
        }
        else{
        	$(this).css({
                "background": "url(../images/favor2.png)",
                "background-size": "100% 100%"
            });
		 	var favorNumber = parseInt($(this).siblings().html()) + 1;
		 	$(this).siblings().html(favorNumber);
		 	$(this).addClass('extra');

        }
	 	
	 })
	 //建言按钮点击
	$('.commend').click(function(){
	 	var event = event || window.event;
	 	event.stopPropagation();
	 	$('.vote').hide();
	 	$('.footer').hide();
	    $('.recommend').show();
	    $('.recommend-text').val('');
	    $('.more').hide();
	 })
	 //搜索框点确认，按钮消失
	 $('.confirm').click(function(){
        $('.search').hide();
        $('.shade').hide();
        $('.sections').hide();
        $('.item-content').show();
	 })
	 //详情页展示
	 $('.list-item').click(function(){
	 	$(document).scrollTop(0);
	 	$('.vote').hide();
	 	$('.footer').hide();
	 	$('.more').hide();
        var detail_id = $(this).attr("data-id");
        $('.item-content').show();
	 })

	 //详情页返回首页
	 $('.return').click(function(){
	 	$(document).scrollTop(0);
	 	$('.vote').show();
	 	$('.footer').show();
	 	$('.item-content').hide();

	 })
	 //建言返回首页
	 $('.return-recommend').click(function(){
	 	$(document).scrollTop(0);
	 	$('.vote').show();
	 	$('.footer').show();
	 	$('.recommend').hide();
	 	 $('.submit-recommend').css({
                'background-color':'rgb(230,229,229)',
                'color':'rgb(158,150,150)'
          });
       	 $('.submit-recommend').attr('disabled',true);
	 })
	 //建言输入框之后
	 $('.recommend-text').bind('input propertychange',function(){
       if($('.recommend-text').val().length > 0){
       	 $('.submit-recommend').css({
                'background-color':'rgb(18,130,208)',
                'color':'white'
          });
       	  $('.submit-recommend').attr('disabled',false)
       }
       else{
       	 $('.submit-recommend').css({
                'background-color':'rgb(230,229,229)',
                'color':'rgb(158,150,150)'
          });
       	 $('.submit-recommend').attr('disabled',true);
       }
	 })

	 //提交按钮提示
	 $('.submit-recommend').click(function(){
	    $('.recommend-success').show()
	 })

	 $('.confirm-success').click(function(){
	 	$('.recommend-success').hide();
	 })

	 //排行版页面左右切换
	 var count_left = 0; //向左按钮的点击次数
	 var count_right = 0; //向右按钮的点击次数
	 var city_number = 7; //总共的城市的数量
	 $('.left').click(function(){
	 	 count_left += 1;
	 	 var total_number = -count_left + count_right;
	 	 if(total_number >= 0){
	 	   $('.ranks-list-ul').css('margin-left', -total_number*220+"px");
	 	}
	 	else{
	 		count_left = 0;
	 		count_right = 0;
	 	}

	 })
	 $('.right').click(function(){
	 	count_right += 1;
	 	var total_number = -count_left + count_right;
	 	if(total_number < city_number){
	 	 $('.ranks-list-ul').css('margin-left', -total_number*220+"px");
	 	}
	 	else{
	 		count_right = city_number -1 ;
	 		count_left = 0;
	 	}
	 })
}
$(function() {
    init();
});