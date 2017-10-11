<?php
	
	include('./connect.php');
	
	$sql = "SELECT * FROM BDTST_UNIGEST..P11_UNIPOG.VW_CONTRATOS_SENAI";

	$result = $pdo->query($sql);

	$listagemContratos = Array();
	$args = Array();
	while($row = $result->fetch(PDO::FETCH_OBJ)) {
		foreach($row as $key => $value) {
			$args[$key] = 
				($value == null || $value == 'NULL' ? 
					null : 
					($key == 'situacao' 
						? ($value == 'TRUE' ? 'TRUE' : ($value == 'FALSE' ? 'FALSE' : trim($value))) 
						: ($value == 'TRUE' ?  true  : ($value == 'FALSE' ? false :   trim($value)))
					)
				);
		}
		$listagemContratos[] = $row;
	}

	var_dump($listagemContratos);