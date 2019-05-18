describe('omdb service', function() {
    var movieData = {"Search":[{"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","Rated":"PG","Released":"25 May 1977","Runtime":"121 min","Genre":"Action, Adventure, Fantasy","Director":"George Lucas","Writer":"George Lucas","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing","Plot":"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.","Language":"English","Country":"USA","Awards":"Won 6 Oscars. Another 50 wins & 28 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.6/10"},{"Source":"Rotten Tomatoes","Value":"93%"},{"Source":"Metacritic","Value":"90/100"}],"Metascore":"90","imdbRating":"8.6","imdbVotes":"1,063,160","imdbID":"tt0076759","Type":"movie","DVD":"21 Sep 2004","BoxOffice":"N/A","Production":"20th Century Fox","Website":"http://www.starwars.com/episode-iv/","Response":"True"}]};
    var movieDataById = {"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","Rated":"PG","Released":"25 May 1977","Runtime":"121 min","Genre":"Action, Adventure, Fantasy","Director":"George Lucas","Writer":"George Lucas","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing","Plot":"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.","Language":"English","Country":"USA","Awards":"Won 6 Oscars. Another 50 wins & 28 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.6/10"},{"Source":"Rotten Tomatoes","Value":"93%"},{"Source":"Metacritic","Value":"90/100"}],"Metascore":"90","imdbRating":"8.6","imdbVotes":"1,063,160","imdbID":"tt0076759","Type":"movie","DVD":"21 Sep 2004","BoxOffice":"N/A","Production":"20th Century Fox","Website":"http://www.starwars.com/episode-iv/","Response":"True"}
    var omdbApi = {};
    var $httpBackend;

    beforeEach(angular.mock.module('omdb'));

    beforeEach(angular.mock.inject(function(_omdbApi_, _$httpBackend_) {
        omdbApi = _omdbApi_;
        $httpBackend = _$httpBackend_;
    }));

    it('should return search movie data', function() {
        var response;

        var expectedUrl = 'http://www.omdbapi.com/?v=1&s=star%20wars'
        //var expectedUrl = function(url) {
        //    return url.indexOf('http://www.omdbapi.com') !== -1;
        //}

        //var expectedUrl = /http:\/\/www.omdbapi.com\/\?v=1&s=star%20wars/;

        $httpBackend.when('GET', expectedUrl)
            .respond(200, movieData);

        omdbApi.search('star wars')
            .then(function(data) {
                response = data;
            })

        $httpBackend.flush();

        expect(response).toEqual(movieData);
    });

    it('should handle error', function() {
        var response;

        $httpBackend.expect('GET', 'http://www.omdbapi.com/?v=1&i=tt0076759')
            .respond(500);

        omdbApi.find('tt0076759')
            .then(function(data) {
                response = data;
            })
            .catch(function() {
                response = 'Error!';
            });

        $httpBackend.flush();
        expect(response).toEqual('Error!');
    })
    
    it('should return movie data by id', function() {
        var response;

        $httpBackend.expect('GET', 'http://www.omdbapi.com/?v=1&i=tt0076759')
            .respond(200, movieDataById);

        omdbApi.find('tt0076759')
            .then(function(data) {
                response = data;
            })

        $httpBackend.flush();
        expect(response).toEqual(movieDataById);
    });
});