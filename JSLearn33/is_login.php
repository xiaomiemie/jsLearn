<?php
/**
* TestGuest Version1.0
* ================================================
* Copy 2014 
* Web:
* ================================================
* Author: Yang Yang
* Date: 2015-2-18
*/
require 'config.php';

  $_pass=sha1($_POST['pass']);        

$query=mysql_query("SELECT user FROM blog_user WHERE user='{$_POST['user']}' and pass='{$_pass}' ");

if (mysql_fetch_array($query, MYSQL_ASSOC)) {   //有数据说明正确
		sleep(3);
		echo 0;
	}else{
		sleep(3);
		
		echo 1;
	}

mysql_close();

?>