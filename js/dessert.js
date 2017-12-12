require(["config"],function(){
	require(["jquery","load","cookie","cart"],function($,load,cookie,cart){	
	var dessert={
		init:function(){
		this.nav()
		this.main()
		},
		//导航
		nav:function(){
			setTimeout(function(){
			$('.menu li').eq(1).addClass('color')				
		},100)
		},

		main:function(){
			var main_cont=$('#main_cont');					
			//主要内容区
			$.ajax({
				type:"get",
				url:"../mock/dessert.json",	
				success:function(data){
				var str='';
				for(var j=0;j<58;j++){
					str+='<li class="boss"><a class="out_a">'+
							'<div class="outbig"><img src='+data[j].pic+' class="bimg"/></div>'+
							'<div class="mword">'+
								'<p>'+data[j].enle+'</p>'+
								'<p>'+data[j].chle+'</p>'+
							'</div>'+
							'<div class="pro_box">'+
								'<div class="left">'+
									'<p>'+data[j].cont+"/"+data[j].pric+'</p>'+
									'<p>甜蜜指数：</p>'+
								'</div>'+					
								'<span class="out_cart"><a href="##"></a></span>'+
							'</div>'+
							'<div class="over"><img src="../img/index/shouqing.png"/></div>'+
						'</a></li>'+//购物车详情
						'<ul class="try_it" data-id='+data[j].id+'>'+
									"<li class='close'></li>"+
									"<li>Please select the number of pounds:</li>"+
									"<li>选择您要订购的磅数</li>"+			
									"<li>"+data[j].cont+"</li>"+									
									"<li>需提前6小时预订</li>"+
									"<li>"+data[j].eat+"</li>"+
									"<li>"+data[j].figer+"</li>"+
									"<li>"+data[j].pric+"</li>"+
									"<li>数量<span class='jian'>-</span><em>1</em><span class='add'>+</span></li>"+
									"<li><a href='##' class='add_cart'>加入购物车</a><a href='##' class='to_buy'>立即购物</a></li></ul>"
					}
				
				main_cont.html(str);
				$('.try_it').css('display','none')
				$('out_a').css('display','block')
				//点击购物车出现对应的购物车弹框
				$('.outbig').click(function(){				
					var j=$('.outbig').index(this)
					$.cookie("detail",data[j].id)
					$(this).parent().attr('href','detail001.html?cakeId='+data[j].id)
				})

				$('.out_cart').click(function(){
					//获取当前坐标的索引
					var m=$('.out_cart').index($(this))	
					//点击出现addcart和showdo
					$('#addcart').css("display","block")
					$('.showdo').css("display","block")
					//addcart里面出现当当前点击的内容
					var add_cont=$(this).parent().parent().parent().next()
					$('#addcart').html( $('.try_it').eq(0).css('display','block'))
				
					var t=$(window).scrollTop()
					var h=$(window).scrollTop()+$(window).height()/2-$('#addcart').height()
					$('#addcart').css("top",h+'px')
					//然#addcart始终居中
					$(window).scroll(function(){
					var t=$(window).scrollTop()
					var h=$(window).scrollTop()+$(window).height()/2-$('#addcart').height()
					$('#addcart').css("top",h+'px')
					})
					
					//点击加号数字加加
					var a=$('.try_it em').html();
					$('.add').click(function(){
						a++;
						$('.jian').css({border:'1px solid #1B8C86',color:'#1B8C86'})
						$('.try_it em').html(a)
					})
					//点击减号
					$('.jian').click(function(){
						a--;
						if(a<=1){
							a=1;
							$('.jian').css({border:'none',color:'#ccc'})
						}else{
							$('.jian').css({border:'1px solid #1B8C86',color:'#1B8C86'})
						}
						$('.try_it em').html(a)
					})
					
					//加入购物车&立即购买
					$('.add_cart').hover(function(){
						$('.add_cart').html('Add to cart')
					},function(){
						$('.add_cart').html('加入购物车')
					})
					
					$('.to_buy').hover(function(){
						$('.to_buy').html('Purchase immediately')
					},function(){
						$('.to_buy').html('立即购买');
					})
					//如果没有登录跳转到登录页面
					
					$('.to_buy').click(function(){
						$('#addcart').css('display','none')
						if($.cookie('user')==undefined){
							$('.to_buy').attr('href','login.html')
						}else{
							var cont=$('.jian').next().html()
							var j=$('.to_buy').index(this)
							$('.to_buy').attr('href','pay_now.html?cpId='+data[j].id+'&n='+cont)
							//console.log($('.to_buy').index())
						}	
					})
					
					//加入购物车
					$('.add_cart').click(function(){
						//调用购物车
						var id=$('.try_it').eq(m).attr('data-id')
						var cont=Number($('.try_it em').html());
						cart.cart(cont,id)
					})
					//
					$('.showdo').css({display:'block',background:'rgba(10, 10, 10, 0.5)'})
										
					//点击×关闭addcart和showdo
					var close=$('.try_it').eq(0).children().eq(0)
					close.click(function(){
						$('#addcart').css("display","none")
						$('.showdo').css("display","none")
					})
				})
								
								
				//鼠标滑动图片时改变图片大小
				var outbig=$('.outbig')
				main_cont.on('mouseenter','.outbig',function(){				
					$(this).children().stop().animate({'width':'120%','height':'120%'})
				})
				main_cont.on('mouseleave','.outbig',function(){				
					$(this).children().stop().animate({'width':'100%','height':'100%'})
				})
								
				//鼠标划入li 购物车出现			
				main_cont.on('mouseenter','.outbig',function(){	
					$(this).parent().next('.pro_box').stop().animate({'bottom':'54px'})
				})
				
				main_cont.on('mouseleave','.boss',function(){				
					$('.pro_box').css('bottom',0)
				})
				
				//告罄
				for(var i=0;i<outbig.length;i++){					
					if(data[i].selout==0){
					$('.over').eq(i).css('display','block')			
						}
					}				
				}					
			});			
		},
	}
	dessert.init()
	})
})


