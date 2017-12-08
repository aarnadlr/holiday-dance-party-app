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
  </div>
  

	<div class='flexParent'>
    <img id='textHeader' src="./../assets/header5.png" alt="">
	</div>



  <div id='instructions' class='instruc instruc--marginTB instruc--redBcg'>
  
    <div id='instructions__inner'>
      
      <div class='flexParent flexStart'>
          <h1 id='instHeader' >Instructions:</h1>
      </div>


      <div class='flexParent'>
          <p id='instCopy'>Click on the snow below to generate random dancing Adlers. Click on a dancing Adler to remove one.
          </p>
      </div>
  
    </div>

  </div>


		<div class='container'>

			<div class='grass'>
				<img src='/assets/holiday-snow700.jpg' onclick=${add} />

				${state.animals.map(animalMap)}
			</div>
    </div>
    

  <div id='footer'>

    <div class='flexParent'>
        <h5 id='happyHol'>Happy Holidays! Love,</h5>
    </div>

    <div class='flexParent'>
        <p id='names'>Charley, Asher, Molly & Aaron</p>
    </div>
		
	</div>



	<div id='border'>
		<p>-</p>
	</div>
</div>
`;
  
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