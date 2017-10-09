<?php
	$phone=$_REQUEST["phone"];
	$pass=$_REQUEST["password"];
	//连接服务器
	mysql_connect("localhost:3306","root","");
	//查找我的数据库
	mysql_select_db('younuo');
	//创建添加的SQL语句
	$sql="INSERT INTO `login` (`phone`, `password`) VALUES ('$phone', '$pass')";
	//得到返回值为布尔类型
	$result=mysql_query($sql);
	
	if($result){
		echo '{"satus":1,"messagr":"succese"}';
	}else{
		echo '{"satus":0,"messagr":"failed"}';
	}
	mysql_close();
?>