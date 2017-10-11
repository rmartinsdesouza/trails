(function () {
	
	'use strict';

	angular
		.module('app')
		.service('pessoaSvc', ['$http', 'utilService', pessoaSvc]);


	function pessoaSvc($http, utilService) {

		var svc = this;  
		
		svc.getListPessoa = function() {
			return $http.get(utilService.getUrlDAO('api/pessoa'));
		};

	};
})();