<?php
/**
* TestGuest Version1.0
* ================================================
* Copy 2014 
* Web:
* ================================================
* Author: Yang Yang
* Date: 2015-2-19
*/

require 'config.php';

   
header('Content-Type:text/html; charset=utf-8');

$query="INSERT INTO blog_blog(title,content,date)
							VALUES('{$_POST['title']}', 
							'{$_POST['content']}', 
							NOW()
					
							)";

mysql_query($query);
sleep(3);
echo mysql_affected_rows();

mysql_close();

?>