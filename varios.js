//Importación de módulos principales
/*
Los módulos se heredan llamándolos a traves de una constante y la palabra require
*/ 
//Importación modulo general fs (File system)
const { F_OK } = require('constants');
const fs = require('fs');

const Saludo='Hello this is my app';
//esta linea escribe en la consola de node
console.log(Saludo);


/**
 * Rpath: Ejemplo para lectura de un archivo
 */
var Rpath='D:\\fandr\\Descargas\\complete-node-bootcamp-master\\complete-node-bootcamp-master\\1-node-farm\\starter\\txt\\start.txt';

/**
 * Se define para leer un archivo con la función readFileSync del modulo fs
 */
const Rfile= fs.readFileSync('D:\\fandr\\Descargas\\complete-node-bootcamp-master\\complete-node-bootcamp-master\\1-node-farm\\starter\\txt\\start.txt');

console.log(Rfile.toString());

/**
 * Se define el nuevo texto con el que sobre escribe el archivo que se esta leyendo Lin: 21
 */
const Ntext='nuevo texto de salida desde Node';

/**
 * Se sobre escribe el documento con el nuevo contenido
*/
//fs.writeFileSync(Rpath,Ntext);
console.log('El archivo ha sido escrito');


/**
 * Funciones con callback: son funciones que se ejecutan tras una acción, son muy
 * útiles para hacer validaciones post evento
 */

Rpath='c:\\fandr\\Descargas\\complete-node-bootcamp-master\\complete-node-bootcamp-master\\1-node-farm\\starter\\txt\\start.txt';

//  fs.readFile(Rpath,'utf-8',(err,data)=>{
//     if(err){
//         console.log(err.message);
//     }else{

//         console.log('la lectura se realizo correctamente: '+ data);
//     }
//  })

