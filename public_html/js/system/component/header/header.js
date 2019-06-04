moduloDirectivas.component('header', {
    templateUrl: "js/system/component/header/header.html",
    controllerAs: 'hd',
    controller: menuCtrl,
    bindings:
            {
                ob: '<',
                op: '<'
            }
});
function menuCtrl(serverCallService) {
    var self = this;
    this.$onInit = function () {
        serverCallService.getAllObjectsMetaData().then(function (response) {
            if (response.status == 200) {
                if (response.data.status == 200) {
                    self.status = null;
                    self.meta = response.data.json;
                } else {
                    self.status = "Error en la recepción de datos del servidor";
                }
            } else {
                self.status = "Error en la recepción de datos del servidor";
            }
        }).catch(function (data) {
            self.status = "Error en la recepción de datos del servidor";
        });      
    }
}
