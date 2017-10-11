<?php
	
	include('./connect.php');
	
	$sql = "SELECT * FROM BDTST_UNIGEST..P11_UNIPOG.VW_PROPOSTA_CRM";

	$result = $pdo->query($sql);

	$listagemPropostas = Array();
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
		$listagemPropostas[] = $row;
	}

	var_dump($listagemPropostas);