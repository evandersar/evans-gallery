(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('AllController', AllController);
        
    AllController.$inject = ["restService"];
    
    function AllController(restService) { 
        var all = this;
        all.pics = [];
        
        all.getPics = getPics;
        
        function getPics(){
            restService.getPics(
                function(resp){
                    all.pics = resp;
                    console.log("all.pics => ", all.pics);
                },
                function(err){
                    console.log(err);
                    alert(`${err.statusText} ${err.status}`);
                }
            );
        }
        
        all.getPics();
        
        //console.log("End of AllController");
    }
    
})();