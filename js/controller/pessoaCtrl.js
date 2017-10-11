
(function(){
	
	'use strict';
	
	angular
	    .module('app')
	    .controller('pessoaCtrl', pessoaCtrl);

	function pessoaCtrl($scope, $timeout, pessoaSvc){

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

		vm.savePessoa = function(){
			console.log('Pessoa salva.', vm.form.pessoa)
			// try {
			// 	pessoaSvc.savePessoa().then(function(result){
					

			// 	});
			// }
			// catch(err) {
			// 	getListPessoa();
			// }	
		}

		getListPessoa();
		
	}
})();
