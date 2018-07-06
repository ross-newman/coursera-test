(function () {
"use strict";

angular.module('public')
.component('signUp', {
  templateUrl: 'src/public/signup/signup.form.html',
  bindings: {
    menuItem: '<'
  },
  controller: signUpController
})
.service('signupInfo', signupInfo);

function signupInfo() {
  var info = this;
  info.user = {};
  info.user.firstname = "";
  info.user.lasttname = "";
  info.user.phone = "";
  info.user.email = "";
  info.user.favdish = "";
  info.user.valid = false;
}

signUpController.$inject = ['ApiPath', 'signupInfo'];
function signUpController(ApiPath, signupInfo) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;
  $ctrl.user = {};
  $ctrl.user.valid = false;
  $ctrl.user.firstname = "";
  $ctrl.user.lasttname = "";
  $ctrl.user.phone = "";
  $ctrl.user.email = "";
  $ctrl.user.favdish = "";
  $ctrl.submit = function () {
    signupInfo.user = $ctrl.user;
    signupInfo.firstname = $ctrl.firstname;
    signupInfo.lasttname = $ctrl.lasttname;
    signupInfo.phone = $ctrl.phone;
    signupInfo.email = $ctrl.email;
    signupInfo.favdish = $ctrl.favdish;
    signupInfo.user.valid = true;
    $ctrl.user.valid = true;
  };
}

})();
