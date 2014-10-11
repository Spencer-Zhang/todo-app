

describe("TodoController", function() {
  var scope, controller

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new()
    controller = $controller('TodoController', {
      '$scope':scope
    });

    controller.user = {id: 12, api_token: "abc"}

    $httpBackend.whenGET(API_ROOT + 'users/12/todos?api_token=abc&user_id=12').respond(function() {
      return([200, [{
        id: 15,
        description: "Test1",
        is_complete: false
      },{
        id: 16,
        description: "Test2",
        is_complete: true
      }]])
    })

    $httpBackend.whenPOST(API_ROOT + "users/12/todos").respond(function() {
      return([200, {id:17, description: null, is_complete: false}])
    })
  }));

  describe("#loadTodos", function() {
    it("should load a user's todos", function() {
      controller.loadTodos();

      $httpBackend.flush();

      expect(controller.todos[0].description).toEqual("Test1")
      expect(controller.todos[0].is_complete).toEqual(false)
      expect(controller.todos[1].description).toEqual("Test2")
      expect(controller.todos[1].is_complete).toEqual(true)
    })
  })

  describe("#createTodo", function() {
    it("should create a new Todo", function() {
      controller.loadTodos();
      $httpBackend.flush();

      controller.createTodo();


      $httpBackend.flush();
      expect(controller.todos.length).toEqual(3);
    })
  })

  describe("#save", function() {
    it("should save all the Todos", function() {
      var savedTodos = []
      controller.loadTodos();
      $httpBackend.flush();

      controller.createTodo();
      $httpBackend.flush();

      controller.save();
      $httpBackend.whenPUT(API_ROOT + "users/12/todos/15").respond(function(method, url, data) {
        savedTodos.push(data)
        return [200]
      })
      $httpBackend.whenPUT(API_ROOT + "users/12/todos/16").respond(function(method, url, data) {
        savedTodos.push(data)
        return [200]
      })
      $httpBackend.whenPUT(API_ROOT + "users/12/todos/17").respond(function(method, url, data) {
        savedTodos.push(data)
        return [200]
      })
      $httpBackend.flush();

      expect(savedTodos.length).toEqual(3);
    })
  })
})