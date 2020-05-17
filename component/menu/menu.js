moduloDirectivas.component('adisanmenu', {
    templateUrl: "component/menu/menu.html",
    controllerAs: 'mn',
    controller: menuCtrl,
    bindings: {
        session: "<"
    }
});

function menuCtrl($location, serverCallService) {
    var self = this;

    this.$postLink = function () {
        if (self.session != null) {
            self.meta = self.session.meta;
            self.isSessionActive = true;
            self.session_info = self.session.user.data;
            self.crumbs = self.session.crumbs;
        } else {
            self.isSessionActive = false;
        }
    };
    self.getob = function (str) {
        return str.substr(0, str.indexOf('/'));
    }
    self.isActive = function (viewLocation) {
        //return viewLocation === $location.path();
        //console.log($location.path() , viewLocation , $location.path().startsWith(viewLocation))
        return $location.path().startsWith(viewLocation);
    };

}
