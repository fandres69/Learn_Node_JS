//console.log(arguments);
//console.log(require("module").wrapper);

/**Se llama el modulo de ejemplo 1 (clase con métodos incluidos)*/
const C= require('./test-module');
const cal1= new C();
console.log(cal1.add(10,5));

/**Se llama el modulo de ejemplo 2 (export solo métodos)*/
const cal2=require('./test-module2');
console.log(cal2.suma(20,2));

// caching

require('./test-module3')();
require('./test-module3')();
require('./test-module3')();