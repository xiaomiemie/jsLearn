<?php
/**
* TestGuest Version1.0
* ================================================
* Copy 2014 
* Web:
* ================================================
* Author: Yang Yang
* Date: 2015-2-17
*/


require 'config.php';



$query=mysql_query("SELECT user FROM blog_user WHERE user='{$_POST['user']}'");

if (mysql_fetch_array($query, MYSQL_ASSOC)) {
		
		echo 1;
	}

mysql_close();


?>