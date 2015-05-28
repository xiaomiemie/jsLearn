<?php
/**
* TestGuest Version1.0
* ================================================
* Copy 2014 
* Web:
* ================================================
* Author: Yang Yang
* Date: 2015-2-20
*/


require 'config.php';
if($_POST['type']=='all'){
	$query=mysql_query("SELECT small_bg,big_bg,bg_color,bg_text FROM blog_skin LIMIT 0,6 ");
	$json='';
	while(!!$row=mysql_fetch_array($query, MYSQL_ASSOC)) {
		$json.=json_encode($row).',';
	}
	echo '['.substr($json,0,strlen($json)-1).']';
}else if($_POST['type']=='main'){
	$query=mysql_query("SELECT big_bg,bg_color FROM blog_skin WHERE bg_flag=1 ");
	$json=json_encode(mysql_fetch_array($query, MYSQL_ASSOC));
	echo $json;
}else if ($_POST['type'] == 'set') {
	
		mysql_query("UPDATE blog_skin SET bg_flag=0 WHERE bg_flag=1") or die('SQL´íÎó£¡');
		mysql_query("UPDATE blog_skin SET bg_flag=1 WHERE big_bg='{$_POST['big_bg']}'") or die('SQL´íÎó£¡');
		
		echo mysql_affected_rows();

}
mysql_close();
?>