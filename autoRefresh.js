/**
 * Created by Saurajit on 7/10/13.
 */
'use strict';

angular.module('autoRefresh', [])
  .directive('autoRefresh', ['$timeout', function ($timeout) {//$timeout service injected
    return {
      restrict: 'A', //Only act as an HTML attribute
      link: function (scope, element, attrs) {
        /*
         scope: scope of the controller where the directive has been added
         element: element where the directive has been added
         attrs: HTML attributes where the directive has been added
         */
        if (isNaN(parseInt(scope.$eval(attrs.refreshInterval)), 10)) {
          attrs.refreshInterval = 1000; //Defaults to 1 second
        }

        if (angular.isUndefined(attrs.refreshStop)) {
          attrs.refreshStop = true; //Flag to set to stop auto refreshing. Defaults to true.
        }
        var repeatFunction = function () {
          //'refreshInBackground' flag to check if to auto refresh even on route change.
          if (angular.isUndefined(attrs.refreshInBackground) || !scope.$eval(attrs.refreshInBackground)) {
            scope.$on('$routeChangeStart', function () {
              attrs.refreshStop = false;
            });
          }
          var promise = $timeout(function () {
            if (!scope.$eval(attrs.refreshStop)) {
              $timeout.cancel(promise);
              return;
            }
            scope.$eval(attrs.autoRefresh);
            repeatFunction();
          }, scope.$eval(attrs.refreshInterval));
        };
        repeatFunction();
      }
    };
  }]);