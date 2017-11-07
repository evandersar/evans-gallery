(function() {
    'use strict';

    angular
        .module('app')
        .controller('AllController', AllController);

    AllController.$inject = ["restService", "angularGridInstance", "authService", "$scope"];

    function AllController(restService, angularGridInstance, authService, $scope) {
        var all = this;
        all.pics = [];
        all.userFB = '';

        all.getPics = getPics;
        all.updatePic = updatePic;
        
        if (authService.isAuthenticated()) all.userFB = authService.getPayload()['facebook'];

        function getPics() {
            restService.getPics(
                function(resp) {
                    all.pics = resp;
                    console.log("all.pics => ", all.pics);
                    //angularGridInstance.gallery.refresh();
                },
                function(err) {
                    console.log(err);
                    alert(`${err.statusText} ${err.status}`);
                }
            );
        }

        all.getPics();
        
        function authenticate(provider) {
            authService.authenticate(provider)
                .then(function(response) {
                    // Signed in with provider.
                    console.log('Signed in with provider');
                    all.userFB = authService.getPayload()['facebook'];
                })
                .catch(function(response) {
                    // Something went wrong.
                    console.log('Something went wrong');
                });
        }

        function updatePic(pic_id, index) {
        
            if (authService.isAuthenticated()) {
                restService.updatePic(
                    pic_id, {
                        voter: authService.getPayload()['facebook']
                    },
                    function(resp) {
                        console.log("resp => ", resp);
                        //console.log(`Pic with id: ${resp._id} successfully updated`);
                        all.pics[index].likes = resp.likes;
                    },
                    function(err) {
                        console.log(err);
                        alert(`${err.statusText} ${err.status}`);
                    }
                );
            }
            else {
                authenticate('facebook');
            }
        
        }

        //console.log("End of AllController");
    }

})();
