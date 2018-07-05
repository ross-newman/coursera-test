(function () {
"use strict";

angular.module('public')
.component('myInfo', {
  templateUrl: 'src/public/myinfo/myinfo.data.html',
  bindings: {
    menuItem: '<'
  },
  controller: myInfoController
});

myInfoController.$inject = ['signupInfo'];
function myInfoController(signupInfo) {
  var $ctrl = this;
  $ctrl.getValid = function () { return signupInfo.user.valid; };
  $ctrl.getFirst = function () { return signupInfo.user.firstname; };
  $ctrl.getLast = function () { return signupInfo.user.lastname; };
  $ctrl.getEmail = function () { return signupInfo.user.email; };
  $ctrl.getPhone = function () { return signupInfo.user.phone; };
  $ctrl.getFavItem = function () { return signupInfo.user.favdish; };
  $ctrl.test = "arse";
};

})();
