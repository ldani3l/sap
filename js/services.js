(function () {

  var app = angular.module('sap.services', []);

    // ---------------------- SESSION -------------------------
  app.factory("event", ["$http", "$q", function($http, $q){
    
    function getActualEvent() {
        var deferred = $q.defer();
        $http.get('php/event/viewEvent.php?action=getEvent')
          .success(function (data){
            deferred.resolve(data);
          });
        return deferred.promise;
    }

    function register(participation, document, idPrice, user) {
        var deferred = $q.defer();
        
        var FormData = {
            participation: participation,
            document: document,
            user: user,
            idPrice: idPrice
        };

        $http({
            method: 'POST',
            url: 'php/event/viewEvent.php?action=register',
            data: FormData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .success(function (data){
            deferred.resolve(data);
          });
        return deferred.promise;
    }

    function eventNew(name, date, price) {
        var deferred = $q.defer();
        
        var FormData = {
            name: name,
            date: date,
            price: price
        };

        $http({
            method: 'POST',
            url: 'php/event/viewEvent.php?action=eventNew',
            data: FormData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .success(function (data){
            deferred.resolve(data);
          });
        return deferred.promise;
    }
    return{
      register: register,
      getActualEvent: getActualEvent,
      eventNew: eventNew
    }
  }]);


    // ---------------------- SESSION -------------------------
  app.factory("session", ["$http", "$q", "$rootScope", function($http, $q, $rootScope){

    function getUsers(){
        var deferred = $q.defer();
        
          $http.get( 'php/user/viewUser.php?action=getUsers')
          .success(function(data){
              deferred.resolve(data);
          });
        return deferred.promise;
      }

  function RandomPassword(Length, Upper, Numbers, Lower)
  {
      Upper = typeof(Upper) != 'undefined' ? Upper : true;
      Numbers = typeof(Numbers) != 'undefined' ? Numbers : true;
      Lower = typeof(Lower) != 'undefined' ? Lower : true;
       
      if (!Upper && !Lower && !Numbers)
          return "";
   
      var Ret = "";
      var Num;
      var Repeat;
   
      Chars = 26 * 2 + 10;    //26 (a-z) + 26 (A-Z) + 10 (0-9)
      //a-z = 97-122
      //A-Z = 65-90
      //0-9 = 48-57
   
      for (i = 1; i <= Length; i++)
      {
          Repeat = false;
   
          Num = Math.floor(Math.random()*Chars);
   
          if (Num < 26)
              if (Lower)
                  Ret = Ret + String.fromCharCode(Num + 97);
              else
                  Repeat = true;
          else if (Num < 52)
              if (Upper)
                  Ret = Ret + String.fromCharCode(Num - 26 + 65);
              else
                  Repeat = true;
          else if (Num < 62)
              if (Numbers)
                  Ret = Ret + String.fromCharCode(Num - 52 + 48);
              else
                  Repeat = true;
   
          if (Repeat)
              i--;
      }
      return Ret;
  }

    function newUser(user, pass, type, email) {
        var deferred = $q.defer();
        
        var FormData = {
          user: user,
          pass: pass,
          type: type,
          email: email
        };
                 
        $http({
            method: 'POST',
            url: 'php/user/viewUser.php?action=newUser',
            data: FormData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .success(function (data){
            deferred.resolve(data);
          });
        return deferred.promise;
    }

    function updatePass(user, pass) {
        var deferred = $q.defer();
        
        var FormData = {
            user: user,
            pass: pass
        };
                 
        $http({
            method: 'POST',
            url: 'php/user/viewUser.php?action=updatePass',
            data: FormData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .success(function (data){
            deferred.resolve(data);
          });
        return deferred.promise;
    }

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
      updatePass: updatePass,
      getUsers: getUsers,
      RandomPassword: RandomPassword,
      newUser: newUser,
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
      
      function getById(id){
        var deferred = $q.defer();
        
          $http.get( 'php/department/vDepartment.php?action=getById', {
            params:{
              id: id
            }
          })
          .success(function(data){
              deferred.resolve(data);
          });
        return deferred.promise;
      }

      function getAllDepartment(circuit){
        var deferred = $q.defer();
        
          $http.get( 'php/department/vDepartment.php?action=getAll' )
          .success(function(data){
              deferred.resolve(data);
          });
        return deferred.promise;
      }

      return{
        getById: getById,
        getAllDepartment: getAllDepartment
      };

    }]);

    // ---------------------- CHURCH -------------------------
    app.factory('churchService', ['$http', '$q', function ($http, $q) {

    function churchGetById(id){
      var deferred = $q.defer();
        var FormData = {
              id: id
        };
        $http({
            method: 'POST',
            url: 'php/church/vChurch.php?action=get',
            data: FormData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
        .success(function(data){
            deferred.resolve(data);
        });
      return deferred.promise;
    }

    function churchSearch(name, circuit, zone){
      var deferred = $q.defer();
        var FormData = {
              name: name,
              circuit: circuit,
              zone: zone
        };
        $http({
            method: 'POST',
            url: 'php/church/vChurch.php?action=churchSearch',
            data: FormData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
        .success(function(data){
            deferred.resolve(data);
        });
      return deferred.promise;
    }

    function churchUpdate(id, name, category, address, phone, cellular, vereda, email, countMembers, personeria, circuit, city, statusICM, yearDedication, nit, user){
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
              nit: nit,
              user: user,
        };

        $http({
            method: 'POST',
            url: 'php/church/vChurch.php?action=churchUpdate',
            data: FormData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
        .success(function(data){
            deferred.resolve(data);
        });
      return deferred.promise;
    }

    function churchNew(name, category, address, phone, cellular, vereda, email, countMembers, personeria, circuit, city, statusICM, yearDedication, nit, user){
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
              nit: nit,
              user: user
        };

        $http({
            method: 'POST',
            url: 'php/church/vChurch.php?action=churchNew',
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
          })
          .success(function(data){
              deferred.resolve(data);
          });
        return deferred.promise;
      }

      return{
        churchGetById: churchGetById,
        churchSearch: churchSearch,
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
