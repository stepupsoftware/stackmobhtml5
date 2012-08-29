var myapp = {};

  StackMob.init({
    appName: "todo",
    clientSubdomain: "stackmob339",
    apiVersion: 0
  });

(function($){

  myapp.Todo = StackMob.Model.extend({
      schemaName: 'todo',
  });

  myapp.Todos = StackMob.Collection.extend({
      model: myapp.Todo
  });

  myapp.HomeView = Backbone.View.extend({

      initialize: function() {
          this.collection.bind('change', this.render,this);
          this.template = _.template($('#home').html());
          this.template2 = _.template($('#listItemTemplate').html());
      },

      render:function (eventName) {
          var todos = this.collection,
          listContainer = $('<ul data-role="listview" id="todoList"></ul>'),
          template2= this.template2;
          
          // Render the page template
          $(this.el).html(this.template());

          // Find the content area for this page
          var content = $(this.el).find(":jqmData(role='content')");
          content.empty();

          // loop over our collection and use a template to write out
          // each of the items to a jQuery Mobile listview contianer
          todos.each(function(todo){
              listContainer.append(template2(todo.toJSON()));
          });

          // Append our todo list to the content area.
          content.append(listContainer);
        
          return this;
      }
  });


  myapp.AddView = Backbone.View.extend({

        events: {
           "click #addBtn": "add",     
        },

        initialize: function() {
          this.router = this.options.router;
          this.template = _.template($('#add').html());
        },

        render: function() {
           $(this.el).html(this.template());
           return this;
        },
   
        add: function(e) {
            e.preventDefault();
            var item = $('#addForm').serializeObject(),
                collection = this.collection
                router = this.router;
            
            // create a new instance of the todo model and populate it 
            // with your form data.
            var todo = new myapp.Todo(item);
          
            // call the create method to save your data at stackmob
            todo.create({
                success: function(model) {

                    // add new item to your collection
                    collection.add(model);

                    // send a change event to our collection so the 
                    // list of todos is refreshed on our homepage.
                    collection.trigger('change');

                    // return back to the home page 
                    router.navigate('#',{trigger: true, replace: false})
                }
            });

            return this;
        }
    });

  myapp.UpdateView = Backbone.View.extend({
        events: {
           "click #updateBtn": "update",  
           "click #deleteBtn": "delete"   
        },

        initialize: function() {
          this.router = this.options.router;
          this.model = this.options.model;
          this.collection = this.collection;
          this.template = _.template($('#update').html());
        },

        render: function() {
           $(this.el).html(this.template(this.model.toJSON()));
           return this;
        },
   
        update: function(e) {
            e.preventDefault();
            
            var item = $('#updateForm').serializeObject(),
                collection = this.collection
                router = this.router;
         
            this.model.save(item,{
                success: function(model) {
                    
                    // send a change event to our collection so the 
                    // list of todos is refreshed on our homepage.
                    collection.trigger('change');

                    // return back to the home page 
                    router.navigate('#',{trigger: true, replace: false})
                }
            });
        },
        
        delete: function(e) {
            e.preventDefault();
            
            var item = $('#updateForm').serializeObject(),
                collection = this.collection
                router = this.router;
         
            this.model.destroy({
                success: function() {
                    // send a change event to our collection so the 
                    // list of todos is refreshed on our homepage.
                    collection.trigger('change');

                    // return back to the home page 
                    router.navigate('#',{trigger: true, replace: false})
                }
            });
        }


    });



  myapp.AppRouter = Backbone.Router.extend({

      routes:{
          "":"home",
          "add":"add",
          "update/:id":"update"
      },

      initialize:function () {
          // Handle back button throughout the application
          $('.back').live('click', function(event) {
              window.history.back();

              return false;
          });
          this.firstPage = true;
      },

      home:function () {
          this.changePage(new myapp.HomeView({collection:myapp.todos}),true);
      },

      add:function () {
          this.changePage(new myapp.AddView({collection:myapp.todos, router:this}),false);
      },

      update:function (e) {
          model = myapp.todos.get(e);
          this.changePage(new myapp.UpdateView({collection:myapp.todos, router:this, model: model}), false);
      },
      changePage:function (page,reverse) {
          $(page.el).attr('data-role', 'page');
          page.render();
          $('body').append($(page.el));


          var transition = $.mobile.defaultPageTransition;
          // We don't want to slide the first page
          if (this.firstPage) {
              transition = 'none';
              this.firstPage = false;
          }
          
          $.mobile.changePage($(page.el), {changeHash:false, transition: transition, reverse: reverse});
      }

  });

  myapp.initData = function(){
        myapp.todos = new myapp.Todos();
        myapp.todos.fetch({async: false});
  };

}(jQuery));



$(document).ready(function () {
    myapp.initData();
    app = new myapp.AppRouter();
    Backbone.history.start();
});

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
