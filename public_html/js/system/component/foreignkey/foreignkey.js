moduloDirectivas.component('foreignKey', {
    templateUrl: "js/system/component/foreignkey/foreignkey.html",
    controllerAs: 'fk',
    controller: foreignkeyController1,
    bindings: {
        "bean": "=",
        "form": "=",
        "name": "<",
        "reference": "<",
        "profile": "<",
        "required": "<"
    }
});
// $postLink $onInit  $onChanges  $onDestroy
function foreignkeyController1(toolService, serverCallService, $uibModal) {
    var self = this;
    //-----
    var validity = function (isValid) {
        if (self.form[self.name]) {
            self.form[self.name].$setValidity('exists', isValid);
        }
    };
    //-----
    self.chooseOne = function () {
        var modalInstance = $uibModal.open({
            //templateUrl: 'js/app/' + self.reference + '/' + self.profile + '/selection.html',
            templateUrl: 'js/system/generic/template/selection.html',
            //controller: toolService.capitalizeWord(self.reference) + "Selection" + self.profile + "Controller",
            controller: 'selectionGenericController', //the controller name should be a biding in the component
            size: 'lg',
            resolve: {
                ob: function () {
                    return self.reference
                }
            }
        }).result.then(function (modalResult) {
            self.bean.id = modalResult;
            self.change_value();
            self.form.$dirty = true;
        });
    };
    //-----
    self.change_value = function () {
        old_id = parseInt(self.bean.id);
        if (old_id) {
            serverCallService.getOne(self.reference, old_id).then(function (response) {
                self.bean = response.data.json.data;
                self.metao = response.data.json.metaObject;
                self.metap = response.data.json.metaProperties;
                if (self.bean) {
                    if (response.data.json.data.id > 0) {
                        validity(true);
                        var arrayLength = self.metap.length;
                        var description = "";
                        for (var i = 0; i < arrayLength; i++) {
                            if (self.metap[i].IsForeignKeyDescriptor) {
                                description += self.bean[self.metap[i].Name] + " ";
                            }
                        }
                        self.desc = description.trim();
                    } else {
                        validity(false);
                        self.desc = "";
                    }
                } else {
                    validity(false);
                    self.desc = "";
                }
            }).catch(function (data) {
                validity(false);
                self.desc = "";
            });
        } else {
            validity(false);
            self.desc = "";
        }
    };
    //-----
    this.$onInit = function () {
        self.change_value();
    }
}


