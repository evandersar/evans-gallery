(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ["authService", "$state"];

    function MainController(authService, $state) {
        var vm = this;
        vm.authenticated = authService.isAuthenticated();
        vm.authenticate = authenticate;
        vm.signout = signout;

        function authenticate(provider) {
            authService.authenticate(provider)
                .then(function(response) {
                    // Signed in with provider.
                    //console.log('Signed in with provider');
                    //console.log('response => ', response);
                    vm.authenticated = authService.isAuthenticated();
                })
                .catch(function(error) {
                    // Something went wrong.
                    console.log(error);
                    if (error.message) {
                        alert(error.message);
                    }
                    else{
                        alert(`${error.statusText} ${error.status}`);
                    }
                });
        }
        
        function signout(){
             authService.logout();
             //console.log("$state.current => ", $state.current);
             if ($state.current.name === 'nw' || $state.current.name === 'my') $state.go('all');
             vm.authenticated = authService.isAuthenticated();
        }

    }

})();
