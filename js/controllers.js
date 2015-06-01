(function () {

	var app = angular.module('sap.controllers', []);

	app.controller('church-new', ['circuitService', '$scope', 'zoneService', 'departmentService', 'cityService',
		function(circuitService, $scope, zoneService, departmentService, cityService) {

		$scope.loadCity = function(){
			cityService.getCityByDepartment($scope.department).then(function(data){
				$scope.cities = data;
			});
		}

		$scope.getCircuitByZone = function(){
			circuitService.getByZone($scope.zone).then(function(data){
				$scope.circuits = data;
			});
		}

		departmentService.getAllDepartment().then(function(data){
			$scope.departments = data;
		});

		zoneService.getAllZone().then(function(data){
			$scope.zones = data;
		});
	}]);


	app.controller('person-edit',['personService', '$scope', '$routeParams', 'zoneService', 'circuitService', 'churchService',
		function(personService, $scope, $routeParams, zoneService, circuitService, churchService){
		
		$scope.document = $routeParams.document;

		$scope.getChurchesByCircuit = function(){
			//$("#selectBox option[value='option1']").remove();
			churchService.getByCircuit($scope.circuit).then(function(data){
				$scope.churches = data;
			});
		} 

		$scope.getCircuitByZone = function(){
			circuitService.getByZone($scope.zone).then(function(data){
				$scope.circuits = data;
			});
		}

		zoneService.getAllZone().then(function(data){
			$scope.zones = data;
		});

		$scope.save = function (){
			personService.updatePerson($scope.id, $scope.document, $scope.names, $scope.lastnames, $scope.sex, $scope.churchs, $scope.phone, $scope.email, $scope.startMinistry, $scope.dateIn, $scope.theologicalLevel, $scope.typePerson, $scope.pastoralLevel, $scope.maritalStatus, $scope.academicLevel, $scope.typeHome, $("#birthdate").val(), $scope.socialSecurity).then(function(data){
				if( data == 'na' )
				{
					$scope.mjs = "No fue posible guardar la información.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
				else
				{
					$scope.id = data;
					$scope.mjs = "La información fue guardada correctamente.";
					$scope.class = "btn btn-success";
					$('#myModal').modal('show');
				}
			});
		}

		
		personService.getPerson($scope.document, '', '').then(function(data){
			data.forEach(function(p){
				$scope.id = p.id;
				$scope.names = p.names;
				$scope.lastnames = p.lastnames;
				$scope.sex = p.sex;
				$scope.church = p.church;
				$scope.idChurch = p.idChurch;
				$scope.city = p.city;
				$scope.idCity = p.idCity;
				$scope.phone = p.phone;
				$scope.email = p.email;
				$scope.startMinistry = p.startMinistry;
				$scope.dateIn = p.dateIn;
				$scope.theologicalLevel = p.theologicalLevel;
				$scope.typePerson = p.typePerson;
				$scope.pastoralLevel = p.pastoralLevel;
				$scope.maritalStatus = p.maritalStatus;
				$scope.academicLevel = p.academicLevel;
				$scope.socialSecurity = p.socialSecurity;
				$scope.typeHome = p.typeHome;
				$scope.zone = p.zone;
				
				circuitService.getByZone($scope.zone).then(function(data){
					$scope.circuits = data;
				});
				$scope.circuit = p.idCircuit;
				$("#birthdate").val(p.birthdate);
			});
			if($scope.socialSecurity == 'SI')
				$("#socialSecurity").attr('checked', true);
			$scope.churches = [{ "id": $scope.idChurch, "name": $scope.church }];
			$scope.churchs = $scope.idChurch;
			console.log($scope.churches);
		});

	}]);

	app.controller('person-new', ['personService', '$scope', 'zoneService', 'circuitService', 'churchService',
		function(personService, $scope, zoneService, circuitService, churchService){

		$scope.buscar = function(){
			personService.getPerson($scope.document, '', '').then(function(data){
				if(data.length > 0)
				{
					$scope.mjs = "La persona ya existe.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
			});
		}
		
		$scope.save = function (){
			personService.newPerson($scope.document, $scope.names, $scope.lastnames, $scope.sex, $scope.churchs, $scope.phone, $scope.email, $scope.startMinistry, $scope.dateIn, $scope.theologicalLevel, $scope.typePerson, $scope.pastoralLevel, $scope.maritalStatus, $scope.academicLevel, $scope.typeHome, $("#birthdate").val(), $scope.socialSecurity).then(function(data){
				if( data == 'ok' )
				{
					$scope.mjs = "La información fue guardada correctamente.";
					$scope.class = "btn btn-success";
					$('#myModal').modal('show');
				}
				else
				{
					$scope.mjs = "No fue posible guardar la información.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
			});
		}

		$scope.getChurchesByCircuit = function(){
			churchService.getByCircuit($scope.circuit).then(function(data){
				$scope.churches = data;
			});
		} 

		$scope.getCircuitByZone = function(){
			circuitService.getByZone($scope.zone).then(function(data){
				$scope.circuits = data;
			});
		}

		zoneService.getAllZone().then(function(data){
			$scope.zones = data;
		});

	}]);

	app.controller('person-profile',['personService', '$scope', '$routeParams', function(personService, $scope, $routeParams){
		$scope.document = $routeParams.document;
		
		personService.getPerson($scope.document, '', '').then(function(data){
			$scope.person = data;
		});

	}]);

	app.controller('person-history', ['personService', '$scope', '$routeParams', function(personService, $scope, $routeParams) {
		$scope.document = $routeParams.document;

		personService.getPerson($scope.document, '', '').then(function(data){
			$scope.person = data;
		});

		personService.getPersonHistory($scope.document).then(function(data){
			$scope.persons = data;
			console.log(data);
		});
	}]);

	app.controller('LookFor', ['personService', '$scope', function(personService, $scope) {
		$scope.buscar = function(){
			personService.getPerson($scope.document, $scope.names, $scope.lastnames).then(function(data){
				$scope.person = data;
				//console.log(data);
			});
		}
	}]);

})();