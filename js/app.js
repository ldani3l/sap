(function () {

  var app = angular.module('sap', [
    'ngRoute',
    'sap.controllers',
    'sap.services'
    
  ]);

  app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
      })
      .when('/look-for', {
        templateUrl: 'views/person-look-for.html',
        controller: 'LookFor'
      })
      .when('/church-new', {
        templateUrl: 'views/church-new.html',
        controller: 'church-new'
      })
      
      
      .when('/person-history/:document', {
        templateUrl: 'views/person-history.html',
        controller: 'person-history'
      })
      .when('/person-new', {
        templateUrl: 'views/person-new.html',
        controller: 'person-new'
      })
      .when('/person-profile/:document', {
        templateUrl: 'views/person-profile.html',
        controller: 'person-profile'
      })
      .when('/person-edit/:document', {
        templateUrl: 'views/person-edit.html',
        controller: 'person-edit'
      })
      
      .otherwise({
        redirectTo: '/'
      });

  }]);

})();
