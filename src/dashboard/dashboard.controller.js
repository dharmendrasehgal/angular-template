(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['orderService', 'logger', 'OrderService', 'OrderEventService', 'EventType'];

    /* @ngInject */
    function DashboardController(orderService, logger, OrderService, OrderEventService, EventType) {
        var vm = this;

        //vm.order = null;

        // activate();

        // function activate() {
        //     return getOrder().then(function() {
        //         logger.info('Activated Dashboard View');
        //     });
        // }

        // function getOrder() {
        //     return orderService.getOrder().then(function(data) {
        //         vm.order = data;
        //         return vm.order;
        //     });
        // }
        //custom
        vm.users = OrderService.users();
        vm.instruments = OrderService.instruments();
        vm.orders = OrderService.orders();

        // Returns a random integer between min and max
        // Using Math.round() will give you a non-uniform distribution!
        // Based on: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random
        function getRandomInt (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function findOrder(id) {
            return _.find(vm.orders, {id: id});
        }

        vm.createOrder = function() {
            var numInstruments = vm.instruments.length;
            OrderService.createOrder(null, {
                side: 'Buy',
                symbol: vm.instruments[getRandomInt(0, numInstruments-1)].symbol,
                quantity: 5000,
                limitPrice: 100,
                traderId: 'EJ'                
            });
        };

        vm.refreshOrders = function() {
            vm.orders = OrderService.orders();
        };

        vm.clearOrders = function() {
            OrderService.clearOrders();
        };

        OrderEventService.on(EventType.orderCreated, function(order) {
            vm.orders.push(order);
        });

        OrderEventService.on(EventType.placementCreated, function(placement) {
            var order = findOrder(placement.orderId);

            if (order) {
                order.quantityPlaced += placement.quantityPlaced;
                order.status = placement.status;
            }
        });

        OrderEventService.on(EventType.executionCreated, function(execution) {
            var order = findOrder(execution.orderId);

            if (order) {
                order.quantityExecuted += execution.quantityExecuted;
                order.status = execution.status;
                order.executionPrice = execution.executionPrice;
            }
        });

        OrderEventService.on(EventType.allOrdersDeleted, function() {
            vm.orders = [];
        });
    }
})();
