// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var app = angular.module("TodoApp", [])

var API_ROOT = ""

app.run(function($rootScope) {
  $rootScope.user = {loggedIn: false}
})

function ErrorController($scope, $rootScope) {

}

function SessionController($scope, $rootScope) {
  var self = this;

  this.action = 'Log In'
  this.user = $rootScope.user

  this.login = function() {
    $rootScope.user.loggedIn = true;
  }

  this.logout = function() {
    $rootScope.user.loggedIn = false;
  }
}

function TodoController($scope, $rootScope) {
  var self = this;
  this.user = $rootScope.user
  this.todos = []
}
