(function () {

  var app = angular.module('sap.services', []);


    // ---------------------- SESSION -------------------------
  app.factory("session", ["$http", "$q", "$rootScope", function($http, $q, $rootScope){

    function login(user, pass) {
        var deferred = $q.defer();
        
        var FormData = {
            user: user,
            pass: pass
        };
                 
        $http({
            method: 'POST',
            url: 'php/user/viewUser.php?action=login',
            data: FormData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .success(function (data){
            deferred.resolve(data);
          });
        return deferred.promise;
    }

    function getUrls(type){
      var deferred = $q.defer();
        var FormData = {
            type: type
        };

        $http({
            method: 'POST',
            url: 'php/user/viewUser.php?action=getUrls',
            data: FormData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
        .success(function(data){
            deferred.resolve(data);
        });
      return deferred.promise;
    }

    return{
      login: login,
      getUrls: getUrls
    }

  }]);


    // ---------------------- CITY -------------------------
    app.factory('cityService', ['$http', '$q', function ($http, $q) {
      
      function getCityByDepartment(department){
        var deferred = $q.defer();
        
          $http.get( 'php/city/vCity.php?action=getAllByDepartment',{
            params:{
              department: department
            }
          })
          .success(function(data){
              deferred.resolve(data);
          });
        return deferred.promise;
      }

      return{
        getCityByDepartment: getCityByDepartment
      };

    }]);

    // ---------------------- DEPARTMENT -------------------------
    app.factory('departmentService', ['$http', '$q', function ($http, $q) {
      
      function getAllDepartment(circuit){
        var deferred = $q.defer();
        
          $http.get( 'php/department/vDepartment.php?action=getAll' )
          .success(function(data){
              deferred.resolve(data);
          });
        return deferred.promise;
      }

      return{
        getAllDepartment: getAllDepartment
      };

    }]);

    // ---------------------- CHURCH -------------------------
    app.factory('churchService', ['$http', '$q', function ($http, $q) {

    function churchUpdate(id, name, category, address, phone, cellular, vereda, email, countMembers, personeria, circuit, city, statusICM, yearDedication, status, nit, user, affiliation){
      var deferred = $q.defer();
        var FormData = {
              id: id,
              name: name,
              category: category,
              address: address,
              phone: phone,
              cellular: cellular,
              vereda: vereda,
              email: email,
              countMembers: countMembers,
              personeria: personeria,
              circuit: circuit,
              city: city,
              statusICM: statusICM,
              yearDedication: yearDedication,
              status: status,
              nit: nit,
              user: user,
              affiliation: affiliation
        };

        $http({
            method: 'POST',
            url: 'php/church/cChurch.php?action=churchUpdate',
            data: FormData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
        .success(function(data){
            deferred.resolve(data);
        });
      return deferred.promise;
    }

    function churchNew(name, category, address, phone, cellular, vereda, email, countMembers, personeria, circuit, city, statusICM, yearDedication, status, nit, user, affiliation){
      var deferred = $q.defer();
        var FormData = {
              name: name,
              category: category,
              address: address,
              phone: phone,
              cellular: cellular,
              vereda: vereda,
              email: email,
              countMembers: countMembers,
              personeria: personeria,
              circuit: circuit,
              city: city,
              statusICM: statusICM,
              yearDedication: yearDedication,
              status: status,
              nit: nit,
              user: user,
              affiliation: affiliation
        };

        $http({
            method: 'POST',
            url: 'php/church/cChurch.php?action=churchNew',
            data: FormData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
        .success(function(data){
            deferred.resolve(data);
        });
      return deferred.promise;
    }

      function getByCircuit(circuit){
        var deferred = $q.defer();
        
          $http.get( 'php/church/vChurch.php?action=getByCircuit', {
            params:{
              circuit: circuit
            }
          } )
          .success(function(data){
              deferred.resolve(data);
          });
        return deferred.promise;
      }

      return{
        churchNew: churchNew,
        churchUpdate: churchUpdate,
        getByCircuit: getByCircuit
      };

    }]);


    // ---------------------- CIRCUIT -------------------------
    app.factory('circuitService', ['$http', '$q', function ($http, $q) {
      
      function getByZone(zone){
        var deferred = $q.defer();
        
          $http.get( 'php/circuit/vCircuit.php?action=getByZone', {
            params:{
              zone: zone
            }
          } )
          .success(function(data){
              deferred.resolve(data);
          });
        return deferred.promise;
      }

      return{
        getByZone: getByZone
      };

    }]);


    // ---------------------- ZONE -------------------------
    app.factory('zoneService', ['$http', '$q', function ($http, $q) {
      
      function getAllZone(){
        var deferred = $q.defer();
        
          $http.get( 'php/zone/vZone.php?action=get-all' )
          .success(function(data){
              deferred.resolve(data);
          });
        return deferred.promise;
      }

      return{
        getAllZone: getAllZone
      };

    }]);
    

    // ---------------------- PERSON -------------------------
    app.factory('personService', ['$http', '$q', function ($http, $q) {

      function newPerson(document, names, lastnames, sex, church, phone, email, startMinistry, dateIn, theologicalLevel, typePerson, pastoralLevel, maritalStatus, academicLevel, typeHome, birthdate, socialSecurity, user, affiliation) {
        var deferred = $q.defer();
        
        var FormData = {
            document: document,
            names: names,
            lastnames: lastnames,
            sex: sex,
            church: church,
            phone: phone,
            email: email,
            startMinistry: startMinistry,
            dateIn: dateIn,
            theologicalLevel: theologicalLevel,
            typePerson: typePerson,
            pastoralLevel: pastoralLevel,
            maritalStatus: maritalStatus,
            academicLevel: academicLevel,
            typeHome: typeHome,
            birthdate: birthdate,
            socialSecurity: socialSecurity,
            user: user,
            affiliation: affiliation
        };
                 
        $http({
            method: 'POST',
            url: 'php/person/vPerson.php?action=new',
            data: FormData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .success(function (data) {
            deferred.resolve(data);
          });
        return deferred.promise;
      }

      function updatePerson(id, document, names, lastnames, sex, church, phone, email, startMinistry, dateIn, theologicalLevel, typePerson, pastoralLevel, maritalStatus, academicLevel, typeHome, birthdate, socialSecurity, user, affiliation) {
        var deferred = $q.defer();
        
        var FormData = {
            id: id,
            document: document,
            names: names,
            lastnames: lastnames,
            sex: sex,
            church: church,
            phone: phone,
            email: email,
            startMinistry: startMinistry,
            dateIn: dateIn,
            theologicalLevel: theologicalLevel,
            typePerson: typePerson,
            pastoralLevel: pastoralLevel,
            maritalStatus: maritalStatus,
            academicLevel: academicLevel,
            typeHome: typeHome,
            birthdate: birthdate,
            socialSecurity: socialSecurity,
            user: user,
            affiliation: affiliation
        };
                 
        $http({
            method: 'POST',
            url: 'php/person/vPerson.php?action=update',
            data: FormData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .success(function (data) {
            deferred.resolve(data);
          });
        return deferred.promise;
      }

      function getPersonHistory(document) {
        var deferred = $q.defer();
                        
        $http.get('php/person/vPerson.php?action=person-history',{
          params:{
            document: document
          }
        })
        .success(function (data) {
          deferred.resolve(data);
        });
        return deferred.promise;
      }

      function getPerson(document, names, lastnames) {
        var deferred = $q.defer();
                         
        $http.get('php/person/vPerson.php?action=look-for',{
          params:{
            'document': document,
               'names': names,
           'lastnames': lastnames            
          }
        }
            )
          .success(function (data) {
            deferred.resolve(data);
          });
        return deferred.promise;
      }

      return {
        newPerson: newPerson,
        updatePerson: updatePerson,
        getPersonHistory: getPersonHistory,
        getPerson: getPerson
      };

    }]);

})();
