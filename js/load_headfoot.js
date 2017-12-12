define(["jquery","cookie"],function($){
	$.ajax("inclued/head.html").then(function(data){
		$(".header").html(data)
	}).then(function(){
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
				$(this).addClass('color').siblings().removeClass('color')				
			})
		}
	}
	head.init()
		
	//得到是否登录成功的cooki		
	 user_co()
	function user_co(){
	if($.cookie('user')!=undefined){
		//如果登录显示购物车的数量
		cart()
		$('.top_ce').css('display','none')
		$('.top_ce').parent().css('width','248px')
		$('.top_login').html('欢迎您:'+$.cookie('user'))
		$('.top_regset').css('display','none');
		var a='<a class="back">[退出]</a>'
		$('.top_ce').next().append(a)
		$('.back').css('cursor','pointer');
		//点击退出
		$('.back').click(function(){
			 $.cookie('user', '', { expires: -1,path:'/' }); 
			 //退回首页
			 $('.back').attr('href','index.html')
		})		
		}	
	}
	//显示购物车的数量
	function cart(){
		var totle=0;
		var s=JSON.parse($.cookie('cart'))
		for(var sun in s){
			totle+=s[sun];
		}
		$('#shopcart a').html(totle)
		$('#shopcart a').attr('href','cart.html')
	}
	
	})
	//加载尾部
	$(".footer").load("inclued/foot.html");	
})