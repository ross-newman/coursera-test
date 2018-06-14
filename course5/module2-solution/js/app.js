// IIFE
(function () {

    'use strict';

    angular.module('ShoppingListApp', [])
        .controller('listControllerWant', listControllerWant)
        .controller('listControllerBought', listControllerBought)
        .provider('ShoppingListService', ShoppingListServiceProvider)
        .config(Config);

    Config.$inject = ['ShoppingListServiceProvider'];
    function Config(ShoppingListServiceProvider) {
        ShoppingListServiceProvider.defaults.maxItems = 10;
    }

    listControllerWant.$inject = ['$scope', 'ShoppingListService'];
    function listControllerWant($scope, ShoppingListService) {
        var list = this;

        $scope.myList = [{ item: "Crisps", qnty: "10 Packets" },
        { item: "Snapple", qnty: "1 Bottle" },
        { item: "Pengin Bars", qnty: "4 Packets" },
        { item: "Tim Tams", qnty: "2 Packets" },
        { item: "Milo", qnty: "1 Tin" }];

        list.items = ShoppingListService.getItems();
        
        // Populate the list
        for (var i=0 ; i<$scope.myList.length; i++) {
            ShoppingListService.addItem($scope.myList[i].item, $scope.myList[i].qnty);
        }

        // Bought
        list.boughtItem = function (itemIndex) {
            console.log("hello");
            ShoppingListService.boughtItem(itemIndex);
        };
    };

    listControllerBought.$inject = ['$scope','ShoppingListService'];
    function listControllerBought($scope, ShoppingListService) {
        var bought = this;
        bought.items = ShoppingListService.getItemsBought();
        console.log(bought.items);
    };

    // If not specified, maxItems assumed unlimited
    function ShoppingListService(maxItems) {
        var service = this;

        // List of shopping items
        var items = [];
        var bought = [];

        service.addItem = function (itemName, quantity) {
            if ((maxItems === undefined) ||
                (maxItems !== undefined) && (items.length < maxItems)) {
                var item = {
                    name: itemName,
                    quantity: quantity
                };
                items.push(item);
            }
            else {
                throw new Error("Max items (" + maxItems + ") reached.");
            }
        };

        service.boughtItem = function (itemIndex) {
            console.log(bought);
            // Add to bought
            bought.push(items[itemIndex]);
            // Remove from items
            items.splice(itemIndex, 1);
        };

        service.getItems = function () {
            return items;
        };

        service.getItemsBought = function () {
            return bought;
        };
    }

    function ShoppingListServiceProvider() {
        var provider = this;

        provider.defaults = {
            maxItems: 10
        };

        provider.$get = function () {
            var shoppingList = new ShoppingListService(provider.defaults.maxItems);

            return shoppingList;
        };
    }

})();