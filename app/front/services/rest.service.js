(function() {
    'use strict';

    angular
        .module('app')
        .factory("restService", restService);

    restService.$inject = ["$resource"];

    function restService($resource) {

        var Pic = $resource(
            '/api/pics/:id', {
                id: '@id'
            }, {
                "update": {
                    method: "PUT"
                }
            }
        );

        var MyPic = $resource(
            '/api/mypics', {}, {
                getmypics: { method: 'POST', isArray: true }
            }
        );

        return {
            addPic: addPic,
            getPics: getPics,
            updatePic: updatePic,
            deletePicById: deletePicById,
            getMyPics: getMyPics
        };

        function addPic(PicObj, callback, errorCallback) {
            return Pic.save(
                PicObj,
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }

        function getPics(callback, errorCallback) {
            return Pic.query(
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }

        function updatePic(id, voter, callback, errorCallback) {
            return Pic.update({
                    id: id
                },
                voter,
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }

        function deletePicById(id, callback, errorCallback) {
            return Pic.delete(
                { id: id },
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }

        function getMyPics(userId, callback, errorCallback) {
            return MyPic.getmypics({}, {
                    userId: userId
                },
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }

    }

})();
