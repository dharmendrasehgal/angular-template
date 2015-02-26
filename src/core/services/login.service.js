/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('loginService', loginService);

    loginService.$inject = ['$http', '$location', 'exception', 'serverapi'];
    /* @ngInject */
    function loginService($http, $location, exception, serverapi) {
        var service = {
            getUserSession: getUserSession
        };

        return service;

        function getUser() {
            return $http.get(serverapi + '/')
                .then(getUserComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for loginService')(message);
                    $location.url('/');
                });

            function getUserComplete(data) {
                return data.data;
            }
        }
    }
})();
