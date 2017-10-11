<?php
	
	
	$host_sige = "10.52.28.100\instance_high"; //Host SIGE interno
	$user_sige = "senai"; //usuario do mysql
	$pass_sige = "S3n4!2015"; //senha do mysql
	$base_sige = "SIGE_MT"; //nome do bando de dados
	

	$driver_host = in_array("sqlsrv", PDO::getAvailableDrivers()) ? "sqlsrv:Server=".$host_sige.";Database=".$base_sige.";" : "dblib:host=".$host_sige.";dbname=".$base_sige.";";
	$pdo = new PDO($driver_host, $user_sige, $pass_sige);

	ini_set("default_charset","utf-8");
	ini_set('memory_limit', '-1');
	ini_set('max_execution_time', '0');
	//ini_set('default_socket_timeout', '0');
	ini_set('mssql.connect_timeout', '0');
	ini_set('mssql.timeout', '0');
	ini_set('mssql.charset', 'UTF-8');