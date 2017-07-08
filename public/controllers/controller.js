var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', function($scope, $http) {

	var refresh = function() {
		$http.get('/api/contacts').then(function(response) {
			$scope.contactlist = response.data;
			$scope.contact = {};
		});
	};

	refresh();

	
	$scope.add = function() {
		$http.post('/api/contacts', $scope.contact).then(function(response) {
			refresh();
		});
	};

	$scope.remove = function(id) {
		$http.delete('/api/contacts/' + id).then(function(response) {
			refresh();
		});
	};

	$scope.edit = function(id) {
		$http.get('/api/contacts/' + id).then(function(response) {
			$scope.contact = response.data;

			$('#btnAdd').hide();
			$('.btn-danger').prop('disabled', true);
			$('.btn-info').show();

		});
	};

	$scope.update = function() {
		$http.put('/api/contacts/' + $scope.contact._id, $scope.contact).then(function(response) {
			refresh();

			$('.btn-info').hide();
			$('.btn-danger').prop('disabled', false);
			$('#btnAdd').show();

		});
	};

	$scope.cancel = function() {
		refresh();

		$('.btn-info').hide();
		$('#btnAdd').show();

	};

	$scope.sort = function(value) {
		$scope.sorted = value;
	};

});