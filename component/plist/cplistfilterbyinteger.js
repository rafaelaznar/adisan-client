'use strict';
moduloDirectivas.component('cplistfilterbyinteger', {
    restrict: 'E',
    bindings: {
        url: '<',
        field: '<',
        rpp: '<',
        numpage: '<',
        orderparams: '<',
        filterparams: '<'
    },
    templateUrl: 'component/plist/cplistfilterbyinteger.html',
    controllerAs: 'filterbyinteger',
    controller:
        ['$location',
            function ($location) {
                var self = this;
                self.operator = "";
                self.value = "";
                self.dofilter = function () {
                    if (self.field != "" && self.operator != "" && self.value != "") {
                        var newFilter = self.filterparams + "+and," + self.field.Name + "," + self.operator + "," + self.value;
                        if (self.orderparams) {
                            $location.path(self.url + '/' + self.numpage + '/' + self.rpp).search('filter', newFilter).search('order', self.orderparams);
                        } else {
                            $location.path(self.url + '/' + self.numpage + '/' + self.rpp).search('filter', newFilter);
                        }
                    }
                    return false;
                };
                /*
                                    this.$postLink = function () {
                                        console.log(self.field.Name);
                                    }
                */

            }
        ]
});


