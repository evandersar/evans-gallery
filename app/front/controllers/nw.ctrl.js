(function() {
    'use strict';

    angular
        .module('app')
        .controller('NwController', NwController);

    NwController.$inject = ["restService", "authService", "$state", "$timeout"];

    function NwController(restService, authService, $state, $timeout) {
        var nw = this;

        nw.savePic = savePic;
        nw.err = {};
        nw.pic = {
            author: "",
            title: "",
            url: ""
        };

        function savePic() {
            nw.picForm.$setSubmitted();
            //console.log("nw.picForm.$submitted => ", nw.picForm.$submitted);
            //console.log("nw.picForm.$valid => ", nw.picForm.$valid);
            if (nw.picForm.$valid) {
                nw.pic.author = authService.getPayload()['facebook'];
                nw.pic.authorName =authService.getPayload()['name'];

                restService.addPic(
                    nw.pic,
                    function(resp) {
                        //console.log(`pic saved with id: ${resp._id}`);
                        $state.go('my');
                    },
                    function(err) {
                        console.log(err);
                        nw.err = err;
                        //alert(`${err.statusText} ${err.status}`);

                        $timeout(function() {
                            nw.err = {};
                            //console.log('nw.err => ', nw.err);
                        }, 3000);
                    }
                );
            }

        }

        //console.log("End of NwController");
    }

})();
