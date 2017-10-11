(function(){
	
	'use strict';
	
	angular
	    .module('app')
	    .controller('dashboardCtrl', dashboardCtrl);

	function dashboardCtrl($scope, $timeout, dashboardSvc){

		var vm = this;
		var space = '      ';
		
		var totalMatrExecutado = 0; 
		var totalMatrPlanejado = 0;
		var totalProdExecutado = 0;
		var totalProdPlanejado = 0;

		vm.visualizacaoPainel = "DADOS";
		

		function getMatriculaProducaoPorModalidade(){

			try {
				dashboardSvc.getMatriculaProducaoPorModalidade().then(function(result){
					
					if (result.data.length > 0) {				
						vm.producaoModalidade = [];
						_.each(result.data, function(el){
							
							totalMatrPlanejado += eval(el.matriPlan);
							totalProdPlanejado += eval(el.pahPlan);
							vm.producaoModalidade.push(el);
						});

						vm.totalMatrPlanejado = $.number(totalMatrPlanejado);
						vm.totalProdPlanejado = $.number(totalProdPlanejado);

						vm.fracaoExecutadoMatricula = $.number(totalMatrExecutado/totalMatrPlanejado * 100, 1)+'%';
						vm.fracaoExecutadoProducao = $.number(totalProdExecutado/totalProdPlanejado * 100, 1)+'%';
					}
				});
			}
			catch(err) {
				getMatriculaProducaoPorModalidade();
			}
		}

		function getMatriculaProducaoPorUnidade(){

			vm.marqueeMatr = ''; 
			vm.marqueeProd = '';

			try {
				dashboardSvc.getMatriculaProducaoPorUnidade().then(function(result){

					if (result.data.length > 0) {
						vm.dadosUo = [];
						_.each(result.data, function(el){
							vm.marqueeMatr += el.uo + ' (' + $.number(el.matriExec) + ')' + space;
							vm.marqueeProd += el.uo + ' (' + $.number(el.pahExec) + ')' + space;

							totalMatrExecutado += eval(el.matriExec);
							totalProdExecutado += eval(el.pahExec);
						});

						vm.totalMatr = $.number(totalMatrExecutado);
						vm.totalProd = $.number(totalProdExecutado);

						vm.fracaoExecutadoMatricula = $.number(totalMatrExecutado/totalMatrPlanejado * 100, 1)+'%';
						vm.fracaoExecutadoProducao 	= $.number(totalProdExecutado/totalProdPlanejado * 100, 1)+'%';
						
						$timeout(function(){
							$('.marquee').marquee({duplicated: true, duration: 15000, delayBeforeStart: 0, gap: 50, direction: 'left'});
						}, 2000);	
					}
					
				});
			}
			catch(err) {
				getMatriculaProducaoPorUnidade();
			}
		}

		function getAtendimentoBrasilMaisProdutivo(){

			try {
				dashboardSvc.getAtendimentoBrasilMaisProdutivo().then(function(result){
					
					var valorAtendimento = 18000; 
					var phhAtendimento = 120;
					
					vm.resultado = {
						aceitos: 	_.where(result.data.Atendimentos.Atendimento, {descricaoStatusAtendimento:"Aceito"}),
						concluidos: _.where(result.data.Atendimentos.Atendimento, {descricaoStatusAtendimento:"Concluido"}),
					}

					vm.phhExecutada 	= vm.resultado.concluidos.length * phhAtendimento;
					vm.phhContratada 	= (vm.resultado.aceitos.length + vm.resultado.concluidos.length) * phhAtendimento;
					
					vm.receitaExecutada 	= 'R$' + $.number((vm.resultado.concluidos.length) * valorAtendimento);
					vm.receitaContratada 	= 'R$' + $.number((vm.resultado.aceitos.length + vm.resultado.concluidos.length) * valorAtendimento);
				});
			}
			catch(err) {
				getAtendimentoBrasilMaisProdutivo();
			}
		}


		function painelRotate()
		{
			$timeout(function()
			{
				var posicao0 = vm.producaoModalidade[0];
				vm.producaoModalidade.shift();
				vm.producaoModalidade.push(posicao0);
				painelRotate();
			}, 3500);
		}

		function visualizacaoPainel(tipo){
			switch(tipo){
				case 'DADOS':
					vm.visualizacaoPainel = tipo;
					$timeout(function(){visualizacaoPainel('UNIGEST');}, 120000);
				break;

				case 'UNIGEST':
					vm.visualizacaoPainel = tipo;
					$timeout(function(){visualizacaoPainel('UNIGEST_POLITICA');}, 10000);
				break;

				case 'UNIGEST_POLITICA':
					vm.visualizacaoPainel = tipo;
					$timeout(function(){visualizacaoPainel('DUBAI');}, 10000);
				break;

				case 'DUBAI':
					vm.visualizacaoPainel = tipo;
					$timeout(function(){visualizacaoPainel('SENAIMT');}, 10000);
				break;

				// case 'MERCADO':
				// 	vm.visualizacaoPainel = tipo;
				// 	$timeout(function(){visualizacaoPainel('SENAIMT');}, 2000);
				// break;

				case 'SENAIMT':
					vm.visualizacaoPainel = tipo;
					$timeout(function(){visualizacaoPainel('UNIGEST');}, 10000);
				break;

			}
		}

		// INIT FUNCTIONS 
		painelRotate();
		getMatriculaProducaoPorUnidade();
		getMatriculaProducaoPorModalidade();
		getAtendimentoBrasilMaisProdutivo();
		visualizacaoPainel('UNIGEST');
	}
})();
