// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var app = angular.module("TodoApp", [])

var API_ROOT = "http://recruiting-api.nextcapital.com/"

app.run(function($rootScope) {
  $rootScope.user = {loggedIn: false}
})

function ErrorController($scope, $rootScope) {
  this.message = $rootScope.error;
}

function SessionController($scope, $rootScope) {
  var self = this;

  this.action = 'Log In'
  this.user = $rootScope.user
  this.error = ""
  $scope.form = {email: "test", password: ""}

  this.login = function() {
    $.ajax({
      url: API_ROOT + "users/sign_in",
      type: "POST",
      data: $scope.form,
      success: function(body) {
        console.log(body)
      },
      error: function(body) {
        var errorMessage = JSON.parse(body.responseText)['error'];
        self.error = errorMessage;
        $scope.$apply()
      }
    })
  }

  this.logout = function() {
    $rootScope.user.loggedIn = false;
  }
}

function TodoController($scope, $rootScope) {
  var self = this;
  this.user = $rootScope.user
  this.todos = []

  $scope.$watch("user.loggedIn", function() {
    if(self.user.loggedIn) {

    }
  })
}
