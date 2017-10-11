<?php

	include('./connect.php');
	
	set_time_limit(0);
	$sql = 
		"SELECT 
			(CASE UNIDADE 
			WHEN 'FACULDADE DE TECNOLOGIA SENAI MATO GROSSO' THEN 'FATEC' 
			WHEN 'SENAI NOVA MUTUM' THEN 'NMT' 
			WHEN 'SENAI RONDONÓPOLIS' THEN 'ROO' 
			WHEN 'SENAI JUÍNA' THEN 'JUI' 
			WHEN 'SENAI CUIABÁ' THEN 'CBA' 
			WHEN 'SENAI VÁRZEA GRANDE' THEN 'VGE' 
			WHEN 'SENAI SINOP' THEN 'SNP' 
			WHEN 'ESCOLA SENAI DA CONSTRUÇÃO' THEN 'ESC' 
			WHEN 'SENAI CÁCERES' THEN 'CAC' 
			WHEN 'SENAI BARRA DO GARÇAS' THEN 'BAR' 
			WHEN 'SENAI SORRISO' THEN 'SOR' 
			ELSE '' END) AS uo,
			SUM(P.MATRICULAS) AS matriExec, SUM(P.PAH_TOTAL) AS pahExec
		FROM 
			BDSGE_UNIGEST..RM.ZNTN_MATRICULAS_PRODUCAO AS P
		GROUP BY
			(CASE UNIDADE 
			WHEN 'FACULDADE DE TECNOLOGIA SENAI MATO GROSSO' THEN 'FATEC' 
			WHEN 'SENAI NOVA MUTUM' THEN 'NMT' 
			WHEN 'SENAI RONDONÓPOLIS' THEN 'ROO' 
			WHEN 'SENAI JUÍNA' THEN 'JUI' 
			WHEN 'SENAI CUIABÁ' THEN 'CBA' 
			WHEN 'SENAI VÁRZEA GRANDE' THEN 'VGE' 
			WHEN 'SENAI SINOP' THEN 'SNP' 
			WHEN 'ESCOLA SENAI DA CONSTRUÇÃO' THEN 'ESC' 
			WHEN 'SENAI CÁCERES' THEN 'CAC' 
			WHEN 'SENAI BARRA DO GARÇAS' THEN 'BAR' 
			WHEN 'SENAI SORRISO' THEN 'SOR' 
			ELSE '' END)
		ORDER BY 
			uo";
	$result = $pdo->query($sql);
	
	$args_list = Array();
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
		$args_list[] = $args;
	}
	echo json_encode($args_list);