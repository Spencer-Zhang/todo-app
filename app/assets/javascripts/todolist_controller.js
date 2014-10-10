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
    $http.post(user_path + "/todos", user_key)
    .success(function(data) { self.todos.push(data); })
    .error(function(data) { self.error = data; })
  }

  this.save = function() {
    $.each(self.todos, function(index, todo) {
      data = {
        user_id: user_key.user_id,
        api_token: user_key.api_token,
        todo:todo
      }
      $http.put(user_path + "/todos/" + todo.id, data)
      .success(function() { self.error = "Your list has been saved!" })
      .error(function(data) { self.error = data })
    })
  }

  this.delete = function(index) {
    console.log(index)
    todo = self.todos[index]
    console.log(todo)
    $http.delete(user_path + "/todos/" + todo.id, {params: user_key})
    self.todos.splice(index, 1)
  }
}
