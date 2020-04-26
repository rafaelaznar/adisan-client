moduloDirectivas.component('adisanmenu', {
    templateUrl: "component/menu/menu.html",
    controllerAs: 'mn',
    controller: menuCtrl,
    bindings: {
        user: "<",
        meta: "<"
    }
});

function menuCtrl($location, serverCallService) {
    var self = this;

    this.$postLink = function () {
        if (self.user != null) {
            self.isSessionActive = true;
            self.session_info = self.user;
        } else {
            self.isSessionActive = false;
        }
    };

    self.isActive = function (viewLocation) {
        //return viewLocation === $location.path();
        //console.log($location.path() , viewLocation , $location.path().startsWith(viewLocation))
        return $location.path().startsWith(viewLocation);        
    };
}
