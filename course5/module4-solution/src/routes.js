(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

            // Home page
            .state('home', {
                url: '/',
                templateUrl: 'src/home.html'
            })

            // Premade list page
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/catagories.html',
                controller: 'CatagoriesController as categories',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })

            .state('item_detail', {
                url: '/item_detail/{itemId}',
                templateUrl: 'src/items.html',
                controller: "ItemsController as item_detail",
                resolve: {
                    item: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.itemId);
                    }]
                }
            });
    }

})();