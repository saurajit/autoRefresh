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