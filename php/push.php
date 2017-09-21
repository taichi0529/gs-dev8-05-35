<?php
/**
 * Created by PhpStorm.
 * User: taichi
 * Date: 2017/09/21
 * Time: 23:35
 */

$jsonFile = "data.json";
$json = "[]";
if(file_exists($jsonFile)) {
	$json = file_get_contents( $jsonFile );
}
$array = json_decode($json, true);
$array[] = $_POST;
$json = json_encode($array);
file_put_contents($jsonFile, $json);
header('content-type: application/json; charset=utf-8');
print json_encode($_POST);
