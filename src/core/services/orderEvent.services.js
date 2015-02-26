/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .service('OrderEventService', OrderEventService);

    OrderEventService.$inject = ['socketFactory', 'serverapi'];
    /* @ngInject */
    function OrderEventService(socketFactory, serverapi) {
        var socket = socketFactory({
            ioSocket: io.connect(serverapi)
        });

        this.on = function(eventType, callback) {
            socket.on(eventType, callback);
        };
    }
})();
