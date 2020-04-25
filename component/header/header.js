moduloDirectivas.component('header', {
    templateUrl: "component/header/header.html",
    controllerAs: 'hd',
    controller: menuCtrl,
    bindings:
    {
        ob: '<',
        op: '<',
        meta: '<'
    }
});

function menuCtrl() {
    var self = this;
    //this.$postLink = function () {
    //    console.log(self.ob, self.op)
    //}
}

