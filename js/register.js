require(["config"],function(){
	require(["jquery","load"],function($){
		var reout	
	//同意《优糯用户服务》	
	$('#agrement').click(function(){
		if($('#agrement').prop('checked')==true){
		$('#check-img').css('display','block')
	}else{
		$('#check-img').css('display','none')
		}
	})
			
	//判断用户是否已经注册	
	function data(){
		$.ajax({
			type:"get",
			url:"../mock/login.php?phone="+$('#loginName').val(),
			dataType:"json",
			success:function(data){
				if(data.status==0){
				$('#loginName_error').html('该用户已经注册')
				}
			}
		});
	}
	
	//把注册后的用户放入数据库	
	function putin(){
		var user={
			phone:$('#loginName').val(),
			password:$('#pas').val()
		}
		$.post('../mock/check.php',user,function(data){
			$('.sucees').css('display','block');
			setTimeout(function(){
			$('.sucees').css('display','none');	
			$(location).attr('href','center.html');
			},3000);			
		},"json")
	}
	
		//点击发送验证码	
	$('#sent-code').click(function(){sent()})
	
	function sent(){	
			data()				
			//先清空密码的提示
			$('#checkCode_error').html('');
			//判断手机号是否正确
			var num=$('#loginName').val() 
			if($('#loginName').val()==''){
				$('#loginName_error').html('手机号不能为空')
				return false;
			}
			if(/^((15)|(18)|(13))\d{9}$/.test(num)==false){
				$('#loginName_error').html('请正确输入11未手机号码')
				return false;
			}else{
					$('#loginName_error').html('')
			}			
			//判断验证码输入的正确
			if($('#loginPas').val()==''){
				$('#img_error').html('请填写图片验证码')
				return false;
			}
			else{
				checkyzm()
			}	
			
		}	
				
		function last(){			
			data()				
			//先清空密码的提示
			$('#checkCode_error').html('');
			//判断手机号是否正确
			var num=$('#loginName').val() 
			if($('#loginName').val()==''){
				$('#loginName_error').html('手机号不能为空')
				return false;
			}
			if(/^((15)|(18)|(13))\d{9}$/.test(num)==false){
				$('#loginName_error').html('请正确输入11未手机号码')
				return false;
			}else{
					$('#loginName_error').html('')
			}			
			//判断验证码输入的正确
			if($('#loginPas').val()==''){
				$('#img_error').html('请填写图片验证码')
				return false;
			}
			else{
				checkyzm()
			}	
			//密码
			var pas=$('#pas').val()
			if(/^((\d)|([a-zA-Z])){6,30}$/.test(pas)==false){
				$('#Code_error').html('密码必须是6-30位字符，可使用字母、数字');
				return false;
			}else{
				$('#Code_error').html('')
			}
			//密码确认
			var checkpas=$('#checkpas').val()
			if(pas!=checkpas){
				$("#checkCode_error").html('两次密码不一致')
				return false;
			}else{
				$("#checkCode_error").html('')
			}
			putin()
		}
		
		//点击提交按钮
		$('#login_btn').click(function(){
			sent()			
			last()
			yzm()
		})
		
		
	//点击切换验证码
	yzm()
	function yzm(){
		var url="http://route.showapi.com/932-2?showapi_appid=47022&showapi_sign=a414414bf0764b688cac309341f08677&length=4&"
		$.getJSON(url,function(data){
			$('#checkCode').attr('src',data.showapi_res_body.image)
			$('#checkCode').data('sid',data.showapi_res_body.sid)
		})
	}
	$('#checkCode').click(function(){
		yzm()
	})	
	//验证验证码是否正确
	function checkyzm(){	
		var yzm=$('#loginPas').val()
		var _url="http://route.showapi.com/932-1?showapi_appid=47022&showapi_sign=a414414bf0764b688cac309341f08677&checkcode="+yzm+"&sid="+$('#checkCode').data('sid')
		$.getJSON(_url,function(data){
			if(data.showapi_res_body.valid){
				$('#img_error').html('')
			}else{				
				$('#img_error').html('图片验证码错误，请检查后重新输')
				}
			})
		}
	})
})
