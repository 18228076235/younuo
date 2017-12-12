require(["config"],function(){
	require(["jquery","load","cart"],function($,load,cart){
		pay={
		init:function(){
			this.sent()
			cart.data1()
			
		},
		sent:function(){
			$('.send i').click(function(){
				$(this).next().css('display','block')
				$(this).parent().next().children().eq(1).css('display','none')
				$('.one').slideDown("slow")
				$('.tow').slideUp("slow")			
			})
			$('.self i').click(function(){
				$(this).next().css('display','block')
				$(this).parent().prev().children().eq(1).css('display','none')			
				$('.tow').slideDown("slow")
				$('.one').slideUp("slow")
			})
		}
		}
		pay.init()
		
		
		
		//主要内容
		
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
						'</li>'+
						'<li>'+
							'<p>'+data[i].cont+'</p>'+
							'<p>'+data[i].eat+'</p>'+
						'</li>'+
						'<li class="each">'+data[i].pric+'</li>'+
						'<li>'+
							"<a class='number'>"+coo[k]+"</a>"+
						'</li>'+
						'<li class="sum">'+(data[i].pric*coo[k]).toFixed(1)+'</li>'+
					'</ul>'
					}
				}
				console.log(data[i].cont)
			}
			$('.bay_cart .main').html(str)	
			}
		})	
		
	})
})
