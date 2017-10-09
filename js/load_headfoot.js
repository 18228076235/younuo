define(["jquery","cookie"],function($){
	$.ajax("inclued/head.html").then(function(data){
		$(".header").html(data)
	}).then(function(){
	window.onload=function(){
	var head={
		init:function(){
			this.ear()
			this.nav()
		},
		//点击地址
		ear:function(){	
		$('#ear').css('cursor','pointer')	
		$('#ear').click(function(){
		$('.list-cont').css({display:'block',cursor:'pointer'});
		var nowear=$('.list-cont em')
		nowear.click(function(){
			$('#ear').html($(this).html())
			$('.list-cont').css('display','none')
				})		
			})
		},
		//点击导航
		nav:function(){
			$('.menu li').click(function(){
				$(this).addClass('color').siblings().attr('class','')				
			})
		}
	}
	head.init()
		
	//得到cooki	
	
	 user_co()
	function user_co(){		
	if($.cookie('user')!=undefined){		
		$('.top_ce').css('display','none')
		$('.top_ce').parent().css('width','248px')
		$('.top_login').html('欢迎您:'+$.cookie('user'))
		$('.top_regset').css('display','none');
		var a='<a class="back">[退出]</a>'
		$('.top_ce').next().append(a)
		/*$('.top_ce').next(a)*/
		$('.back').click(function(){
			$.cookie('user','')			
			})		
			}	
		}	
		//购物车数量
		var totle=0;
		var s=JSON.parse($.cookie('cart'))
		for(var sun in s){
			totle+=s[sun];
		}
		$('#shopcart a').html(totle)
		}
	})
	$(".footer").load("inclued/foot.html");
	
})