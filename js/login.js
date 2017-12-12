require(["config"],function(){
	require(["jquery","load"],function($){
		//导航
		setTimeout(function(){
		$('.menu li').eq(5).addClass('color')				
		},100)	
		
		$('#checkCode').click(function(){	
		 yaz()	
	})	
	//登录验证用户名和密码是否穿在
	$('#login_btn').click(function(){
		//验证码判断
		if($('#yzm').val()==''){
			$('#checkCode_error').html('请输入验证码');
			return false;
		}else if($('#yzm').val().toUpperCase()!=$('#checkCode').text().toUpperCase()){
			$('#checkCode_error').html('验证码输入有误');
			return false;
		}else{
			$('#checkCode_error').html('')
		}				
		if($('#loginName').val()==''){
			$('#fale_error').html('手机号不能为空')
			return false;
		}
		else if($('#loginPas').val()==''){
			$('#fale_error').html('密码不能为空')
			return false;
		}else{
			find()
		}	
		//设置cookie
		$.cookie('user',$('#loginName').val(),{path:'/'})	
		$('.sucees').css('display','block');
			setTimeout(function(){
			$('.sucees').css('display','none');	
			$(location).attr('href','index.html');		
			},1000);
	})
	
	//查找
	function find(){
		var user={
		phone:$('#loginName').val(),
		password:$('#loginPas').val()
		}
		$.post('find.php',user,function(data){
			if(data.status==1){			
				$('#fale_error').html('手机和密码不匹配')
			}else{				
				$('#fale_error').html('')
			}
		},"json")
	}
		
	yaz()
	function yaz(){
		var random="QWERTYUIOPASDFGHJKLZXCVBNM7894561230";
		//生成随机数
		var one=random[parseInt(Math.random()*36)];	
		var tow=random[parseInt(Math.random()*36)];
		var treen=random[parseInt(Math.random()*36)];
		var foth=random[parseInt(Math.random()*36)];
		//随机色
		var r=parseInt(Math.random()*226).toString(16)
		var g=parseInt(Math.random()*226).toString(16)
		var b=parseInt(Math.random()*226).toString(16)
		var R=r.length<2?'0'+r:r
		var G=g.length<2?'0'+g:g
		var B=b.length<2?'0'+b:b
		var randcolor='#'+R+G+B;
		$('#checkCode>i').eq(0).html(one).css('color','#'+R+G+B)
		$('#checkCode>i').eq(1).html(tow).css('color','#'+B+G+R)
		$('#checkCode>i').eq(2).html(treen).css('color','#'+B+R+G)
		$('#checkCode>i').eq(3).html(foth).css('color','#'+G+B+R)
		//随机背景色
		var br=parseInt(Math.random()*255)
		var bg=parseInt(Math.random()*255)
		var bb=parseInt(Math.random()*255)
		$('#checkCode').css('background','rgba('+br+','+bg+','+bb+', .1)')
	}	
	})
})
