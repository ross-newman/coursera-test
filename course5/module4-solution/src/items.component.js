(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['$stateParams', 'item'];
    function ItemsController($stateParams, item) {
        var item_detail = this;
        item_detail.itemDetails = item;
    }
})();