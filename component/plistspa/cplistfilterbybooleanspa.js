'use strict';
moduloDirectivas.component('cplistfilterbybooleanspa', {
    restrict: 'E',
    bindings: {
        url: '<',
        field: '<',
        rpp: '<',
        numpage: '<',
        orderparams: '<',
        filterparams: '<'
    },
    templateUrl: 'component/plistspa/cplistfilterbybooleanspa.html',
    controllerAs: 'filterbyboolean',
    controller:
            ['$rootScope',
                function ($rootScope) {
                    var self = this;
                    self.operator = "";
                    self.value = "";
                    self.dofilter = function () {
                        if (self.field != "" && self.operator != "" && self.value != "") {
                            if (self.filterparams) {
                                var newFilter = self.filterparams + "+and," + self.field.Name + "," + self.operator + "," + self.value;
                            } else {
                                var newFilter = "+and," + self.field.Name + "," + self.operator + "," + self.value;
                            }
                            $rootScope.$broadcast('filterSelectionEvent', newFilter);
                        }
                        return false;
                    };
                }
            ]   
});


