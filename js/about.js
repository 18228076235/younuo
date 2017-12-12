require(["config"],function(){
	require(["jquery","load"],function($){
		setTimeout(function(){
				$('.menu li').eq(6).addClass('color')				
			},100)
	})
})
