'use strict';

/**
 * Created by Saurajit on 7/10/13.
 */
angular.module('app', ['autoRefresh'])
  .controller('MainCtrl', function ($scope) {
    $scope.val = $scope.val2 = 0;
    $scope.stopFlag = $scope.stopFlag2 = true;
    $scope.update = function (val) {
      if ($scope.val >= 20) {
        $scope.stopFlag = false;
      }
      $scope.val += val;
    };
    $scope.update2 = function (val) {
      if ($scope.val2 === 20) {
        $scope.stopFlag2 = false;
      }
      $scope.val2 += val;
    };
  });


angular.module('autoRefresh', [])
  .directive('autoRefresh', ['$timeout', function ($timeout) {
    //$timeout service injected
    return {
      restrict: 'A', //Only act as an HTML attribute
      link: function (scope, element, attrs) {
        /*
         scope: scope of the controller where the directive has been added
         element: element where the directive has been added
         attrs: HTML attributes where the directive has been added
         */
        if (isNaN(parseInt(scope.$eval(attrs.refreshInterval)))) {
          attrs.refreshInterval = 1000; //Defaults to 1 second
        }

        if (angular.isUndefined(attrs.refreshStop)) {
          attrs.refreshStop = true; //Flag to set to stop auto refreshing. Defaults to true.
        }
        var repeatFunc = function () {
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
            repeatFunc();
          }, scope.$eval(attrs.refreshInterval));
        };
        repeatFunc();
      }
    };
  }]);