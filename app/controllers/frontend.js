'use strict';

(function(){
    angular.module("memes", [])
    .controller("memC", ["$scope", "$http", function($scope, $http){
        $http.get('/my').then(function(mymemes){
            console.log(mymemes);
           $scope.mymemes = mymemes.data; 
        });
    }])
})();