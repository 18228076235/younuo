<?php
	$phone=$_REQUEST["phone"];
	mysql_connect("localhost:3306","root","");
	mysql_select_db("younuo");
	$sql="SELECT count(*) FROM `login` WHERE `phone` LIKE '$phone'";
	$result=mysql_query($sql);
	 
	if($row=mysql_fetch_array($result)){
		if($row[0]==1)
			echo '{"status":0,"message":"exist"}';
		else echo '{"status":1,"message":"not"}';	
	}else{
		echo '{"status":2,"message":"error"}';
	};
	mysql_close();	
?>