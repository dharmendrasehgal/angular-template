/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('OrderService', OrderService);

    OrderService.$inject = ['$resource', 'serverapi','socketFactory'];
    /* @ngInject */
    function OrderService($resource, serverapi, socketFactory) {
        return $resource(serverapi + '/:type', null, {
            users: {
                method: 'GET',
                params: { type: 'users' },
                isArray: true
            },
            instruments: {
                method: 'GET',
                params: { type: 'instruments' },
                isArray: true
            },

            orders: {
                method: 'GET',
                params: { type: 'orders'},
                isArray: true
            },

            createOrder: {
                method: 'POST',
                params: { type: 'orders'}
            },

            clearOrders: {
                method: 'DELETE',
                params: { type: 'orders' }
            }
        });
    }
})();
