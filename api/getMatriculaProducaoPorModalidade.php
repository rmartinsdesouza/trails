<?php

	include('./connect.php');
	
	set_time_limit(0);
	$sql = 
		"SELECT 
			SUBSTRING((UPPER(MO.DESCRICAO) + CASE TBL_UNION.CURPRESDIST WHEN 'D' THEN ' - EAD' ELSE '' END), 0,33) AS modalidade,
			ISNULL(SUM(P.MATRICULAS), 0) 			AS matriExec, 
			ISNULL(SUM(MET.META_MATRICULAS), 0) 	AS matriPlan, 
			ISNULL(SUM(P.PAH_TOTAL), 0) 			AS pahExec, 
			ISNULL(SUM(MET.META_PAH), 0) 			AS pahPlan
		FROM 
			(SELECT DISTINCT 
			U.CODMODALIDADECURSO,
			U.CODFILIAL,
			U.CURPRESDIST
		FROM
			(SELECT
				P_INT.CODMODALIDADECURSO,
				P_INT.CODFILIAL,
				P_INT.CURPRESDIST
			FROM
				BDSGE_UNIGEST..RM.ZNTN_MATRICULAS_PRODUCAO AS P_INT
			UNION ALL
			SELECT
				MET.CODMODALIDADECURSO,
				MET.CODFILIAL,
				MET.CURPRESDIST
			FROM
				BDSGE_UNIGEST..RM.ZNTN_METAS_EP AS MET) U) TBL_UNION
			LEFT JOIN BDSGE_UNIGEST..RM.ZNTN_MATRICULAS_PRODUCAO AS P ON P.CODMODALIDADECURSO = TBL_UNION.CODMODALIDADECURSO AND P.CODFILIAL = TBL_UNION.CODFILIAL AND P.CURPRESDIST = TBL_UNION.CURPRESDIST
			LEFT JOIN BDSGE_UNIGEST..RM.ZNTN_METAS_EP AS MET ON MET.CODMODALIDADECURSO = TBL_UNION.CODMODALIDADECURSO AND MET.CURPRESDIST = TBL_UNION.CURPRESDIST AND MET.CODFILIAL = TBL_UNION.CODFILIAL
			LEFT JOIN BDSGE_UNIGEST..RM.SMODALIDADECURSO AS MO ON CONVERT(INT, MO.CODMODALIDADECURSO) = TBL_UNION.CODMODALIDADECURSO AND MO.CODCOLIGADA = 3
		GROUP BY
			MO.DESCRICAO, TBL_UNION.CODMODALIDADECURSO, TBL_UNION.CURPRESDIST
		ORDER BY
			(UPPER(MO.DESCRICAO) + CASE TBL_UNION.CURPRESDIST WHEN 'D' THEN ' - EAD' ELSE '' END)";
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
