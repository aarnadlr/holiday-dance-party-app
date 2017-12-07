// import choo
var choo = require('choo');

// import choo template helper
var html = require('choo/html');

// import template
var main = require('./templates/main.js');



//**
// initialize choo
var app = choo();



// STATE = STORAGE
// SET UP/ INITIALIZE A STATE OBJECT TO STORE STATE and RE-STORE IT UPON EVERY FLOW-THROUGH
app.use(function(state, emitter){
  
  //initialize state with property: animals ARRAY
  state.animals = [
	// *** REVISE!!!
	// *** REVISE!!!
	// *** REVISE!!!
    {type: 'char3c', x: 90, y:130},
    // {type: 'asher1', x: 50, y:100},
    {type: 'asher-skel-2', x: 220, y:170},
    {type: 'aaron1b', x: 520, y:160},
    {type: 'molly-1c', x: 370, y:120}
  ];
  
  // EMITTER = LISTENER and REACTOR
  //Listen for addAnimal; when triggered, create an obj and push it into ARRAY
  // addAnimal is a handle; when it is emitted, run the callback;
  //therefore, the callback function IS the 'addAnimal' event
  emitter.on('addAnimal', function(data){
    
    var animals = [
		// *** REVISE!!!
		// *** REVISE!!!
		// *** REVISE!!!
      'char-2b', 'asher1', 'molly-1c','asher-skel-2', 'aaron1b','char3c'
    ];
		
		// *** REVISE NUMBER!!!
		// *** REVISE NUMBER!!!
		// *** REVISE NUMBER!!!
    var type = Math.floor(Math.random() * 6);
    var x = data.x -20;
    var y = data.y -40;
    
    var obj = {type: animals[type], x: x, y: y}
    state.animals.push(obj);
    
    //Tell choo to re-render our templates
    emitter.emit('render');
  });
  
  
  //REMOVE animal:
  emitter.on('removeAnimal', function (i){
    
    //At index [i], remove one item in the array
    state.animals.splice(i, 1)
    //Re-render template
    emitter.emit('render')
  });
  
});




//**
//declare routes: takes two args: path, template-name
app.route('/', main);



// start app
app.mount('div');


// NEW APP.LISTEN (FOR HEROKU)
// app.listen(process.env.PORT || 5000, function() {
//   console.log("THE YELP CAMP SERVER HAS STARTED!");
// });