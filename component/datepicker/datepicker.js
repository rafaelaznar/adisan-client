moduloDirectivas.component('datePicker', {
    templateUrl: "component/datepicker/datepicker.html",
    controllerAs: 'dt',
    controller: datepicker,
    bindings: {
        name: '<',
        required: '<',
        model: '=',
        form: '='
    }
});
// $postLink $onInit  $onChanges  $onDestroy
function datepicker() {
    var self = this;
    var validity = function (isValid) {
        if (self.form) {
            self.form[self.name].$setValidity('valid', isValid);
        }
    }
    var checkValidity = function () {
        if (self.model) {
            var fechaCompleta = moment(self.model, "DD/MM/YYYY");
            var dayA = moment("01/01/1900", "DD/MM/YYYY");
            var dayB = moment("31/12/2099", "DD/MM/YYYY");
            var fechaHora = moment(self.model, "DD/MM/YYYY", true).isValid();
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
        if (self.model) {
            moment.suppressDeprecationWarnings = true;
            //self.model = moment(self.model).format("DD/MM/YYYY");
            //self.model = moment(self.model).startOf('day');
            self.model =self.model.split(" ")[0];

        }
        checkValidity();
    }
    //    this.$onInit = function () {
    //        checkValidity();
    //    }
}