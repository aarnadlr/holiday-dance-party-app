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
    {type: 'char1', x: 200, y:100},
    {type: 'asher1', x: 50, y:300}
  ];
  
  // EMITTER = LISTENER and REACTOR
  //Listen for addAnimal; when triggered, create an obj and push it into ARRAY
  // addAnimal is a handle; when it is emitted, run the callback;
  //therefore, the callback function IS the 'addAnimal' event
  emitter.on('addAnimal', function(data){
    
    var animals = [
      'char1', 'asher1'
    ];
    
    var type = Math.floor(Math.random() * 2);
    var x = data.x;
    var y = data.y;
    
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