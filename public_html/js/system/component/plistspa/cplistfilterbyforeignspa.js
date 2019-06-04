'use strict';
moduloDirectivas.component('cplistfilterbyforeignspa', {
    restrict: 'E',
    bindings: {
        url: '<',
        field: '<',
        rpp: '<',
        numpage: '<',
        orderparams: '<',
        filterparams: '<',
        profile: '<'
    },
    templateUrl: 'js/system/component/plistspa/cplistfilterbyforeignspa.html',
    controllerAs: 'filterbyforeign',
    controller:
            ['$rootScope',
                function ($rootScope) {
                    var self = this;
                    self.operator = "";

                    self.obj_foreign = {"id": ""};


                    //[{'name':'id_tipousuario','longname':'Tipo de usuario','reference':'tipousuario','description':'['descripcion']'}]




                    self.dofilter = function () {
                        if (self.field != "" && self.operator != "") {
                            if (self.filterparams) {
                                var newFilter = self.filterparams + "+and,id_" + self.field.References + "," + self.operator + "," + self.obj_foreign.id;
                                ;
                            } else {
                                var newFilter = "+and,id_" + self.field.References + "," + self.operator + "," + self.obj_foreign.id;
                            }
                            $rootScope.$broadcast('filterSelectionEvent', newFilter);
                        }
                        return false;
                    };



//                    self.dofilter = function () {
//                        if (self.operator != "" && self.value != "") {
//                            var newFilter = self.filterparams + "+and,id_" + self.field.References + "," + self.operator + "," + self.obj_foreign.id;
//                            if (self.orderparams) {
//                                $location.path(self.url + '/' + self.numpage + '/' + self.rpp).search('filter', newFilter).search('order', self.orderparams);
//                            } else {
//                                $location.path(self.url + '/' + self.numpage + '/' + self.rpp).search('filter', newFilter);
//                            }
//                        }
//                        return false;
//                    };
                }
            ]
});


