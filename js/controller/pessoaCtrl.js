
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

		vm.savePessoa = function(item){
			
			try {
				pessoaSvc.savePessoa(item).then(function(result){
			
				// vm.savePessoa = angular.copy(result.data);

				});
			}
			catch(err) {
				getListPessoa();
			}
		}

		vm.deletePessoa = function(item){
			
			pessoaSvc.deletePessoa(item);

		}

		getListPessoa();
		
	}
})();