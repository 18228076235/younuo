require(["config"],function(){
	require(["jquery","load","cookie","cart"],function($,load,cookie,cart){
	//放大镜
	var fdj={
		init:function(){
			this.chang();
			this.move()
		},
		chang:function(){
			$('.btn li img').click(function(){
			var img=$(this).attr('src');
			var bimg=$(this).attr('data-src')
			$('.mid li img').attr('src',img)
			$('.big img').attr('src',bimg)
			})
		},
		move:function(){
			$('.mid').bind({
				'mouseenter':function(){
				$('.filter').css('display','block')
				$('.big').css('display','block')
				},
				'mousemove':function(e){
				var scroll=$(window).scrollTop()
				var mid=$('.mid')
				var a=mid.offset()
				var l= e.clientX-a.left-$('.filter').outerWidth()/2;
				var t= e.clientY-a.top-$('.filter').outerHeight()/2+scroll;
				if(l<=0){
					l=0
				}if(l>=mid.outerWidth()-$('.filter').outerWidth()){
					l=mid.outerWidth()-$('.filter').outerWidth()
				}if(t<0){
					t=0
				}if(t>=mid.outerHeight()-$('.filter').outerHeight()){
					t=mid.outerHeight()-$('.filter').outerHeight()
				}
				$('.filter').css({top:t,left:l})
				$('.big img').css({top:-2*t,left:-2*l})
				},
				'mouseleave':function(){
				$('.filter').css('display','none')
				$('.big').css('display','none')	
				}
				
			})			
		}
	}
		
	//时间
	var data={
		init:function(){
			this.add_cart()
			this.focus()
			this.cookie()
			this.other()
			//调用时间
			cart.data1()
		},

		add_cart:function(){
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
		},
		focus:function(){
			$('.color_c').click(function(){
				$('.color_c').css("border-bottom","3px #7b9196 solid")
				$('.color_b').css("border-bottom","3px #D9E8EB solid")
				$('.btn_focus').css('display','block')
				$('.btn_danger').css('display','none')
			})
			$('.color_b').click(function(){
				$('.color_b').css("border-bottom","3px #7b9196 solid")
				$('.color_c').css("border-bottom","3px #D9E8EB solid")
				$('.btn_focus').css('display','none')
				$('.btn_danger').css('display','block')
			})
		},
		cookie:function(){		
			//var id=location.search
			var reg=/cakeId=(\w*)/g
			var resoult=reg.exec(location.search)
			var dataId=resoult[1]
			$.ajax({
				type:"get",
				url:"../mock/dessert.json",
				success:function(data){				
					for(var i=0;i<data.length;i++){
						if(data[i].id==dataId){	
							$('.en').html(data[i].enle)
							$('.cn').html(data[i].cnle)
							$('.pirc').html('￥'+data[i].pric)
							$('.count').html(data[i].cont)
							$('.figer').html(data[i].figer)
							$('.eat').html(data[i].eat)
						}
					}
															
					var pirc=Number($('.pirc').html().substring(1));
					add_cut()
					function add_cut(){
						$('.cut').click(function(){	
						var cont=Number($('.cont_vau').val());	
						cont--;
						if(cont<=1){
							cont=1
							$('.cut').css('background',"url(../img/index/icon.png) -7px -282px #F2F6F7")
						}						
						$('.cont_vau').val(cont)
						sun(cont)
					})
					$('.add_top').click(function(){
						var cont=Number($('.cont_vau').val());	
						cont++;
						$('.cont_vau').val(cont)
						sun(cont)			
						if(cont>1){
							$('.cut').css('background',"url(../img/index/icon.png) -7px -252px #F2F6F7")
						}	
					})
					}					
					function sun(cont){
						var sum=0;
						sum=(pirc*cont).toFixed(1)
						$('.pirc').html('￥'+sum)						
					}
					
					$('.add_cart').click(function(){
						//调用购物车
						var cont=Number($('.cont_vau').val());	
						cart.cart(cont,dataId)
						cart.suss()
					})
				}
			});
		},
		other:function(){
			$.ajax({
				type:"get",
				url:"../mock/detail.json",
				success:function(data){
					var str='';				
					var reg=/cakeId=(\w*)/
					var resoult=reg.exec(location.search)
					var dataId=resoult[1]
					for(var i=0;i<data.length;i++){
						if(data[i].id==dataId){
							str+='<div class="mid">'+
								'<li><img src='+data[i].mg[0]+'></li>'+
								'<div class="filter"></div>'+			
							'</div>'+
							'<ul class="btn">'+
							'</ul>'+
							'<div class="big">'+
								'<img src='+data[i].bg[0]+'>'+
							'</div>'
							
							$('.bbg').attr('src',data[i].bbg)
							$('.other').attr('src',data[i].other)
							if(data[i].word!=undefined){
								$('.word').html(data[i].word)
								}
							}
						}
					
					$('.left .img').html(str)
					var btnstr=''
					for(var i=0;i<data.length;i++){
						if(data[i].id==dataId){
							for(var k=0;k<data[i].mg.length;k++){
								btnstr+='<li><img src='+data[i].mg[k]+' data-src='+data[i].bg[k]+'>'
								
							}
						}
					$('.btn').html(btnstr)	
					}
					
					fdj.init()	
				}
			});
		}
		
	}
	
	data.init()
	
	})
})
