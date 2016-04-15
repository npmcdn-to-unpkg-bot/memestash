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
            template: '<div class="nimg"><a class="deleteBtn" ng-href="/delete/{{meme.title}}">&Cross;</a><img class="items" ng-src="{{meme.url}}"></div>',
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
            
                elem.find('.items').click(function(){
                    console.log(this);
                   var html = "<div id='mo' class='modal fade' role='dialog'><div class='modal-dialog'><div class='modal-content'><img src='" + this.src + "'></div></div></div>"; 
                $('body').append(html);
                $('#mo').on('hidden.bs.modal', function(){
                    console.log("hidden");
                    this.remove();
                });
                $('#mo').modal();

                });
                
            }
        };
    })
    .directive('addForm', function(){
        return {
            restrict: 'E',
            templateUrl: '/public/add-meme.html'
        };
    })
    .directive('addNav', function(){
        return {
            restrict: 'E',
            templateUrl: '/public/navbar.html'
        }
    })
})();