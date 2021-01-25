/**
 * Para configurar los ambientes de desarrollo se utiliza el
 * paquete dotnet, con el cual podemos configurar algunas variables de
 * entorno desde un archivo de configuración .env
 * 
 * instalar dotenv
 * 
 * npm i dotenv
 * 
 */

//llama la instancia de ambientes
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const app=require('./app3');

//console.log(process.env) 
 
//start server
 /**Puerto de escucha del servidor */
 const port=process.env.PORT_ENV || 3000; 

 /**Instancia expuesta */
 app.listen(port,() => {
     console.log(`App running on port: ${port} ...`);
 })
 