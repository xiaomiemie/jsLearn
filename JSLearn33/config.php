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
header('Content-Type:text/html; charset=utf-8');


define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PWD','');
define('DB_NAME','blog');

$conn = mysql_connect(DB_HOST,DB_USER,DB_PWD);

mysql_select_db(DB_NAME);

//mysql_query('SET NAMES UFT8');

mysql_query("set names utf8");












?>