require(["config"],function(){
	require(["jquery","load"],function(){
		//	找到购物车的cookie
		$.ajax({
			type:"get",
			url:"../mock/dessert.json",
			success:function(data){
			var coo=JSON.parse($.cookie('cart'))
			var str='';
			for(var i=0;i<data.length;i++){
				for(k in coo){
				if(data[i].id==k){	
					str+='<ul class="boss" data-id='+data[i].id+'>'+
						'<li><img src='+data[i].pic+'></li>'+
						'<li>'+
							'<a href="##">'+data[i].enle+'</a>'+
							'<p>'+data[i].chle+'</p>'+
							'<p>赠品：标配餐具1套  生日蜡烛1套 </p>'+
							"<p>温馨提醒：最快提前6小时订购</p>"+
						'</li>'+
						'<li>'+
							'<p>'+data[i].cont+'</p>'+
							'<p>'+data[i].eat+'</p>'+
						'</li>'+
						'<li class="each">'+data[i].pric+'</li>'+
						'<li>'+
							'<span class="cut">-</span>'+
							"<a class='number'>"+coo[k]+"</a>"+
							"<span class='ad'>+</span>"+
						'</li>'+
						'<li class="sum">￥'+(data[i].pric*coo[k]).toFixed(1)+'</li>'+
						'<li class="del">删除</li>'+
					'</ul>'
					}
				}
			}
			$('#cart_mian .list').html(str)			
			//
			init()
			function init(){
				cut();
				add()
				del()
			}
			 
			//点击减号
			function cut(){		
				$('.cut').click(function(){	
					var c=$(this).next().html();
					c--;
					if(c<=1){
						c=1
					}			
					$(this).next().html(c);
					var s=sum(c)
					$(this).parent().next().html('￥'+s)
					 totle()
					 var lid=$(this).parent().parent().attr('data-id')	
					acoik(lid,c)			 
				})
			}
			
			//点击加号
			function add(){
				$('.ad').click(function(){	
					var c=$(this).prev().html();
					c++;		
					$(this).prev().html(c);
					var x=sum(c)	
					$(this).parent().next().html('￥'+x)
					 totle()
					 var lid=$(this).parent().parent().attr('data-id')	
					 acoik(lid,c)
				})
			}
			 
			//小计	
			function sum(c){
				var evr=Number($('.each').html()).toFixed(1)		
				var sum=(evr*c).toFixed(1)
				return sum
			}
			
			//总计
			totle()
			function totle(){
				var totle=0;		
				for(var i=0;i<$('.sum').length;i++){	
					var sum=Number($('.sum').eq(i).html().substr(1))
					totle+=sum
				}		
				$('#totle').html('￥'+totle)
				return totle;
			}
			
			//点击删除
			
			function del(){
				$('.del').click(function(){
					$(this).parent().remove()
					var numid=$(this).parent().attr('data-id');	
					delete coo[numid];
					$.cookie('cart',JSON.stringify(coo),{expires:7,path:'/'})			
					totle()		
				})
			}
			
			//加同时cookie减变化
			function acoik(lid,c){
				 obj=coo		 
				 obj[lid]=c;	
				 var strobj=JSON.stringify(obj)
				$.cookie('cart',strobj,{expires:7,path:'/'})
			}
			
			//底部加入购物车及点击购买的hover效果
			$('.tobuy').hover(function(){
				$('.tobuy').html('Pay')
			},function(){
				$('.tobuy').html('点击购买')
			})
			
			$('.toadd').hover(function(){
				$('.toadd').html('Go Shopping')
			},function(){
				$('.toadd').html('加入购物车')
			})				
			}
		});
		
		
	})
})