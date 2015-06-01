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


      //Reportes      
      .when('/report-event-user', {
        templateUrl: 'views/report-event-user.html',
        controller: 'report-event-user'
      })
      
      //Usuarios
      .when('/user-new', {
        templateUrl: 'views/user-new.html',
        controller: 'user-new'
      })
      .when('/user-reset', {
        templateUrl: 'views/user-reset.html',
        controller: 'user-reset'
      })


      //Eventos
      .when('/event-new', {
        templateUrl: 'views/event-new.html',
        controller: 'event-new'
      })
      .when('/event-register', {
        templateUrl: 'views/event-register.html',
        controller: 'event-register'
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
