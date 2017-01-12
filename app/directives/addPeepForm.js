angular.module('myPeepsApp')
    .directive('myPeepsAppAddPeepForm', function () {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'partials/addPeepForm.html'
        };

    });
