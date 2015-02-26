/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('orderService', orderService);

    orderService.$inject = ['$http', '$location', 'exception', 'serverapi'];
    /* @ngInject */
    function orderService($http, $location, exception, serverapi) {
        var service = {
            getOrder: getOrder
        };

        return service;

        function getOrder() {
            return $http.get(serverapi + '/orders')
                .then(getOrderComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getOrder')(message);
                    $location.url('/');
                });

            function getOrderComplete(data) {
                return data.data;
            }
        }
    }
})();
