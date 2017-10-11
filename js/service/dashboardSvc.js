(function () {
	
	'use strict';

	angular
		.module('app')
		.service('dashboardSvc', ['$http', 'utilService', dashboardSvc]);


	function dashboardSvc($http, utilService) {

		var svc = this;  
		
		svc.getAtendimentoBrasilMaisProdutivo = function() {
			return $http.get(utilService.getUrlDAO('api/getAtendimentoBrasilMaisProdutivo'));
		};

		svc.getMatriculaProducaoPorModalidade = function() {
			return $http.get(utilService.getUrlDAO('api/getMatriculaProducaoPorModalidade'));
		};

		svc.getMatriculaProducaoPorUnidade = function() {
			return $http.get(utilService.getUrlDAO('api/getMatriculaProducaoPorUnidade'));
		};




	};
})();