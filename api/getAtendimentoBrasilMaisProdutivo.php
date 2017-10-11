<?php
	
	set_time_limit(0);
	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, "https://apim.exablack.com:8243/sgt/reports/v1.0.0/atendimentos?dataInicio=20160101&codigoDNProdutoNacional=412137");
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Authorization: Bearer a203bc4e627b3024126ce566d0754e9e'));
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

	$result = curl_exec($ch);
	if($result === FALSE) die(curl_error($ch));

	curl_close($ch);

	echo $result;