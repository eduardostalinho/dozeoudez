angular.module("dozeoudez.controllers")

.controller("GameCtrl", function($scope, Game, $timeout) {
  var game;

  // TODO move this code to game
  var isWinner = function (team) {
    return team.points >= $scope.game.MAX_POINTS;
  };

  var finishByWinner = function () {
    console.log("#finishByWinner");
    if (isWinner($scope.game.awayTeam) || isWinner($scope.game.homeTeam)) {
      $scope.game.finish();
    }
  };
  $scope.playPause = function () {
    if ($scope.game.status == "running") {
      $scope.game.pause();
    } else {
      $scope.game.start();
    }
  };

  $scope.reset = function () {
    $scope.game = new Game();
  };

  $scope.reset();

  // TODO spec
  Game.current().then(function (game) {
    if (!game) { return; }
    game.resume();
    $scope.game = game;
  });

  $scope.score = function (team, points) {
    $scope.game.score(team, points);
  };
});
