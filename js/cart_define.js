define(["jquery","cookie","succ"],function($,cookie,succ){
	function cart(sum,numid){
		if($.cookie('cart')==undefined){
		var obj={};
		}else{
		var s=JSON.parse($.cookie('cart'))
		var obj = s ;
		}			
		if($.cookie('user')==undefined){
			$('.add_cart').attr('href','login.html')
		}else{
			var h=$(window).scrollTop()+$(window).height()/2-$('#addcart').height()/2
			var m=$('.out_cart').index($(this))	
			$('.sucees').css('display','block');
			$('.showdo').css({display:'block',background:'rgba(255, 251, 240, 0.5)'});
			$('.sucees').css("top",h+'px');	
			$('#addcart').css('display','none')
			
			if(obj[numid]==undefined){
				obj[numid]=sum;
			}else{
				var sum2=obj[numid];
				sum += sum2
				obj[numid]=sum
			}
			var objstr=JSON.stringify(obj);	
			$.cookie('cart',objstr,{expires:100000,path:'/'})							
			setTimeout(function(){
			$('.sucees').css('display','none');	
			$('.showdo').css("display","none");				
			},1000);						
			var totle=0;
			var s=JSON.parse($.cookie('cart'))
			for(var sun in s){
				totle+=s[sun];
			}
			$('#shopcart a').html(totle)
		}
	}
	//配送时间
	function data1(){
		data={
			inint:function(){
				this.today()
			},
			today:function(){
			var data=new Date
			var m=data.getMonth();
			var d=Number(data.getDate());
			var h=data.getHours()
			if(h>10){
				$('.tday').parent().css("cursor",' not-allowed')
				$('.tday').parent().css("background",' #eee')
				$('.tday').parent().hover(function(){
					$('.tday').parent().css("background",'#71BCBE')
				},function(){$('.tday').parent().css("background",'#eee')})
			}
			$('.tday').html(m+'-'+d)
			$('.ndat').html(m+'-'+(d+1))
			$('.tomor').html(m+'-'+(d+2))
			this.time()
		},
		time:function(){
			$('#data li').click(function(e){
				if($('#data li').index($(this))<=2){
				$('.shadow').css('display','block')
				$('.mtime').css('display','block')
				$(this).addClass('color').siblings().removeClass('color')
				time($(this).children().eq(3))
				$(this).siblings().children().eq(7,3).css('display','none')
				$(this).siblings().children().eq(3).css('display','none')
				$(this).children().eq(3).css('display','block')
				$('.mtime span').click(function(){
					$('.mtime').css('display','none')
					$('.shadow').css('display','none')
				})
				}
			})
			$('#data li').eq(3).click(function(){
				$(this).siblings().children().eq(7,3).css('display','none')
				$(this).siblings().children().eq(3).css('display','none')							
			})
		}
		}
				
		function time(val){
		var a=$('.houer li').eq(0).offset().top
		var c=$('.houer li').eq(1).offset().top
		var b=$('.houer li').eq(2).offset().top
		for(var i=0;i<$('.houer li').length;i++){		
		if($('.houer li').eq(i).offset().top==a||$('.houer li').eq(i).offset().top==b){
		$('.houer li').eq(i).css('color','#ccc')	
		var vel=$('.houer li').eq(i).html()
		val.html(vel+':00')
			}
		}			
		
		$('.houer').scroll(function(){
		for(var i=0;i<$('.houer li').length;i++){			
		if($('.houer li').eq(i).offset().top==c){
		var vel=$('.houer li').eq(i).html()
		$('.houer li').eq(i).css('color','#000')
		$('.houer li').eq(i+1).css('color','#ccc')
		$('.houer li').eq(i-1).css('color','#ccc')
		val.html(vel+':00')	
				}				
			}
		})	
	}
	data.inint()		
	}
		
	function suss(){
		$('.sucees').css('display','block');
		$('.shadow').css('display','block')
		setTimeout(function(){
		$('.sucees').css('display','none');	
		$('.shadow').css('display','none')
		},1000);	
	}
	return{
		cart:cart,
		data1:data1,
		suss:suss
	}
})