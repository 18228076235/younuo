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
			var reg=/cpId=(\w*)/g
			var coo=reg.exec(location.search)[1]
			//数量
			var reg1=/n=(\d*)/g
			var n=reg1.exec(location.search)[1]
			var str='';
			for(var i=0;i<data.length;i++){
				if(data[i].id==coo){
					console.log(coo)
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
							"<a class='number'>"+n+"</a>"+
						'</li>'+
						'<li class="sum">'+(data[i].pric*n).toFixed(1)+'</li>'+
					'</ul>'
				}
			}
			$('.bay_cart .main').html(str)	
			}
		})	
		
	})
})
