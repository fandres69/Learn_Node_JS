//const fs = require('fs');
const express= require('express');
const morgan= require('morgan');
const tourRouter= require('./route/tourRutes')
const userRouter= require('./route/usersRutes')

 /**Se crea el servidor */
 const app= express();


 //Uso funciones middleware, que se ejecutan en los llamados de route
 
 //Esta linea se usa para para crear una solicitud que contiene datos en formato json
 app.use(express.json());

 app.use(express.static('./public'))
 //Este middleware imprime las peticiones y el tiempo de respuesta del api
 //muy util para registros

 console.log(`env: ${process.env.NODE_ENV}`);
 if (process.env.NODE_ENV ==='development') {
     
    app.use(morgan('dev'));
 }
 
//  app.use((req,res,next) => {
//      console.log("Hello from middleware");
//      next();
//  });

//  app.use((req,res,next) => {
//      req.requestTime = new Date().toString();    
//     next();
// });
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

 module.exports=app;