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

myInfoController.$inject = ['signupInfo', '$http'];
function myInfoController(signupInfo, $http) {
  var $ctrl = this;
  $ctrl.fav = {};
  $ctrl.fav.valid = false;
  $ctrl.getValid = function () { return signupInfo.user.valid; };
  $ctrl.getFirst = function () { return signupInfo.user.firstname; };
  $ctrl.getLast = function () { return signupInfo.user.lastname; };
  $ctrl.getEmail = function () { return signupInfo.user.email; };
  $ctrl.getPhone = function () { return signupInfo.user.phone; };
  $ctrl.getFavItem = function () { return signupInfo.user.favdish; };

  if ($ctrl.getValid())
  {
    $http.get("https://beautiful-wind-cave-15247.herokuapp.com/menu_items/" + signupInfo.user.favdish + ".json").then( function (response) {
      console.log(response);
      $ctrl.fav.name = response.data.name;
      $ctrl.fav.description = response.data.description;
      $ctrl.fav.name = response.data.name;
      $ctrl.fav.category_short_name = response.data.category_short_name;
      $ctrl.fav.valid = true;
    });
  
  }
};

})();
