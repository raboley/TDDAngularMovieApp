angular.module('omdb',[])
    .factory('omdbApi', function($http, $q) {
        var service = {};
        var baseUrl = 'http://www.omdbapi.com/?v=1&';

        function httpPromsie (url) {
            var deferred = $q.defer();
            $http.get(url)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject();
                });
            return deferred.promise;
        }

        service.search = function(query) {
            return httpPromsie(baseUrl + 's=' + encodeURIComponent(query))
        }

        service.find = function(id) {
            return httpPromsie(baseUrl + 'i=' + id)
        }

        return service;
    });