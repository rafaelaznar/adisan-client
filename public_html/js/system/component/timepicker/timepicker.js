moduloDirectivas.component('dateTimePicker', {
    templateUrl: "js/system/component/timepicker/timepicker.html",
    controllerAs: 'dtp',
    controller: datetimepicker,
    bindings: {
        name: '<',
        required: '<',
        model: '=',
        form: '='
    }
});
// $postLink $onInit  $onChanges  $onDestroy
function datetimepicker() {
    var self = this;
    var validity = function (isValid) {
        if (self.form) {
            self.form[self.name].$setValidity('valid', isValid);
        }
    }
    var checkValidity = function () {
        if (self.model) {
            var fechaCompleta = moment(self.model, "DD/MM/YYYY HH:mm");
            var dayA = moment("01/01/1970 00:00", "DD/MM/YYYY HH:mm");
            var dayB = moment("31/12/2099 23:59", "DD/MM/YYYY HH:mm");
            var fechaHora = moment(self.model, "DD/MM/YYYY HH:mm", true).isValid();
            if ((fechaCompleta <= dayA || fechaCompleta >= dayB) || !fechaHora) {
                if (self.model == '') {
                    validity(true);
                } else {
                    validity(false);
                }
            } else {
                validity(true);
            }
        } else {
            validity(true);
        }
    }
    self.change = function () {
        checkValidity();
    }
    this.$postLink = function () {
        checkValidity();
    }
    this.$onInit = function () {
        checkValidity();
    }
}