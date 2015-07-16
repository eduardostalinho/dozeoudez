/*jshint expr:true */
var Controller = "GameCtrl";

describe(Controller, function () {

    var $scope, ctrl, Game, $timeout;

    beforeEach(function () {

        module("dozeoudez");

        inject(function ($rootScope, $controller, _Game_, _$timeout_, $httpBackend) {
          Game = _Game_;
          $scope = $rootScope.$new();
          $timeout = sinon.spy(_$timeout_);
          $httpBackend.when("GET", "templates/game.html").respond(null);
          $httpBackend.when("GET", "contact-modal.html").respond(null);
          ctrl = $controller(Controller, {
            $scope: $scope,
            $timeout: $timeout
          });
        });

    });

    it("has a $scope variable", function() {
      expect($scope).to.exist;
    });

    it("assigns a game", function() {
      expect($scope.game).to.be.an.instanceOf(Game);
    });

    describe("#playPause()", function () {

      it("starts the game if it's paused", function () {
        $scope.game.status = "paused";
        $scope.game.start = sinon.spy();
        $scope.playPause();
        expect($scope.game.start).to.have.been.called;
      });

      it("pauses the game if it's runnig", function () {
        $scope.game.status = "running";
        $scope.game.pause = sinon.spy();
        $scope.playPause();
        expect($scope.game.pause).to.have.been.called;
      });
    });

    describe("#reset()", function () {
      it("assigns a new game", function () {
        $scope.game.status = "finished";
        var oldGame = $scope.game;
        $scope.reset();
        expect($scope.game.status).to.equal("paused");
        expect($scope.game).to.not.equal(oldGame);
      });
    });

    describe("#score()", function () {
      beforeEach(function () {
        $scope.game.status = "running";
      });

      it("adds points to a team", function () {
        var team = { points: 3 };
        $scope.score(team, 2);
        expect(team.points).to.equal(5);
      });

      context("when match is paused", function () {
        beforeEach(function () {
          $scope.game.status = "paused";
        });

        it("does not change number of points made by a team", function () {
          var team = { points: 3 };
          $scope.score(team, 3);
          expect(team.points).to.equal(3);
        });
      });

      context("when match is finished", function () {
        beforeEach(function () {
          $scope.game.status = "finished";
        });

        it("does not change number of points made by a team", function () {
          var team = { points: 10 };
          $scope.score(team, 3);
          expect(team.points).to.equal(10);
        });
      });
    });

});
