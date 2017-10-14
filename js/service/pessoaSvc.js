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


		svc.savePessoa = function(data) {
			return $http.post(utilService.getUrlDAO('api/pessoa'), data);
		};

		svc.deletePessoa = function(id) {

			var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

			console.log(id)
			return $http.delete(utilService.getUrlDAO('api/pessoa/delete/')+ id, config);
		};
		      

	}
})();
