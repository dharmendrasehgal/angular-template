(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('api', 'http://localhost:3000/api')
        .constant('serverapi', 'http://localhost:8181')
        .constant('orderapi', 'http://localhost:9000')
        .constant('EventType', {
        orderCreated: 'orderCreatedEvent',
        placementCreated: 'placementCreatedEvent',
        executionCreated: 'executionCreatedEvent',
        allOrdersDeleted: 'allOrdersDeletedEvent'
    });
})();
