//A SINGLE ANIMAL TEMPLATE TO RENDER AS MANY ANIMALS AS WE HAVE IN OUR ANIMALS OBJECT

//import choo template helper (ALWAYS when making html tagged temp lits)
var html = require('choo/html');


//export module (PATTERN 2: 'Exporting an anonymous function')
// (it gets named inside the require statement of the INDEX.js file!!)
module.exports = function(onclick, animal, i){
  var type = animal.type;
  var x = animal.x;
  var y = animal.y;
  
  //html template
  return html`
    <img src='/assets/${type}.gif' style='left: ${x}px; top: ${y}px;' id=${i} onclick=${onclick} />
  `
};