(function () {

	var app = angular.module('sap.controllers', []);

	app.controller('logout', ['$rootScope', '$location', '$route', function($rootScope, $location, $route) {
		$rootScope.user = null;
		$rootScope.urls = [];
		$location.path("/login");
        $route.reload();
		
	}]);

	app.controller('users', ['session', '$scope', '$rootScope', '$location', '$route', 
		function(session, $scope, $rootScope, $location, $route) {
		
		$scope.login = function(){
			session.login($scope.user, $scope.pass).then(function(data){
				if(data == 'admin' || data == 'user'){
					$rootScope.user = $scope.user;
					session.getUrls(data).then(function(datos){
						$rootScope.urls = datos;
						console.log(datos);
						$location.path("/home");
        				$route.reload();
					});
				}
				else{
					$scope.mjs = "Error al iniciar sesión.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
			});
		}

		
	}]);

	app.controller('report-event-user', ['personService', '$scope', function(personService, $scope) {
		
		
	}]);

	app.controller('update-pass', ['session', '$scope', '$rootScope', function(session, $scope, $rootScope) {
		
		$scope.save = function(){
			session.updatePass($rootScope.user, $scope.pass).then(function(data){
				if( data == 'ok' )
				{
					$scope.mjs = "La información fue guardada correctamente.";
					$scope.class = "btn btn-success";
					$('#myModal').modal('show');
				}
				else
				{
					$scope.mjs = data +  " No fue posible guardar la información.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
			});
		}

	}]);

	app.controller('user-reset', ['session', '$scope', function(session, $scope) {
		$scope.setPass = function(){
			$scope.pass = session.RandomPassword(8, true, true, true);
		}

		$scope.save = function(){
			session.updatePass($scope.user, $scope.pass).then(function(data){
				if( data == 'ok' )
				{
					$scope.mjs = "La información fue guardada correctamente.";
					$scope.class = "btn btn-success";
					$('#myModal').modal('show');
				}
				else
				{
					$scope.mjs = data +  " No fue posible guardar la información.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
			});
		}

		session.getUsers().then(function(data){
			$scope.users = data;
		});
		
	}]);

	app.controller('user-new', ['session', '$scope', function(session, $scope) {

		$scope.save = function(){
			session.newUser($scope.user, $scope.pass, $scope.type, $scope.email).then(function(data){
				if( data == 'ok' )
				{
					$scope.mjs = "La información fue guardada correctamente.";
					$scope.class = "btn btn-success";
					$('#myModal').modal('show');
				}
				else
				{
					$scope.mjs = data +  " No fue posible guardar la información.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
			});
		}

		$scope.setPass = function(){
			$scope.pass = session.RandomPassword(8, true, true, true);
		}

	}]);


	app.controller('event-register', ['event', '$scope', 'personService', '$rootScope', function(event, $scope, personService, $rootScope) {
		$scope.LookForPerson = function(){
			personService.getPerson($scope.document, '', '').then(function(data){
				if(data.length > 0)
				{
					$scope.names = "";
					data.forEach(function(d){
						$scope.names = d.names + " " + d.lastnames;
					});
				}
				else
					$scope.names = "Sin resultados.";
			});		
		}

		$scope.save = function(){
			event.register($scope.participation, $scope.document, $scope.idPrice, $rootScope.user).then(function(data){
				if( data != 'na' )
				{
					$scope.consecutive = data;
					$scope.price = $("#idPrice option:selected").text();
					$('#comprobante').modal('show');
				}
				else
				{
					$scope.mjs = data +  " No fue posible guardar la información.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
			});
		}

		event.getActualEvent().then(function(data){
			$scope.events = data;
			data.forEach(function(d){
				$scope.nameEvent = d.name;
				$scope.event = d.event;
			});
		});
	}]);

	app.controller('event-new', ['event', '$scope', function(event, $scope) {
		
		$scope.save = function(){
			//console.log($scope.name + $scope.date + $scope.price);
			event.eventNew($scope.name, $scope.date, $scope.price).then(function(data){
				if( data == 'ok' )
				{
					$scope.mjs = "La información fue guardada correctamente.";
					$scope.class = "btn btn-success";
					$('#myModal').modal('show');
				}
				else
				{
					$scope.mjs = data +  " No fue posible guardar la información.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
			});
		}

	}]);

	app.controller('church-search', ['circuitService', '$scope', 'zoneService', 'churchService', 
		function(circuitService, $scope, zoneService, churchService) {
		$scope.churchSearch = function(){
			churchService.churchSearch($scope.name, $scope.circuit, $scope.zone).then(function(data){
				$scope.churches = data;
			});
		}

		zoneService.getAllZone().then(function(data){
			$scope.zones = data;
		});

		$scope.getCircuitByZone = function(){
			circuitService.getByZone($scope.zone).then(function(data){
				$scope.circuits = data;
			});
		}
	}]);

	app.controller('church-update', ['circuitService', '$scope', 'zoneService', 'departmentService', 'cityService', '$routeParams', 'churchService',
		function(circuitService, $scope, zoneService, departmentService, cityService, $routeParams, churchService) {
		$scope.id = $routeParams.id;

		$scope.saveChurch = function(){
			//console.log($("#statusICM").val()+ " - "+ $("#yearDedication").val());
			if($("#statusICM").val() == 'DEDICADO' && $("#yearDedication").val() == '')
			{
				$scope.mjs = "Faltan algunos datos.";
				$scope.class = "btn btn-warning";
				$('#myModal').modal('show');
			}
			else
			churchService.churchUpdate($scope.id, $scope.name, $scope.category, $scope.address, $scope.phone, $scope.cellular, $scope.vereda, $scope.email, $scope.countMembers, $scope.personeria, $scope.circuit, $scope.city, $scope.statusICM, $scope.yearDedication, $scope.nit, $scope.user).then(function(data){
				if( data == 'ok' )
				{
					$scope.mjs = "La información fue guardada correctamente.";
					$scope.class = "btn btn-success";
					$('#myModal').modal('show');
				}
				else
				{
					$scope.mjs = " No fue posible guardar la información.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
			});
		}

		$scope.updateYear = function(){
			if($scope.statusICM == 'DEDICADO')
				$("#yearDedication").prop("disabled", false);
			else{
				$("#yearDedication").prop("disabled", true);
				$("#yearDedication").val("");
			}
		}

		departmentService.getAllDepartment().then(function(data){
			$scope.departments = data;
		});

		churchService.churchGetById($scope.id).then(function(c){
			$scope.name = c.name;
			$scope.category = c.category;
			$scope.address = c.address;
			$scope.phone = c.phone;
			$scope.cellular = c.cellular;
			$scope.vereda = c.vereda;
			$scope.email = c.email;
			$scope.countMembers = c.countMembers;
			$scope.personeria = c.personeria;
			if($scope.personeria = 'SI')
				$("#nit").prop("disabled", false);
			$scope.department = c.department;
			$scope.statusICM = c.statusICM;
			if($scope.statusICM = 'DEDICADO')
				$("#yearDedication").prop("disabled", false);
			$scope.yearDedication = c.yearDedication;
			$scope.nit = c.nit;
			$scope.user = c.user;
			$scope.zone = c.zone;
			circuitService.getByZone($scope.zone).then(function(data){
				$scope.circuits = data;
			});
			cityService.getCityByDepartment($scope.department).then(function(data){
				$scope.cities = data;
			});
			$scope.city = c.city;
			$scope.circuit = c.circuit;

		});

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

		$scope.validNit = function(){
			if($scope.personeria=='SI')
				$("#nit").prop("disabled",false);
			else{
				$("#nit").val("");
				$("#nit").prop("disabled",true);
			}
		}

		zoneService.getAllZone().then(function(data){
			$scope.zones = data;
		});

	}]);


	app.controller('church-new', ['circuitService', '$scope', 'zoneService', 'departmentService', 'cityService', 'churchService',
		function(circuitService, $scope, zoneService, departmentService, cityService, churchService) {

		$scope.saveChurch = function(){
			churchService.churchNew($scope.name, $scope.category, $scope.address, $scope.phone, $scope.cellular, $scope.vereda, $scope.email, $scope.countMembers, $scope.personeria, $scope.circuit, $scope.city, $scope.statusICM, $scope.yearDedication, $scope.nit, $scope.user).then(function(data){
				if( data == 'ok' )
				{
					$scope.mjs = "La información fue guardada correctamente.";
					$scope.class = "btn btn-success";
					$('#myModal').modal('show');
				}
				else
				{
					$scope.mjs = data + " No fue posible guardar la información.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
			});
		}


		$scope.updateYear = function(){
			if($scope.statusICM == 'DEDICADO')
				$("#yearDedication").prop("disabled", false);
			else{
				$("#yearDedication").prop("disabled", true);
				$("#yearDedication").val("");
			}
		}


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

		$scope.validNit = function(){
			if($scope.personeria=='SI')
				$("#nit").prop("disabled",false);
			else{
				$("#nit").val("");
				$("#nit").prop("disabled",true);
			}
		}

		departmentService.getAllDepartment().then(function(data){
			$scope.departments = data;
		});

		zoneService.getAllZone().then(function(data){
			$scope.zones = data;
		});
	}]);





	/* ########################## person ############################## */
	app.controller('person-edit',['personService', '$scope', '$routeParams', 'zoneService', 'circuitService', 'churchService', '$rootScope',
		function(personService, $scope, $routeParams, zoneService, circuitService, churchService, $rootScope){
		
		$scope.document = $routeParams.document;

		$scope.getChurchesByCircuit = function(){
			//$("#selectBox option[value='option1']").remove();
			churchService.getByCircuit($scope.circuit).then(function(data){
				$scope.churches = data;
			});
		} 

		$scope.enableAffiliation = function(){
			if($scope.socialSecurity=='SI')
				$("#affiliation").prop("disabled",false);
			else{
				$("#affiliation").val("");
				$("#affiliation").prop("disabled",true);
			}
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
			if($scope.typePerson == 'PASTOR' && ($("#theologicalLevel").val() == '' || $("#pastoralLevel").val() == ''))
			{
				$scope.mjs = "Faltan por llenar algunos campos.";
				$scope.class = "btn btn-warning";
				$('#myModal').modal('show');
			}
			else if($("#socialSecurity").val() == 'SI' && ($("#affiliation").val() == '' || $("#affiliation").val() == null))
			{
				$scope.mjs = "Faltan por llenar algunos campos.";
				$scope.class = "btn btn-warning";
				$('#myModal').modal('show');
			}
			else{
				personService.updatePerson($scope.id, $scope.document, $scope.names, $scope.lastnames, $scope.sex, $scope.church, $scope.phone, $scope.email, $scope.startMinistry, $scope.dateIn, $scope.theologicalLevel, $scope.typePerson, $scope.pastoralLevel, $scope.maritalStatus, $scope.academicLevel, $scope.typeHome, $("#birthdate").val(), $scope.socialSecurity, $rootScope.user, $scope.affiliation).then(function(data){
					if( data != 'na' )
					{
						$scope.mjs = "La información fue guardada correctamente.";
						$scope.class = "btn btn-success";
						$('#myModal').modal('show');
					}
					else
					{
						$scope.mjs = " No fue posible guardar la información.";
						$scope.class = "btn btn-warning";
						$('#myModal').modal('show');
					}
				});
			}
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
				if($scope.socialSecurity == 'SI'){
					$("#affiliation").prop('disabled', false);
					$scope.affiliation = p.affiliation;
				}
			});
			churchService.getByCircuit($scope.circuit).then(function(data){
				$scope.churches = data;
			});
			//$scope.churches = [{ "id": $scope.idChurch, "name": $scope.church }];
			$scope.church = $scope.idChurch;
			//console.log($scope.churches);
		});

	}]);

	app.controller('person-new', ['personService', '$scope', 'zoneService', 'circuitService', 'churchService', '$rootScope',
		function(personService, $scope, zoneService, circuitService, churchService, $rootScope){

		$scope.buscar = function(){
			personService.getPerson($scope.document, '', '').then(function(data){
				if(data.length > 0)
				{
					name = "";
					data.forEach(function(d){
						name = d.names + " " + d.lastnames;
					});
					$scope.mjs = "La persona "+ name +" ya existe.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
			});
		}

		$scope.enableAffiliation = function(){
			if($scope.socialSecurity=='SI'){
				$("#affiliation").prop("disabled",false);
			}
			else{
				$("#affiliation").val("");
				$("#affiliation").prop("disabled",true);
			}
		}

		$scope.save = function(){
			personService.getPerson($scope.document, '', '').then(function(data){
				if(data.length > 0)
				{
					name = "";
					data.forEach(function(d){
						name = d.names + " " + d.lastnames;
					});
					$scope.mjs = "La persona "+ name +" ya existe.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
				else if($scope.typePerson == 'PASTOR' && ($("#theologicalLevel").val() == '' || $("#pastoralLevel").val() == ''))
				{
					$scope.mjs = "Faltan por llenar algunos campos.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
				else if($("#socialSecurity").val() == 'SI' && ($("#affiliation").val() == '' || $("#affiliation").val() == null))
				{
					$scope.mjs = "Faltan por llenar algunos campos.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
				else{
					personService.newPerson($scope.document, $scope.names, $scope.lastnames, $scope.sex, $scope.churchs, $scope.phone, $scope.email, $scope.startMinistry, $scope.dateIn, $scope.theologicalLevel, $scope.typePerson, $scope.pastoralLevel, $scope.maritalStatus, $scope.academicLevel, $scope.typeHome, $("#birthdate").val(), $scope.socialSecurity, $rootScope.user, $scope.affiliation).then(function(data){
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
			$scope.names = "";
			data.forEach(function(d){
				$scope.names = d.names + " " + d.lastnames;
			});
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