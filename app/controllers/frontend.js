'use strict';

(function(){
    angular.module("memes", [])
    .controller("memC", ["$scope", "$http", function($scope, $http){
        $scope.grid = $('.grid').masonry({
            columnWidth: 210,
            itemSelector: '.grid-item'
          });
          
        $http.get('/my').then(function(mymemes){
            console.log(mymemes);
           $scope.mymemes = mymemes.data;
        });
    }])
    .directive('memeCell', function(){
        return {
            restrict: 'E',
            template: '<div class="nimg"><a class="deleteBtn" ng-href="/delete/{{meme.title}}">&Cross;</a><img ng-src="{{meme.url}}"></div>',
            link: function(scope, elem){
                console.log(scope.meme);
                if(scope.meme.hasOwnProperty("data")){
                var buffer = new ArrayBuffer([scope.meme.data.data.length]);
                var typedarr = new Uint8Array(buffer);
                for(var i = 0; i<scope.meme.data.data.length; i++){
                    typedarr[i] = scope.meme.data.data[i];
                }
                var blob = new Blob([typedarr], {type: scope.meme.MIME, endings: "native"});
                var url = URL.createObjectURL(blob);
                scope.meme.url=url;
                }
                    scope.grid.masonry('reloadItems');
                    setTimeout(function() {scope.grid.masonry('layout');}, 100);
            }
        };
    })
    .directive('addForm', function(){
        return {
            restrict: 'E',
            templateUrl: '/public/add-meme.html'
        };
    })
})();