'use strict';

/* Controllers */

function addLoadingImg(element){
	var loadingImgElement = document.createElement('img');

		loadingImgElement.setAttribute('src',"http://carte.allonspecher.com/images/loading.gif");
		loadingImgElement.setAttribute('id',"loading_"+element.id);
		loadingImgElement.setAttribute('width',"20px");
		element.appendChild(loadingImgElement);

	return loadingImgElement;
}



var coffrefortApp = angular.module('coffrefortApp', []);
var pendingCollectors = [];

coffrefortApp.controller('FacturesListCtrl', ['$scope', '$http', '$interval', 'logService', function($scope, $http, $interval, logService) {

	$scope.loadData = function () {
     $http.get('lib/getDirData.php').success(function(data) {
       $scope.directories = data;
       $scope.orderProp = 'timestamp';
     });

  };

  $scope.addPendingCollector = function(collectorId) {
  	
  	if(pendingCollectors.indexOf(collectorId)<0)
  	{
  		pendingCollectors.push(collectorId);
  		console.log("add "+collectorId);
  	}
  		
  }
 
  $scope.removePendingCollector = function(collectorId) {
  		var index = pendingCollectors.indexOf(collectorId);
  		console.log("remove "+ collectorId);
  		if(index >-1)
  			pendingCollectors.splice(index,1);
  }

  $scope.isPending = function(collectorId) {
  		return (pendingCollectors.indexOf(collectorId) > -1);
  }



  $scope.refreshData = function ($event) {
  	var element = $event.currentTarget;
  	var collectorTitleElement = element.parentNode;

  	var loadingImgElement = addLoadingImg(collectorTitleElement);

		console.log(collectorTitleElement.id + "running");
		$scope.addPendingCollector(collectorTitleElement.id);

		var logsElement = document.getElementById( "logs");
		
  	$http({
		  method: 'GET',
		  url: 'lib/launcher.php?collector='+element.parentNode.id
		}).success(function(data, status, headers, config) {

		collectorTitleElement.removeChild(loadingImgElement);
		var logsElement = document.getElementById( "logs");
			logsElement.innerHTML += "\r\n------------- COLLECTE "+element.parentNode.id+"------------ \r\n";
		  

		}).error(function(data, status, headers, config) {

		});

		var logEnded = false;

		var stop;
		var watchdog = 100;
		var data = "";
		stop = $interval(function() {
				watchdog --;
				var logResultsPromise = logService.getData('lib/updateLog.php?collector='+element.parentNode.id);
				logResultsPromise.then(function(result){
					data = result.data;
					logsElement.innerHTML = result.data;
					logEnded = (result.data.search("#END#") >= 0);
				});

				if(logEnded || watchdog < 0)
				{
					$interval.cancel(stop);

					var errorPos = data.search("CasperError:");
				  	var newAlert = document.createElement('font');

						if(errorPos>0)
						{
							newAlert.setAttribute('style',"color:red");
							newAlert.innerHTML ="Erreur";			
						}else
						{
							newAlert.setAttribute('style',"color:green");
							newAlert.innerHTML ="Updated";
						}

						collectorTitleElement.appendChild(newAlert);
						//setTimeout(function(){ collectorTitleElement.removeChild(newAlert); }, 3000);
						$scope.removePendingCollector(collectorTitleElement.id);
						setTimeout(function(){ $scope.loadData(); }, 2000);
						

						}

			},1000);
  };
 
  $scope.loadData();

}]);

