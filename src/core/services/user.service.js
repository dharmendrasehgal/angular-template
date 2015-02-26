/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('userService', userService);

    userService.$inject = ['$http', '$location', 'exception', 'serverapi'];
    /* @ngInject */
    function userService($http, $location, exception, serverapi) {
        var service = {
            getUser: getUser
        };

        return service;

        function getUser() {
            return $http.get(serverapi + '/users')
                .then(getUserComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getUsers')(message);
                    $location.url('/');
                });

            function getUserComplete(data) {
                return data.data;
            }
        }
    }
})();
