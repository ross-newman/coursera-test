// IIFE
(function () {

    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController ', NarrowItDownController)
        .provider('MenuSearchService', MenuSearchServiceProvider)
        .directive('foundItems', foundItemsDirective);

    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'itemsloaderindicator.template.html',
            scope: {
                found: '<',
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true,
            link: ShoppingListDirectiveLink,
            transclude: true
        };

        return ddo;
    }

    function MenuSearchServiceProvider() {
        var provider = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http('https://davids-restaurant.herokuapp.com/menu_items.json')
                .then(function (result) {
                    // process result and only keep items that match
                    console.log(result);
                    //var foundItems...

                    // return processed items
                    return foundItems;
                });
        };
    };


    NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
    function NarrowItDownController($scope) {
        var list = this;
        $scope.commect = "Nothing yet!";

        list.onClick = MenuSearchService.getMatchedMenuItems();

    };

})();