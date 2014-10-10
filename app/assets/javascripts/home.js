// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var app = angular.module("TodoApp", [])

var API_ROOT = "http://recruiting-api.nextcapital.com/"

app.run(function($rootScope) {
  $rootScope.user = {}
})

function SessionController($scope, $rootScope, $http) {
  var self = this;

  this.action = 'Log In'

  this.error = ""
  $scope.form = {email: "testuser", password: "test"}

  this.loggedIn = false;

  this.login = function() {
    var path;
    if($scope.form.email != "" && $scope.form.password != "") {
      if(self.action == "Log In") { path = "users/sign_in" }
      if(self.action == "Sign Up") { path = "users" }

      var responsePromise = $http.post(API_ROOT + path, $scope.form)
      responsePromise.success(function(data) {
        $rootScope.user = data;
        self.loggedIn = true;
      })
      responsePromise.error(function(data) {
        self.error = data;
      })
    } else {
      self.error = "Fields cannot be blank";
    }
  }

  this.logout = function() {
    self.loggedIn = false;
    $rootScope.user = {};
    $http.delete(API_ROOT + "users/sign_out", $rootScope.user)
  }
}

function TodoController($scope, $rootScope, $http) {
  var self = this;
  var user_path = ""
  var user_key = {}
  this.error = ""

  $rootScope.$watch("user", function() {
    self.user = $rootScope.user

    console.log(self.user)

    if(self.user.id != undefined) {
      user_path = API_ROOT + "users/" + self.user.id
      user_key = {
        user_id: self.user.id.toString(),
        api_token: self.user.api_token
      }

      responsePromise = $http.get(user_path + "/todos", {params: user_key})
      responsePromise.success(function(data) {
        console.log(data)
        self.todos = data
      })
      responsePromise.error(function(data) {console.log(data)})
    }
  })

  this.createTodo = function() {
    var responsePromise = $http.post(user_path + "/todos", user_key)

    responsePromise.success(function(data) {
      self.todos.push(data);
    })

    responsePromise.error(function(data) {
      self.error = data;
    })
  }

  this.save = function() {
    $.each(self.todos, function(index, user_key) {
      console.log(todo)
    })
  }
}
