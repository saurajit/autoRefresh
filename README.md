ng-autoRefresh
==============

AngularJS Auto Refresh directive

Include the ng-autoRefresh.js file after including the AngularJS file.

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