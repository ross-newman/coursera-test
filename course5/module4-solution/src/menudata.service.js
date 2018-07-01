(function () {
  'use strict';

  angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('category', "https://davids-restaurant.herokuapp.com/categories.json")
    .constant('menu_items', "https://davids-restaurant.herokuapp.com/menu_items.json?category=");

  MenuDataService.$inject = ['$http', 'category', 'menu_items'];
  function MenuDataService($http, category, menu_items) {
    var service = this;

    service.getAllCategories = function () {
      console.log("getAllCategories: " + category);
      return $http
        .get(category)
        .then(function (response) {
          // console.log("response: " + JSON.stringify(response.data,null,2));
          return response.data;
        })
    }

    service.getItemsForCategory = function (categoryShortName) {
      console.log("getItemsForCategory: " + categoryShortName);
      console.log("getItemsForCategory: " + menu_items + categoryShortName);
      return $http
        .get(menu_items + categoryShortName)
        .then(function (response) {
          console.log("getItemsForCategory : " + JSON.stringify(response.data.menu_items,null,2));
          return response.data.menu_items;
        });
    }
  }

  console.log("MenuDataService loaded...")

})();
