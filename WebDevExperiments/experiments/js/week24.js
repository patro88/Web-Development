var app = angular.module("form", [])

app.controller("RecordController", function ($scope) {
    var movie1 = {
        title: "Star Wars: Empire at War",
        year: "2006",
        plot: "The game is set before the Battle of Yavin, while the Empire is still constructing the Death Star. The campaign goes through the events before this, on both the Rebel and Imperial side.",
        genre: "Sci-Fi",
    };
    var movie2 = {
        title: "Terminator Genisys",
        year: "2015",
        plot: "After finding himself in a new time-line, Kyle Reese teams up with John Connor's mother Sarah and an aging terminator to try and stop the one thing that the future fears, 'Judgement Day'  ",
        genre: "Action",
    };

    var movie3 = {
        title: "Inception",
        year: "2010",
        plot: "A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        genre: "Sci-Fi",
    };
    var movie4 = {
        title: "The Imitation Game",
        year: "2014",
        plot: "During World War II, mathematician Alan Turing tries to crack the enigma code with help from fellow mathematicians.",
        genre: "Biography",
    };

    var movies = [movie1, movie2, movie3, movie4];
    $scope.movies = movies;

    $scope.edit = function (movie) {
        console.log(movie);
        $scope.newMovie = movie;
    }

    $scope.delete = function (movie) {
        var index = $scope.movies.indexOf(movie);
        $scope.movies.splice(index, 1);
    }
    $scope.add = function () {
        console.log($scope.newMovie);
        var movie = {
            title: $scope.newMovie.title,
            year: $scope.newMovie.year,
            plot: $scope.newMovie.plot,
            genre: $scope.newMovie.genre,
        };
        $scope.movies.push(movie);
    }

    $scope.updateForm = function (movie) {
        alert($scope.newMovie.title);
    }
});