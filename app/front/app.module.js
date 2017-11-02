(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngResource', 'satellizer'])
        .config(routerConfig);

    function routerConfig($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {

        $authProvider.facebook({
            clientId: '229030674297824'
        });

        $locationProvider.html5Mode(true);

        var states = [{
                name: 'all',
                url: '/all',
                templateUrl: 'front/views/all.html',
                controller: 'AllController',
                controllerAs: 'all'
            },

            {
                name: 'my',
                url: '/my',
                templateUrl: 'front/views/my.html',
                controller: 'MyController',
                controllerAs: 'my',
                resolve: {
                    redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                }
            },

            {
                name: 'nw',
                url: '/nw',
                templateUrl: 'front/views/nw.html',
                controller: 'NwController',
                controllerAs: 'nw',
                resolve: {
                    redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                }
            },

        ];

        function _redirectIfNotAuthenticated($q, $state, $auth, $timeout, authService) {
            var defer = $q.defer();
            if (authService.isAuthenticated()) {
                defer.resolve(); /* (3) */
            }
            else {
                $timeout(function() {
                    $state.go('all'); /* (4) */
                });
                defer.reject();
            }
            return defer.promise;
        }

        states.forEach(function(state) {
            $stateProvider.state(state);
        });

        $urlRouterProvider.otherwise('/all');

    }

})();
