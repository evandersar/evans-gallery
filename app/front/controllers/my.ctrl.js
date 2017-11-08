(function() {
    'use strict';

    angular
        .module('app')
        .controller('MyController', MyController);

    MyController.$inject = ["restService", "authService"];

    function MyController(restService, authService) {
        var my = this;
        my.pics = [];

        my.getMyPics = getMyPics;
        my.updatePic = updatePic;
        my.removePic = removePic;

        function getMyPics() {
            restService.getMyPics(
                authService.getPayload()['facebook'],
                function(resp) {
                    my.pics = resp;
                    //console.log("my.pics => ", my.pics);
                },
                function(err) {
                    console.log(err);
                    alert(`${err.statusText} ${err.status}`);
                }
            );
        }

        my.getMyPics();

        function updatePic(pic_id, index) {

            restService.updatePic(
                pic_id, {
                    voter: authService.getPayload()['facebook']
                },
                function(resp) {
                    //console.log("resp => ", resp);
                    //console.log(`Pic with id: ${resp._id} successfully updated`);
                    my.pics[index].likes = resp.likes;
                },
                function(err) {
                    console.log(err);
                    alert(`${err.statusText} ${err.status}`);
                }
            );

        }

        function removePic(pic_id, index) {

            restService.deletePicById(
                pic_id,
                function(resp) {
                    //console.log("resp => ", resp);
                    //console.log(`Pic with id: ${resp._id} successfully removed`);
                    my.pics.splice(index, 1);
                },
                function(err) {
                    console.log(err);
                    alert(`${err.statusText} ${err.status}`);
                }
            );

        }

    }

})();
