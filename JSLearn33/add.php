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

$_birthday=$_POST['year'].'-'.$_POST['month'].'-'.$_POST['day'];

$query="INSERT INTO blog_user(user, pass, ques, ans, email, birthday, ps)
							VALUES('{$_POST['user']}', 
							sha1('{$_POST['pass']}'), 
							'{$_POST['ques']}', 
							'{$_POST['ans']}', 
							'{$_POST['email']}',
							'{$_birthday}',
							'{$_POST['ps']}'
							)";

mysql_query($query);
sleep(3);
echo mysql_affected_rows();

mysql_close();





?>