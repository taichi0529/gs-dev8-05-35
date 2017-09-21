<?php
/**
 * Created by PhpStorm.
 * User: taichi
 * Date: 2017/09/21
 * Time: 23:20
 */

header('content-type: application/json; charset=utf-8');
//$json = [[
//	'displayName' => 'taichiiiii',
//	'message' => 'hogehoge',
//	'photoURL' => '',
//	'time' => 1506001382153,
//	'uid' => 'piyohoge'
//]];

$jsonFile = "data.json";
$json = "[]";
if(file_exists($jsonFile)) {
	$json = file_get_contents( $jsonFile );
}
print $json;

