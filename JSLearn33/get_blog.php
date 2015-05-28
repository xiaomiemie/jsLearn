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

$query=mysql_query("SELECT title,content,date FROM blog_blog ORDER BY date DESC LIMIT 0,3 ");
$json='';
while(!!$row=mysql_fetch_array($query, MYSQL_ASSOC)) {
	$json.=json_encode($row).',';
}
echo '['.substr($json,0,strlen($json)-1).']';
mysql_close();
?>