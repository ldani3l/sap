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
				//console.log(data);
				if(data == 'admin' || data == 'user'){
					$rootScope.user = $scope.user;
					session.getUrls(data).then(function(datos){
						$rootScope.urls = datos;
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

	app.controller('report-event-user', ['personService', '$scope', '$rootScope', 'session', 'circuitService', 'zoneService', 'event',
		function(personService, $scope, $rootScope, session, circuitService, zoneService, event) {

		$scope.consultar = function(){
			//traerse todos los resutados de todas las zonas
			//session.reportFilter($scope.zone, "consultar", $scope.typePerson, $scope.participation, $scope.idPrice).then(function(data){
			session.reportFilter($("#zone").val(), "consultar", $("#typePerson").val(), $("#participation").val(), $("#idPrice").val()).then(function(data){
				$scope.report = data;
				//console.log($scope.zone + " - " +  $scope.typePerson + " - " +  $scope.participation + " - " +  $scope.idPrice );
				//console.log(data);
				$scope.total = 0;
				i = 0;
				data.forEach(function(d){
					$scope.total += parseInt(d.price);
					d.count = ++i;
				});
			});
		}

		$scope.viewAll = function(){
			//traerse todos los resutados de todas las zonas
			session.reportFilter($("#zone").val(), "viewAll", '').then(function(data){
				$scope.report = data;
				//console.log(data);
				$scope.total = 0;
				i = 0;
				data.forEach(function(d){
					$scope.total += parseInt(d.price);
					d.count = ++i;
				});
			});
		}

		event.getActualEvent().then(function(data){
			$scope.events = data;
			data.forEach(function(d){
				$scope.nameEvent = d.name;
				$scope.event = d.event;
			});
		});			
		
		function reportUser(usr){
			session.reportUser(usr).then(function(data){
				$scope.report = data;
				$scope.total = 0;
				i = 0;
				data.forEach(function(d){
					$scope.total += parseInt(d.price);
					d.count = ++i;
				});
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

		$scope.getReport = function(){
			reportUser($("#usuario").val());
			$scope.usuario = $("#usuario").val();
			getDateTime();
		}

		function getDateTime(){
			session.getDateTime().then(function(data){
				$scope.date = data;
			});
		}

		session.getTypeUser($rootScope.user).then(function(data){
			if(data == 'admin')
			{
				$scope.admin = true;
				session.getUsers().then(function(data){
					$scope.users = data;
				});
			}	
			else
			{
				$scope.usuario = $rootScope.user;
				reportUser($rootScope.user);
				getDateTime();
				$scope.admin = false;
			}
			//console.log($scope.admin)
		});
		
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
				//console.log(data)
				if(data.length > 0)
				{
					$scope.names = "";
					data.forEach(function(d){
						$scope.names = d.names + " " + d.lastnames;
					});
				}
				else
					$scope.names = data +  "Sin resultados.";
			});		
		}

		$scope.save = function(){
			event.register($scope.participation, $scope.document, $scope.idPrice, $rootScope.user).then(function(data){
				if( data != 'na' )
				{
					a = data.split(",");
					$scope.consecutive = a[0];
					$scope.hora = a[1];
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
			//$scope.events = data;

				var i = 0;
				$('#idPrice').empty();
				$("#idPrice").append("<option selected value=''>Selecciona:</option>");
				data.forEach(function(o){
					/*if(o.id == $scope.idPrice)
						$("#idPrice").append("<option selected value='" + o.id + "'>" + o.priceprice + " - " + o.nick + "</option>");
					else*/
					if( i < 2 && ( $rootScope.user != 'maria' || $rootScope.user != 'daniel' ) )
						$("#idPrice").append("<option value='" + o.id + "'>" + o.price + " - " + o.description + "</option>");
					if($rootScope.user == 'maria' && i >= 2)
						$("#idPrice").append("<option value='" + o.id + "'>" + o.price + " - " + o.description + "</option>");
					i++;
				});			



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
				data.forEach(function(d){
					if(d.repeat == 'true')
						d.repeat = true;
					else
						d.repeat = false;

				});
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
			if(($("#statusICM").val() == 'DEDICADO' && $("#yearDedication").val() == '') )
			{
				$scope.mjs = "Faltan algunos datos.";
				$scope.class = "btn btn-warning";
				$('#myModal').modal('show');
			}
			else
			churchService.churchUpdate($scope.id, $scope.name, $scope.category, $scope.address, $scope.phone, $scope.cellular, $scope.vereda, $scope.email, $scope.countMembers, $scope.personeria, $("#circuit").val(), $("#city").val(), $scope.statusICM, $scope.yearDedication, $scope.nit, $scope.user).then(function(data){
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

		churchService.churchGetById($scope.id).then(function(c){
			$scope.name = c.name;
			$scope.names = c.names;
			$scope.lastnames = c.lastnames;
			$scope.document = c.document;
			$scope.category = c.category;
			$scope.address = c.address;
			$scope.phone = c.phone;
			$scope.cellular = c.cellular;
			$scope.vereda = c.vereda;
			$scope.email = c.email;
			$scope.countMembers = c.countMembers;
			$scope.personeria = c.personeria;
			if($scope.personeria == 'SI')
				$("#nit").prop("disabled", false);
			//cargar departamentos
				$scope.getDepartment();
				$scope.department = c.department;
				
				$scope.loadCity();
			$scope.statusICM = c.statusICM;
			if($scope.statusICM == 'DEDICADO')
				$("#yearDedication").prop("disabled", false);
			$scope.yearDedication = c.yearDedication;
			$scope.nit = c.nit;
			$scope.user = c.user;
			//Cargar las zonas
				$scope.getZone();
				$scope.zone = c.zone;
			circuitService.getByZone($scope.zone).then(function(data){
				$scope.circuits = data;
			});
			cityService.getCityByDepartment($("#department").val()).then(function(data){
				$scope.cities = data;
			});
			$scope.city = c.city;
				//$("#city").val(c.city).prop("selected", true);
				
			$scope.circuit = c.circuit;
				$scope.getCircuitByZone();
			//console.log($scope.department + " - " + $scope.city);
			//console.log($scope.department + " - " + $scope.city);
		});
		$scope.getDepartment = function(){
			departmentService.getAllDepartment().then(function(data){
				data.forEach(function(o){
					if(o.id == $scope.department)
						$("#department").append("<option selected value='" + o.id + "'>" + o.name + "</option>");
					else
						$("#department").append("<option value='" + o.id + "'>" + o.name + "</option>");
				});
			});
		}

		$scope.loadCity = function(){
			cityService.getCityByDepartment($scope.department).then(function(data){
				//console.log($("#department").val() + " - " + $scope.city);

				$('#city').empty();
				$("#city").append("<option selected value=''>Selecciona:</option>");
				data.forEach(function(o){
				if(o.id == $scope.city)
					$("#city").append("<option selected value='" + o.id + "'>" + o.name + "</option>");
				else
					$("#city").append("<option value='" + o.id + "'>" + o.name + "</option>");
				});
			});
		}

		$scope.getCircuitByZone = function(){
			circuitService.getByZone($scope.zone).then(function(data){
				$('#circuit').empty();
				$("#circuit").append("<option selected value=''>Selecciona:</option>");
				data.forEach(function(o){
					if(o.id == $scope.circuit)
						$("#circuit").append("<option selected value='" + o.id + "'>" + o.name + " - " + o.nick + "</option>");
					else
						$("#circuit").append("<option value='" + o.id + "'>" + o.name + " - " + o.nick + "</option>");
				});			
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

		$scope.getZone = function(){
			zoneService.getAllZone().then(function(data){
				data.forEach(function(o){
					if(o.id == $scope.zone)
						$("#zone").append("<option selected value='" + o.id + "'>" + o.name + "</option>");
					else
						$("#zone").append("<option value='" + o.id + "'>" + o.name + "</option>");
				});
			});
		}

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
		
		$scope.deleteProp = function(){
			if( $("#typePerson").val() != 'PASTOR' && $("#typePerson").val() != 'CO-PASTOR' ){
				$("#theologicalLevel").attr("required", false, "disabled", true);
				$("#pastoralLevel").attr("required", false, "disabled", true);
				$("#maritalStatus").attr("required", false, "disabled", true);
				$("#academicLevel").attr("required", false, "disabled", true);
				$("#socialSecurity").attr("required", false, "disabled", true);
				//$("#affiliation").attr("required", false, "disabled", true);
				$("#typeHome").attr("required", false, "disabled", true);
				$("#whereLive").attr("required", false, "disabled", true);
			}
			else
			{
				$("#theologicalLevel").attr("required", true);
				$("#pastoralLevel").attr("required", true);
				$("#maritalStatus").attr("required", true);
				$("#academicLevel").attr("required", true);
				$("#socialSecurity").attr("required", true);
				//$("#affiliation").attr("required", true);
				$("#typeHome").attr("required", true);
				$("#whereLive").attr("required", true);
			}
		}

		$scope.deleteProp();

		$scope.document = $routeParams.document;

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
				$('#circuit').empty();
				$("#circuit").append("<option selected value=''>Selecciona:</option>");
				data.forEach(function(o){
					if(o.id == $scope.circuit)
						$("#circuit").append("<option selected value='" + o.id + "'>" + o.name + " - " + o.nick + "</option>");
					else
						$("#circuit").append("<option value='" + o.id + "'>" + o.name + " - " + o.nick + "</option>");
				});	
			});
		}

		zoneService.getAllZone().then(function(data){
			$scope.zones = data;
		});

		$scope.save = function (){
			if(($scope.typePerson == 'PASTOR' || $scope.typePerson == 'CO-PASTOR' ) && ($("#theologicalLevel").val() == '' || $("#pastoralLevel").val() == ''))
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
				personService.updatePerson($scope.id, $scope.document, $scope.names, $scope.lastnames, $scope.sex, $("#church").val(), $scope.phone, $scope.email, $scope.startMinistry, $scope.dateIn, $scope.theologicalLevel, $scope.typePerson, $scope.pastoralLevel, $scope.maritalStatus, $scope.academicLevel, $scope.typeHome, $("#birthdate").val(), $scope.socialSecurity, $rootScope.user, $scope.affiliation, $scope.whereLive).then(function(data){
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

		$scope.getChurchesByCircuit = function(){
			churchService.getByCircuit($scope.circuit).then(function(data){
				$('#church').empty();
				$("#church").append("<option value=''>Selecciona:</option>");
				data.forEach(function(o){
					$("#church").append("<option value='" + o.id + "'>" + o.name + "</option>");
				});
				$("#church").val($scope.church);
			});
		} 
		
		personService.getPerson($scope.document, '', '').then(function(data){
			data.forEach(function(p){
				$scope.id = p.id;
				$scope.names = p.names;
				$scope.lastnames = p.lastnames;
				$scope.sex = p.sex;
				
				//Cargar iglesias
				$scope.church = p.idChurch;
				//console.log($scope.church + " - " + p.idChurch)
				//$("#church").val(p.idChurch);
				
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
				$scope.whereLive = p.whereLive;
				
				//Cargar circuitos
					$scope.getCircuitByZone();
					$scope.circuit = p.idCircuit;
				$("#birthdate").val(p.birthdate);
				if($scope.socialSecurity == 'SI'){
					$("#affiliation").prop('disabled', false);
					$scope.affiliation = p.affiliation;
				}
			});
			$scope.getChurchesByCircuit();
			//console.log($("#circuit").val() + " - " + $("#church").val())
			//$scope.getChurchesByCircuit
			//$scope.churches = [{ "id": $scope.idChurch, "name": $scope.church }];
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
		$scope.deleteProp = function(){
			if( $("#typePerson").val() != 'PASTOR' && $("#typePerson").val() != 'CO-PASTOR' ){
				$("#theologicalLevel").attr("required", false, "disabled", true);
				$("#pastoralLevel").attr("required", false, "disabled", true);
				$("#maritalStatus").attr("required", false, "disabled", true);
				$("#academicLevel").attr("required", false, "disabled", true);
				$("#socialSecurity").attr("required", false, "disabled", true);
				//$("#affiliation").attr("required", false, "disabled", true);
				$("#typeHome").attr("required", false, "disabled", true);
				$("#whereLive").attr("required", false, "disabled", true);
			}
			else
			{
				$("#theologicalLevel").attr("required", true);
				$("#pastoralLevel").attr("required", true);
				$("#maritalStatus").attr("required", true);
				$("#academicLevel").attr("required", true);
				$("#socialSecurity").attr("required", true);
				//$("#affiliation").attr("required", true);
				$("#typeHome").attr("required", true);
				$("#whereLive").attr("required", true);
			}
		}

		$scope.deleteProp();

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
				else if($("#church").val() == '? undefined:undefined ?' )//|| $scope.typePerson == 'CO-PASTOR' ) && ($("#theologicalLevel").val() == '' || $("#pastoralLevel").val() == ''))
				{
					$scope.mjs = "Faltan por llenar algunos campos.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}
				/*else if($("#socialSecurity").val() == 'SI' && ($("#affiliation").val() == '' || $("#affiliation").val() == null))
				{
					$scope.mjs = "Faltan por llenar algunos campos.";
					$scope.class = "btn btn-warning";
					$('#myModal').modal('show');
				}*/
				else{
					personService.newPerson($scope.document, $scope.names, $scope.lastnames, $scope.sex, $scope.churchs, $scope.phone, $scope.email, $scope.startMinistry, $scope.dateIn, $scope.theologicalLevel, $scope.typePerson, $scope.pastoralLevel, $scope.maritalStatus, $scope.academicLevel, $scope.typeHome, $("#birthdate").val(), $scope.socialSecurity, $rootScope.user, $scope.affiliation, $scope.whereLive).then(function(data){
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
				data.forEach(function(d){
					if(d.repeat == 'true')
						d.repeat = true;
					else
						d.repeat = false;

				});
				$scope.person = data;
				//console.log(data);
			});
		}
	}]);

})();