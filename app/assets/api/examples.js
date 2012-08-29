  var Book = StackMob.Model.extend({
    schemaName: 'book'
  });

  var Books = StackMob.Collection.extend({
    model: Book
  });

  var SMQItem = StackMob.Model.extend({
    schemaName: 'smqitem'
  });

  var SMQItems = StackMob.Collection.extend({
    model: SMQItem
  });

  var Attraction = StackMob.Model.extend({
    schemaName: 'attraction'
  });

  var Attractions = StackMob.Collection.extend({
    model: Attraction
  });
  

  var StackMobExamples = {};

  /*
   * For testing purposes
   */
  StackMobExamples['debugCallback'] = function(txt, s, f) {
    return {
      success: function(result) {
        txt = txt || '';
        console.debug('------- ' + txt + ' success start-----');
        if (result) {
          var jf = new JSONFormatter((result.toJSON ? result.toJSON() : result), 'pre');
          $('#results').text(result.toJSON || _.isObject(result)? jf.formatJSON() : result);
        } else $('#results').text('No response body. Check your Firebug/Developer Tools Javascript Console.');

        if (s) s(result);
        return result;
      },
      error: function(model, response) {
        txt = txt || '';
        console.debug('------- ' + txt + ' error start-----');
        if (response) {
          var jf = new JSONFormatter(response, 'pre');
          $('#results').text(jf.formatJSON());
        } else $('#results').text('No response body. Check your Firebug/Developer Tools Javascript Console.');

        if (f) f(response);
        return response;
      }
    };
  };
  


  StackMobExamples['createUser'] = function(username) {
    var user = new StackMob.User({ username: 'Bruce Wayne', password: 'imbatman', age: 50 });
    user.create(StackMobExamples.debugCallback('Creating User: Bruce Wayne'));
  };

  StackMobExamples['fetchUser'] = function(username) {
    var user = new StackMob.User( { username: 'Bruce Wayne' } );
    user.fetch(StackMobExamples.debugCallback('Reading User: Bruce Wayne'));
  };

  StackMobExamples['updateUser'] = function(username) {
    var user = new StackMob.User({ username: 'Bruce Wayne', age: 51 });
    user.save(null, StackMobExamples.debugCallback('Updating User: Bruce Wayne to age 51'));
  };

  StackMobExamples['deleteUser'] = function(username) {
    var user = new StackMob.User({ username: 'Bruce Wayne'});
    user.destroy(StackMobExamples.debugCallback('Delete User: Bruce Wayne'));
  };

  StackMobExamples['login'] = function() {
    var user = new StackMob.User({ username: 'Bruce Wayne', password: 'imbatman' });
    user.login(false, StackMobExamples.debugCallback('Logging in.'), function(model) {
      console.debug(model.toJSON());
    }, function(model, response) {
      console.debug(response);
    });
  };

  StackMobExamples['logout'] = function() {
    var user = new StackMob.User({ username: 'Bruce Wayne' });
    user.logout(StackMobExamples.debugCallback('Logging out.'));
  };

  StackMobExamples['createBooks'] = function() {
    var booktitles = ['Lord of the Rings', 'Encyclopedia Brown', 'The Hatchet', 'All Quiet on the Western Front',
      'Harry Potter 1', 'Harry Potter 2', 'Harry Potter 3', 'Harry Potter 4', 'Harry Potter 5', 'Harry Potter 6',
      'Harry Potter 7'];

    _.each(booktitles, function(t) {
      var book = new Book({ title: t, author: 'Bruce Wayne' });
      book.create(StackMobExamples.debugCallback('Creating Book: ' + t));
    });
  };

  StackMobExamples['deleteBooks'] = function() {
    var books = new Books();
    books.fetch(StackMobExamples.debugCallback('Fetching Books', function() {
      var book;
      while(book = books.pop()) {
        book.destroy(StackMobExamples.debugCallback('Deleting book: ' + book.get('title')));
      }
    }));
  };

  StackMobExamples['getQueryItems'] = function() {
    var smqitems = new SMQItems();
    smqitems.fetch(StackMobExamples.debugCallback('Getting all Test Objects'));
  };


  /**
   * Test User CRUD
   */
  (function() {
    $(document).ready(function() {
      
      $('#createOAuthUser').click(function() {
        var user = new StackMob.User({ username: 'oauthtestuser', password: 'oauthtestpassword' });
        user.create({
          success: function(model) {
            console.debug('USER CREATED');
          }
        });
      });
      
      $('#user_create').click(function() {
        StackMobExamples.createUser();
      });

      $('#user_read').click(function() {
        StackMobExamples.fetchUser();
      });

      $('#user_update').click(function() {
        StackMobExamples.updateUser();
      });

      $('#user_delete').click(function() {
        StackMobExamples.deleteUser();
      });
    });
  }).call();


  /**
   * Testing user methods
   */
  (function() {
    $(document).ready(function() {
      $('#login').click(function() {
        StackMobExamples.login();
      });
    });

    $(document).ready(function() {
      $('#logout').click(function() {
        StackMobExamples.logout();
      });
    });
  }).call();


  /**
   * Testing new models
   */
   (function() {
    $(document).ready(function() {
      $('#book_createbooks').click(function() {
        StackMobExamples.createBooks();
      });

      $('#book_delete').click(function() {
        StackMobExamples.deleteBooks();
      });
    });
   }).call();

  /**
   * Test StackMob.Collection.Query
   */
  (function() {
    $(document).ready(function() {

      $('#smq_getall').click(function() {
        StackMobExamples.getQueryItems();
      });

      $('#smq_createall').click(function() {
        for(var i = 0; i < 25; i++) {
          var item = new SMQItem({
            number: i,
            numbers: [i, i+1, i+2, i+3],
            mod: (i % 5)
          });

          item.create(StackMobExamples.debugCallback('Creating fake items to test'));
        }
      });

      $('#smq_deleteall').click(function() {
        var smqitems = new SMQItems();
        smqitems.fetch(StackMobExamples.debugCallback('Deleting All SMQ Items', function() {
          var model;
          while(model = smqitems.pop()) {
            model.destroy(StackMobExamples.debugCallback('Deleting: ' + model.get('smqitem_id')));            
          }
        }));
      });


    $('#smq_count').click(function() {
        var items = new SMQItems();
        var q = new StackMob.Collection.Query();
        q.equals('number', 15);
        items.count(q, StackMobExamples.debugCallback('Getting Item Number 15 Count'));
      });
      
      $('#smq_equals').click(function() {
        var items = new SMQItems();
        var q = new StackMob.Collection.Query();
        q.equals('number', 15);
        items.query(q, StackMobExamples.debugCallback('Getting Item Number 15'));
      });

      $('#smq_notequals').click(function() {
        var items = new SMQItems();
        var q = new StackMob.Collection.Query();
        q.notEquals('number', 15).orderAsc('number');
        items.query(q, StackMobExamples.debugCallback('Getting Item Number != 15'));
      });

      $('#smq_isnull').click(function() {
        var items = new SMQItems();
        var q = new StackMob.Collection.Query();
        q.isNull('number');
        items.query(q, StackMobExamples.debugCallback('Getting Items with null number'));
      });

      $('#smq_isnotnull').click(function() {
        var items = new SMQItems();
        var q = new StackMob.Collection.Query();
        q.isNotNull('number');
        items.query(q, StackMobExamples.debugCallback('Getting Items with non-null number'));
      });
      
      $('#smq_lt').click(function() {
        var items = new SMQItems();
        var q = new StackMob.Collection.Query();
        q.lt('number', 5).orderAsc('number');
        items.query(q, StackMobExamples.debugCallback('Getting Item Number < 5'));
      });

      $('#smq_lte').click(function() {
        var items = new SMQItems();
        var q = new StackMob.Collection.Query();
        q.lte('number', 5).orderAsc('number');
        items.query(q, StackMobExamples.debugCallback('Getting Item Number <= 5'));
      });

      $('#smq_gt').click(function() {
        var items = new SMQItems();
        var q = new StackMob.Collection.Query();
        q.gt('number', 20).orderAsc('number');
        items.query(q, StackMobExamples.debugCallback('Getting Item Number > 20'));
      });

      $('#smq_gte').click(function() {
        var items = new SMQItems();
        var q = new StackMob.Collection.Query();
        q.gte('number', 20).orderAsc('number');
        items.query(q, StackMobExamples.debugCallback('Getting Item Number >= 20'));
      });

      $('#smq_mustbeoneof').click(function() {
        var items = new SMQItems();
        var q = new StackMob.Collection.Query();
        q.mustBeOneOf('number', [1,5,10]).orderAsc('number');
        items.query(q, StackMobExamples.debugCallback('Getting Item Numbers 1, 5, 10'));
      });

      $('#smq_orderByAsc').click(function() {
        var items = new SMQItems();
        var q = new StackMob.Collection.Query();
        q.orderAsc('number');
        items.query(q, StackMobExamples.debugCallback('Getting Items in ascending number order'));
      });

      $('#smq_orderByDesc').click(function() {
        var items = new SMQItems();
        var q = new StackMob.Collection.Query();
        q.orderDesc('number');
        items.query(q, StackMobExamples.debugCallback('Getting Items in descending number order'));
      });

      $('#smq_range').click(function() {
        var items = new SMQItems();
        var q = new StackMob.Collection.Query();
        q.setRange(5, 9).orderAsc('number');
        items.query(q, StackMobExamples.debugCallback('Getting Items second page of results '));
      });
      $('#smq_gte_lte_expression').click(function() {
        var items = new SMQItems();
        var q = new StackMob.Collection.Query();
        q.gte('number', 3).lte('number', 5).orderAsc('number');
        items.query(q, StackMobExamples.debugCallback('Getting 3 <= number <= 5'));
      });
    });
  }).call();
  
  (function() {
    function handleFileSelect(evt) {
      var files = evt.target.files; // FileList object
   
      // Loop through the FileList
      for (var i = 0, f; f = files[i]; i++) {
   
        var reader = new FileReader();
   
        // Closure to capture the file information
        reader.onload = (function(theFile) {
          return function(e) {
   
            /*
              e.target.result will return "data:image/jpeg;base64,[base64 encoded data]...".
              We only want the "[base64 encoded data] portion, so strip out the first part
            */
            var base64Content = e.target.result.substring(e.target.result.indexOf(',') + 1, e.target.result.length);
            var fileName = theFile.name;
            var fileType = theFile.type;
   
            var user = new StackMob.User({ username: 'Bruce Wayne' });
            user.fetch({
              success: function(model) {
                
                model.setBinaryFile('pic', fileName, fileType, base64Content);
                
                model.save(StackMobExamples.debugCallback('Saving the binary file to the user'));  
              }
            });
            
   
          };
        })(f);
   
        // Read in the file as a data URL
        fileContent = reader.readAsDataURL(f);
   
      }
    }
    
    $(document).ready(function() {
      document.getElementById('files').addEventListener('change', handleFileSelect, false); 
    });
  }).call();


  /**
   * Testing GeoPoint
   */
  (function() {

    $(document).ready(function() {
      $('#geo_saveattractions').click(function() {
          var attrs = [{"name":"Golden Gate Bridge","location":{"lon":-122.419416,"lat":37.77493} },
                              {"name":"Coit Tower","location":{"lon":-122.478532,"lat":37.819586}},
                              {"name":"Fisherman's Wharf","location":{"lon":-122.415805,"lat":37.808224}},
                              {"name":"Sunset and Noriega","location":{"lon":-122.495327,"lat":37.753649}},
                              {"name":"19th and Noriega","location":{"lon":-122.47653,"lat":37.754226}},
                              {"name":"Sunset and Taraval","location":{"lon":-122.494726,"lat":37.742112}},
                              {"name":"19th and Taraval","location":{"lon":-122.475758,"lat":37.743164}},
                              {"name":"Inside Box","location":{"lon":-122.48374,"lat":37.749815}},
                              ];

          _.each(attrs, function(attr) {
            var a = new Attraction(attr);
            a.save(null, StackMobExamples.debugCallback('Saving: ' + attr['name']))
          });
      });

      $('#geo_getattractions').click(function() {
        var attractions = new Attractions();
        attractions.fetch(StackMobExamples.debugCallback('Getting all attractions'));
      });

      $('#geo_clearallattractions').click(function() {
        var attractions = new Attractions();

        attractions.fetch(StackMobExamples.debugCallback('Getting all attractions to Delete', function() {
          var model;
          while(model = attractions.pop()) {
            model.destroy(StackMobExamples.debugCallback('Deleting attraction'));
          }
        }));
      });

      $('#geo_mustbenear').click(function() {
        var attractions = new Attractions();
        var mustBeNearMiQuery = new StackMob.Collection.Query();
        mustBeNearMiQuery.mustBeNearMi('location', new StackMob.GeoPoint(37.742112,-122.494726), 1)
        attractions.query(mustBeNearMiQuery, StackMobExamples.debugCallback('Getting attractions 1 mile near X'));
      });

      $('#geo_iswithin').click(function() {
        var attractions = new Attractions();
        var isWithinMiQuery = new StackMob.Collection.Query();
        isWithinMiQuery.mustBeNearMi('location', new StackMob.GeoPoint(37.742112,-122.494726), 1)
        attractions.query(isWithinMiQuery, StackMobExamples.debugCallback('Getting attractions 1 mile within X'));
      });

      $('#geo_iswithinbox').click(function() {
        var attractions = new Attractions();
        var se = {"lon":-122.475758,"lat":37.743164}; //19th and Taraval
        var nw = {"lon":-122.495327,"lat":37.753649}; //Sunset and Noriega
        var isWithinBoxQuery = new StackMob.Collection.Query();
        isWithinBoxQuery.isWithinBox('location', se, nw);
        attractions.query(isWithinBoxQuery, StackMobExamples.debugCallback('Getting attractions within box'));
      });
    });
  }).call();


  /**
   * Testing with Facebook
   */
  (function() {
    $(document).ready(function() {
      var fblogin = function (runAfterLogin) {
        FB.login(function(response) {
          if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
              console.log('Good to see you, ' + response.name + '.');
            });

            runAfterLogin(response.authResponse);

          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        }, {scope: 'email'});
      };

      var createUserFB = function () {
        var create = function(authResponse) {
          var accessToken = authResponse.accessToken;
          var user = new StackMob.User({ username: 'youruser@theiremail.com'});
          user.createUserWithFacebook(accessToken);
        }

        fblogin(create);
      };

      var loginFB = function () {
        var login = function(authResponse) {
          var accessToken = authResponse.accessToken;
          var user = new StackMob.User();
          user.loginWithFacebookToken(accessToken, false);
        }

        fblogin(login);
      };

      var linkFB = function() {
        var link = function(authResponse) {
          var user = new StackMob.User();
          user.linkUserWithFacebook(authResponse.accessToken, false);
        }
        fblogin(link);
      }


      $('#createUserFB').click(createUserFB);
      $('#loginFB').click(loginFB);
      $('#linkFB').click(linkFB);

    });

  }).call();

  /**
   * Testing custom code
   */
  (function() {
    $(document).ready(function() {
      $('#cc_helloworld').click(function() {
        StackMob.cc('hello_world', {}, StackMobExamples.debugCallback('Testing CC'));
      });
    });
  }).call();
  
  (function() {
    $(document).ready(function() {
      $('#cc_withparams').click(function() {
        var params = { second_string: 1, first_string: 2 };
        StackMob.cc('has_params_method', params, StackMobExamples.debugCallback('Testing CC with params'));
      });
    });
  }).call();

  /**
   *  Testing Arrays
   */
  (function() {
    $(document).ready(function() {
      var Message = StackMob.Model.extend({
        schemaName: 'message'
      });

      var Messages = StackMob.Collection.extend({
        model: Message
      });

      $('#rel_createuser').click(function() {
        var user = new StackMob.User({ 'username': 'Mr. Rogers', 'password': 'hello' });
        user.create(StackMobExamples.debugCallback('Creating user Mr. Rogers.'));
      });

      $('#rel_deleteuser').click(function() {
        var user = new StackMob.User({ 'username': 'Mr. Rogers'});
        user.destroy(StackMobExamples.debugCallback('Delete Mr. Rogers'));
      });

      $('#rel_appendandcreate').click(function() {
        var user = new StackMob.User({ 'username': 'Mr. Rogers' });
        user.fetch(StackMobExamples.debugCallback('Fetching Mr. Rogers', function() {

          var msgs = [];
          for (var i = 0; i < 10; i++) {
            msgs.push(new Message({ 'content': 'Hello World ' + i + '!'}));
          }

          user.appendAndCreate('messages', msgs, StackMobExamples.debugCallback('Sending 10 messages "Hello World [int]" and creating/appending to Mr. Rogers "messages" field.', function() {
            var q = new StackMob.Collection.Query();
            q.equals('username', 'Mr. Rogers').setExpand(1);
            var users = new StackMob.Users();
            users.query(q, StackMobExamples.debugCallback('Fetching expanded Mr. Rogers to show that he now has 10 messages'));

          }));
        }));
      });

      $('#rel_getmsgs').click(function() {
        var messages = new Messages();
        messages.fetch(StackMobExamples.debugCallback('Fetching all messages to show they were created.'));
      });

      $('#rel_deletemsgs').click(function() {
        var msgs = new Messages();
        msgs.fetch(StackMobExamples.debugCallback('Getting all messages', function() {
          var model;
          while(msg = msgs.pop())
            msg.destroy(StackMobExamples.debugCallback('Deleting message: ' + msg.get('message_id')));
        }));
      });

      $('#rel_appendandsave').click(function() {
        var user = new StackMob.User({ 'username': 'Mr. Rogers'});
        user.fetch(StackMobExamples.debugCallback('Fetching Mr. Rogers', function() {
          var msg = new Message({ 'content': 'New Message'});

          msg.create(StackMobExamples.debugCallback('Creating Message now.', function() {
              user.appendAndSave('messages', [msg.get('message_id')], StackMobExamples.debugCallback('Appending and Saving'));
          }));
        }));

      });

      $('#rel_deleteandsave').click(function() {
        var user = new StackMob.User({'username': 'Mr. Rogers'});
        user.fetch(StackMobExamples.debugCallback('Fetching Mr. Rogers', function() {
          user.deleteAndSave('messages', user.get('messages'), StackMob.SOFT_DELETE, StackMobExamples.debugCallback('Deleting references to messages only.', function() {
            user.fetch(StackMobExamples.debugCallback('Showing Mr. Rogers after soft deleting message references.  Messages should still exist in datastore'));
          }));
        }));
      });

      $('#rel_harddeleteandsave').click(function() {
        var user = new StackMob.User({'username': 'Mr. Rogers'});
        user.fetch(StackMobExamples.debugCallback('Fetching Mr. Rogers', function() {
          user.deleteAndSave('messages', user.get('messages'), StackMob.HARD_DELETE, StackMobExamples.debugCallback('Deleting references to messages only.', function() {
            user.fetch(StackMobExamples.debugCallback('Showing Mr. Rogers after soft deleting message references.  Messages should still exist in datastore'));
          }));
        }));
      });

      $('#rel_getuser').click(function() {
        var user = new StackMob.User({ username: 'Mr. Rogers'});
        user.fetch(StackMobExamples.debugCallback('Fetching Mr. Rogers'));
      });

      $('#rel_getuserexpanded').click(function() {
        var user = new StackMob.User({ username: 'Mr. Rogers'});
        user.fetchExpanded(1, StackMobExamples.debugCallback('Fetching Mr. Rogers'));
      });
    });
  }).call();