
(function(){
	
	'use strict';
	
	angular
	    .module('app')
	    .controller('pessoaCtrl', pessoaCtrl);

	function pessoaCtrl($scope, $timeout, pessoaSvc, $http){

		var vm = this;
		vm.form = {
			pessoa: {}
		}
		

		function getListPessoa(){

			try {
				pessoaSvc.getListPessoa().then(function(result){
					
					vm.listPessoa = result.data;

				});
			}
			catch(err) {
				getListPessoa();
			}
		}

		vm.getItemPessoa = function(item){
			vm.form.pessoa = angular.copy(item);
		}

		vm.savePessoa = function(NOME,CPF,DATA_NASCIMENTO,LOGIN_CODIGO){
			// console.log('Pessoa salva.', vm.form.pessoa)
			// try {
			// 	pessoaSvc.savePessoa().then(function(result){
					

			// 	});
			// }
			// catch(err) {
			// 	getListPessoa();
			// }	
			// $scope.DESCRICAO = null;
			$scope.NOME = null;
			$scope.CPF = null;
			$scope.DATA_NASCIMENTO = null;
			$scope.LOGIN_CODIGO = null;

		var data = {
		// DESCRICAO: DESCRICAO
		
			NOME: NOME,
			CPF: CPF,
			DATA_NASCIMENTO: DATA_NASCIMENTO,
			LOGIN_CODIGO: LOGIN_CODIGO

			// NOME: 'NOME',
			// CPF: 'CPF',
			// DATA_NASCIMENTO: 'DATA_NASCIMENTO',
			// LOGIN_CODIGO: 'LOGIN_CODIGO'
		};
	
		$http.post('http://bedrock/api/pessoa', data).then(function (response, $http) {


		if (response.data)
			$scope.msg = "Post Data Submitted Successfully!";
			getListPessoa();
		}, function (response) {		
			$scope.msg = "Service not Exists";
			$scope.statusval = response.status;
			$scope.statustext = response.statusText;
			// $scope.headers = response.headers();
		});
		
		}

		getListPessoa();
		
	}
})();