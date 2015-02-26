(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state','userService','logger'];

    /* @ngInject */
    function LoginController($state, userService, logger) {
        var vm = this;

        vm.user = null;

        activate();
        vm.loginDashboard = loginDashboard;

        function activate() {
            return getUser().then(function() {
                logger.info('Activated Login View','');
            });
        }

        function getUser() {
            return userService.getUser().then(function(data) {
                vm.user = data;
                return vm.user;
            });
        }
        function loginDashboard(uName){
            logger.info("Logged in as: ",uName);
            $state.go('dashboard');
        }
    }
})();
