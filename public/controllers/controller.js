var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', function($scope, $http) {

	var refresh = function() {
		$http.get('/contacts').then(function(response) {
			console.log('I got the data I requested');
			$scope.contactlist = response.data;
			$scope.contact = {};
		});
	};

	refresh();

	
	$scope.add = function() {
		console.log($scope.contact);
		$http.post('/contacts', $scope.contact).then(function(response) {
			refresh();
		});
	};

	$scope.remove = function(id) {
		console.log(id);
		$http.delete('/contacts/' + id).then(function(response) {
			refresh();
		});
	};

	$scope.edit = function(id) {
		console.log(id);
		$http.get('/contacts/' + id).then(function(response) {
			$scope.contact = response.data;

			$('#btnAdd').hide();
			$('.btn-danger').prop('disabled', true);
			$('.btn-info').show();

		});
	};

	$scope.update = function() {
		console.log($scope.contact._id);
		$http.put('/contacts/' + $scope.contact._id, $scope.contact).then(function(response) {
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