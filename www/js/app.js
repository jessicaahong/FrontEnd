//Ionic Starter App

angular.module('starter', [
                            'ionic', 
                            'dashboard.controller', 
                            'chore.controller', 
                            'household.controller', 
                            'announcement.controller', 
                            'supply.controller',
                            'bill.controller',
                            'sessions.controller'
                          ])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'LogoutCtrl',
    // authenticate: true
  })

  .state('app.login', {
    url: '/login', 
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
        // authenticate: false
      }
    }
  })

  .state('app.register', {
    url: '/logout',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl',
        // authenticate: false
      }
    }
  })

  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardCtrl',
        // authenticate: true
      }
    }
  })

  .state('app.chores', {
    url: '/chores',
    views: {
      'menuContent': {
        templateUrl: 'templates/chores.html',
        controller: 'ChoreCtrl as chores'
        // authenticate: true
      }
    }
  })

  .state('app.supplies', {
    url: '/supplies',
    views: {
      'menuContent': {
        templateUrl: 'templates/supplies.html',
        controller: 'SupplyCtrl'
      }
    }
  })

  .state('app.households', {
    url: '/households',
    views: {
      'menuContent' : {
        templateUrl: 'templates/households.html',
        controller: 'HouseholdCtrl',
        // authenticate: true
        // controller: 'HouseholdCtrl as households'
      }
    }
  })

  .state('app.announcements', {
    url: '/announcements',
    views: {
      'menuContent' : {
        templateUrl: 'templates/announcements.html',
        controller: 'AnnouncementCtrl',
        // authenticate: true
        // controller: 'AnnouncementCtrl as announcements'
      }
    }
  })

  .state('app.bills', {
    url: '/bills',
    views: {
      'menuContent': {
        templateUrl: 'templates/bills.html',
        controller: 'BillCtrl',
        // authenticate: true
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
})

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS/*, $route*/) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    // console.log($route.current.templateUrl);
    // if (AuthService.isAuthenticated() && $route.current.templateUrl) {
    //   $state.go('app.dashboard');
    // }
    if (!AuthService.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'app.login' && next.name !== 'app.register') {
        event.preventDefault();
        $state.go('app.login');
      }
    }
  });
});
