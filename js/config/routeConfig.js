angular.module('app').config(
	// ['$routeProvider',
  function($routeProvider) {

	$routeProvider.when("/pessoa",{
  		templateUrl:"views/pessoa.html",
  		controller:"pessoaCtrl as vm"
  	});

  	$routeProvider.when("/novaPessoa",{
  		templateUrl:"views/editPessoa.html",
  		controller:"pessoaCtrl"
  	});

  	$routeProvider.when("/editPessoa",{
  		templateUrl:"views/editPessoa.html",
  		controller:"pessoaCtrl"
  	});

}
// ]
);