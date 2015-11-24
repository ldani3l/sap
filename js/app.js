(function () {

  var app = angular.module('sap', [
    'ngRoute',
    'sap.controllers',
    'sap.services'
    
  ]);

  app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
        //controller: 'home'
      })

      //logout
      .when('/logout', {
        templateUrl: 'views/login.html',
        controller: 'logout'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'users'
      })



      .when('/look-for', {
        templateUrl: 'views/person-look-for.html',
        controller: 'LookFor'
      })

      //Church
      .when('/church-search', {
        templateUrl: 'views/church-search.html',
        controller: 'church-search'
      })
      .when('/church-update/:id', {
        templateUrl: 'views/church-update.html',
        controller: 'church-update'
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
      .when('/update-pass', {
        templateUrl: 'views/update-pass.html',
        controller: 'update-pass'
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

      //Person
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
        redirectTo: '/home'
      });

  }]);


  app.run(function($rootScope, $location, $route)
  {
    $rootScope.$on('$routeChangeStart', function()
    {
        //checkStatus();
    });

  function checkStatus(){
      if($location.path() != '/login')
        if(!in_array($rootScope.urls))
        {
          $location.path("/login");
          $route.reload();
        }
  }

  function in_array(haystack)
  {
      var key = false;
      //console.log($rootScope.urls);
      needle = $location.path();
      a = ''
      angular.forEach(haystack, function(d){
          a = d.url;
          //console.log(needle.slice(0, d.url.length) +" = "+ a);
          if(d.url == needle.slice(0, d.url.length))//needle.slice(0, d.url[0].length)) //
          {
              //console.log(needle +" = "+d.url);
              key = true;
          }
      });
      //console.log(key);
      return key;
  }

  });

})();
