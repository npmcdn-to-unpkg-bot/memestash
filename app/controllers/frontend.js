'use strict';

(function(){
    angular.module("memes", [])
    .controller("memC", ["$scope", "$http", function($scope, $http){
        $http.get('/my').then(function(mymemes){
            console.log(mymemes);
           $scope.mymemes = mymemes.data;
        });
    }])
    .directive('memeCell', function(){
        return {
            restrict: 'E',
            template: '<img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150">',
            link: function(scope, elem){
                console.log(scope.meme);
                var buffer = new ArrayBuffer([scope.meme.data.data.length]);
                var typedarr = new Uint8Array(buffer);
                for(var i = 0; i<scope.meme.data.data.length; i++){
                    typedarr[i] = scope.meme.data.data[i];
                }
                var blob = new Blob([typedarr], {type: scope.meme.MIME});
                var url = URL.createObjectURL(blob)
                console.log(blob);
                elem.children().attr("src", url);
            }
        }
    })
})();