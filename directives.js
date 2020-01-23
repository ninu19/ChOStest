'use strict';

angular.module('app').directive("dragWidth", function () {
    return {
        // restrict: "A",
        link: function (scope, element) {
            scope.getWidth = function () {
                return $(element).width();
            };
            scope.$watch(scope.getWidth, function (width) {
                $(element).width(width);
            });
        }
    }
})
