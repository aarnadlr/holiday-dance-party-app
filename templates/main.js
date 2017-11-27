//import choo template header; needed everywhere we make html tagged literal code
var html = require('choo/html')
// var danceparty = require('./../assets/danceparty-data.js')

// import adjacent ANIMAL template (template insiede a template)
var animal = require('./animal.js');


//export this module of code so it is available to index.js
module.exports = function(state, emit){
  
  //create html template
	return html`


<div id='outer'>
	<div id='border'>
		<p>-</p>
	</div>
	<div id='header'>
		<h2>The Adler Family 2017</h2>
		<h3>Holiday Dance Party</h3>
	</div>

	<div id='instructions'>
		<h1>Instructions</h1>
		<p>Click on the snow below to generate random dancing Adlers. Click on dancing Adlers to remove them.
		</p>
	</div>

		<div class='container'>

			<div class='grass'>
				<img src='/assets/holiday-snow700.jpg' onclick=${add} />

				${state.animals.map(animalMap)}
			</div>
		</div>
		<div id='footer'>
		<h5><span id='love'>Happy Holidays! <span id='love2'>Love,</span></span></h5>
		<p>Charley, Asher, Molly & Aaron
		</p>
	</div>
</div>
`
  
  //NEW map function
  function animalMap(obj, i){
    return animal(remove, obj, i)
  };
  
  //add NEW ANIMAL to STATE
  function add (event){
    
    var x = event.offsetX - 30;
    var y = event.offsetY - 30;
    
    //EMIT = ALERT the STATE of an event/change; TRIGGER whatever is in emitter.on()
    emit('addAnimal', {x: x, y: y});
  };
  
  //REMOVE animal from state:
  function remove (e){
    var index = e.target.id;
    
    emit('removeAnimal', index);
  }
  
};

// Insert our animals ARRAY and MAP it: For each object in our state.animals array, return an <img>!! 