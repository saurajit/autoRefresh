autoRefresh
==============

AngularJS Auto Refresh directive

Include the autoRefresh.js file after including the AngularJS file.

Add the module as dependency to your module
```javascript
angular.module('app', ['autoRefresh'])
  .controller('MainCtrl', function ($scope) {
    ....
});
```

Use it by adding it as HTML attributes

```html
<div class="well" auto-refresh="update(1)" refresh-interval="interval" refresh-stop="stopFlag"
         refresh-in-background="true">{{val}}
</div>
```

The controller

```javascript
$scope.val = $scope.val2 = 0;
    $scope.stopFlag = $scope.stopFlag2 = true;
    $scope.update = function (val) {
      if ($scope.val >= 20) {
        $scope.stopFlag = false;
      }
      $scope.val += val;
    };
```

This module is in eary development stage and needs refining. It is not safe for production use without proper evaluation.
