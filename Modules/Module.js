/**
 * Autor: Fabio Andres Tobon Quesada
 * Email: fandres69@gmail.com
 * Fecha: 19/01/2021
 * Descripción: Manejo de módulos con Node js
 */

/**Remplaza las llaves del archivo Clientes {%llave%} */
module.exports=(temp,repl)=>{
    let Out= temp.replace(/{%ID%}/g,repl.id);
    Out = Out.replace(/{%NOMBRE%}/g,repl.Nombre);
    Out = Out.replace(/{%TELEFONO%}/g,repl.Telefono);
    //console.log(Out);
    return Out;
}