(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('CatagoriesController', CatagoriesController);

    CatagoriesController.$inject = ['items'];
    function CatagoriesController(items) {
        var catagories = this;
        catagories.items = items;
        console.log(catagories);
    }
    console.log("App running...")
})();