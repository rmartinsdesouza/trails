(function () {

	'use strict';

	angular
		.module('app')
		.service('utilService', ['$http', utilService]);

	function utilService($http) {
		var svc = this;

		svc.getUrlDAO = function (path) {
			
			
			/* DESENVOLVIMENTO - APLICAÇÃO LOCALHOST (MAQUINA EDUARDO) */
			return 'http://bedrock/' + path;

			
			/* PRODUÇÃO - APONTAMENTO PARA LOCALIZAÇÃO DA API EM MESMO SERVIDOR LOCAL */ 
			// return '../../api/senai/model/' + path + '.php';
			

			/* PRODUÇÃO - APONTAMENTO PARA LOCALIZAÇÃO DA API PARA APP (ANDROID e IOS) */ 
			// return 'http://painelderesultados.senaimt.com.br/api/senai/model/' + path + '.php';


		};
	};
})();