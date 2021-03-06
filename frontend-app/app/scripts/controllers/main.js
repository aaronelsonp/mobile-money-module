'use strict';

angular.module('mobileMoneyApp')
  .controller('mainCtrl', ['$rootScope', '$scope', '$http', 'authFactory', 'dataFactory',
	function ($rootScope, $scope, $http, authFactory, dataFactory) {
		
      $scope.loading = true;
	  
	  authFactory.getAuthKey("root", "@Admin123")
	  		.then(function(response){
				var basicKey = response.data.base64EncodedAuthenticationKey;
				authFactory.setBasicAuthKey(basicKey);
				
				// get all the clients
				dataFactory.getAllClients()
					.then(function(response){
						$scope.clients = response.data.pageItems;
						$scope.totalClients = response.data.totalFilteredRecords;
						console.info($scope.totalClients);
						$scope.loading = false
					}, function(error){});
	  		}, function(error){});
  }]);
