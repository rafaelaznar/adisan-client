'use strict';

moduloDirectivas.directive('plistheaderspa', function () {
    return {
        restrict: 'A',
        templateUrl: 'js/system/component/plistspa/plistheaderspa.html'
    };
});

moduloSistema.controller('plistHeaderSpaController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.doorder = function (field, mode)
        {
            $scope.uorder = field + ',' + mode;
            $rootScope.$broadcast('orderSelectionEvent', $scope.uorder);
            return false;
        }
    }]);