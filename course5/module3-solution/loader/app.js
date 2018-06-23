
// IIFE
(function () {
    'use strict';

    const newLocal = 'NarrowItDownApplication';
    angular.module(newLocal, [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', foundItemsDirective)
        .constant('ApiMenuItems', 'https://davids-restaurant.herokuapp.com/menu_items.json');

    // Controller
    NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
    function NarrowItDownController($scope, MenuSearchService) {
        var list = this;
        list.found = null;
        // list.comment = "Nothing yet!";

        list.onClick = function (item) {
            if (item !== undefined && item !== '') {
                MenuSearchService.getMatchedMenuItems(item);
                list.found = MenuSearchService.foundItems;
                console.log(list.found);
                }
                else{
                    list.found = [];
                }

        }

        list.onRemove = function (index) {
            list.found.splice(index, 1);
        }
    };

    // Directive for FoundItems
    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'loader/itemsloaderindicator.template.html',
            restrict: 'E',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'foundDirectiveCtrl',
            bindToController: true,
            transclude: true
        };

        return ddo;
    }

    //  Directive's controlller
    function FoundItemsDirectiveController() {
    }

    // Service
    MenuSearchService.$inject = ['$http', 'ApiMenuItems'];
    function MenuSearchService($http, ApiMenuItems) {
        var service = this;
		service.foundItems = [];
        service.getMatchedMenuItems = function (searchItem) {
            console.log(searchItem);
            return $http
                .get(ApiMenuItems)
                .then(function (result) {
                    // process result and only keep items that match
                    console.log(result);
                    //var foundItems...
                    var foundItems = [];

                    // return processed items
                    angular.forEach(result.data.menu_items, function (val, idx) {
                        if (val.description.toLowerCase().indexOf(searchItem.toLowerCase()) > -1) {
                            // console.log("Match " + val);
                            foundItems.push(val);
                        } else{
                            // console.log("No Match " + val);
                        }
                    });
                    angular.copy(foundItems, service.foundItems);
                    // return foundItems;
                    return foundItems;
                });
        };
    };

})();