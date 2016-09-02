<!doctype html>
<html lang="en" ng-app="coffrefortApp">
<head>
  <link rel="shortcut icon" href="coffre.ico" type="image/x-icon"/> 
  <link rel="icon" href="coffre.ico" type="image/x-icon"/>
  <link rel="stylesheet" type="text/css" href="web/css/style.css" media="screen">
  <link rel="stylesheet" type="text/css" href="web/css/jquery.fancybox-1.3.4.css" media="screen">
  <meta charset="utf-8">
  <title>Coffre fort</title>
  <link rel="stylesheet" href="web/css/app.css">
  <link rel="stylesheet" href="web/css/bootstrap.css">
  <script>
	//var angularData = <!--{$angularData}-->;
  </script>
  <script src="lib/angular/angular.min.js"></script>
  <script src="web/js/controllers.js"></script>
  <script src="web/js/services.js"></script>
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
</head>
<body ng-controller="FacturesListCtrl">

  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2">
        <!--Sidebar content-->
		
        Search: <input ng-model="query"><br/>
        Sort by:
        <select ng-model="orderProp">
          <option value="url" ng-selected="reverse=true">Alphabetical</option>
          <option value="timestamp" ng-selected="reverse=true">Newest</option>
        </select>
      </div>
      <div class="col-md-6">
        <!--Body content-->
		<div ng-repeat="directory in directories | filter:query">
		<div id='{{directory.directoryName}}' > <a href='#' ng-click="refreshData($event)">{{directory.directoryName}}</a> 
					<img  ng-show="isPending('{{directory.directoryName}}')" src="http://carte.allonspecher.com/images/loading.gif" id="loading_{{directory.directoryName}}" width="20px">
		</div>
        <ul class="files">
		  <li ng-repeat="file in directory.files | filter:query | orderBy:orderProp:reverse">
           <a href='{{file.url}}' target='_blank'>{{file.name}}</a>
          </li>
        </ul>
		</div>
      </div>
      <div class="col-md-4">
      	<textarea id='logs'>
        </textarea>
      </div>
    </div>
  </div>
</body>
</html>