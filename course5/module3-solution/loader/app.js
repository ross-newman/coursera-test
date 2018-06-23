
// IIFE
(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('MsgController', MsgController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', foundItemsDirective);

    MsgController.$inject = ['$scope', 'MenuSearchService'];
    function MsgController($scope) {
        var list = this;
        $scope.commect = "Nothing yet!";

        // $scope.onClick = $scope.getMatchedMenuItems();
        console.log($scope);
    };


    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'loader/itemsloaderindicator.template.html',
            scope: {
                found: '<',
            },
            controller: MsgController,
            controllerAs: 'list',
            bindToController: true,
            // link: ShoppingListDirectiveLink,
            transclude: true
        };

        return ddo;
    }

    function MenuSearchService() {
        var service = this;

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

})();