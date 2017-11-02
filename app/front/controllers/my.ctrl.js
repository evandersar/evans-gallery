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
        
        function getMyPics(){
            restService.getMyPics(
                authService.getPayload()['facebook'],
                function(resp){
                    my.pics = resp;
                    console.log("my.pics => ", my.pics);
                },
                function(err){
                    console.log(err);
                    alert(`${err.statusText} ${err.status}`);
                }
            );
        }
        
        my.getMyPics();
        
    }
    
})();