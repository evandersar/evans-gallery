(function() {
    'use strict';

    angular
        .module('app')
        .controller('AllController', AllController);

    AllController.$inject = ["restService", "authService", "$state", "$scope"];

    function AllController(restService, authService, $state, $scope) {
        var all = this;
        all.pics = [];
        all.headingTitle = "All Pictures";

        all.getPics = getPics;
        all.updatePic = updatePic;
        all.getMyPics = getMyPics;
        
        var userId = $state.params.id;
        
        function getMyPics() {
            restService.getMyPics(
                userId,
                function(resp) {
                    all.pics = resp;
                    all.headingTitle = `Pictures of ${all.pics[0].authorName}`;
                    //console.log("all.pics => ", all.pics);
                },
                function(err) {
                    console.log(err);
                    alert(`${err.statusText} ${err.status}`);
                }
            );
        }

        function getPics() {
            restService.getPics(
                function(resp) {
                    all.pics = resp;
                    //console.log("all.pics => ", all.pics);
                    //angularGridInstance.gallery.refresh();
                },
                function(err) {
                    console.log(err);
                    alert(`${err.statusText} ${err.status}`);
                }
            );
        }
        
        if (userId) {
            all.getMyPics();
        }
        else{
            all.getPics();
        }

        function updatePic(pic_id, index) {
        
            if (authService.isAuthenticated()) {
                restService.updatePic(
                    pic_id, {
                        voter: authService.getPayload()['facebook']
                    },
                    function(resp) {
                        //console.log("resp => ", resp);
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
                $scope.vm.authenticate('facebook');
            }
        
        }

        //console.log("End of AllController");
    }

})();
