'use strict';

/* Services */

coffrefortApp.factory('logService', function($http) {

    var getData = function(logUrl) {
    	console.log("get "+logUrl);
        return $http({method:"GET", url:logUrl}).success(function(data, status, headers, config) {
            return data.data;
        }).error(function(data, status, headers, config) {

		});

    };
    return { getData: getData };
});