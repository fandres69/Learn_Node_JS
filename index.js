/**
 * Para crear un servidor se debe crear una constante que erede del paquete http
 * y se crea un servidor.
 * 
 * Para ver la peticion realizada (ruta) se usa req.url
 */

const http= require('http');
const fs= require('fs');
const url= require('url');

const server= http.createServer((req,res)=>{
    const pathName=req.url;
    if (pathName==='/login' || pathName === '/Login') {
        res.writeHead(200);       
        res.end('Login page');
    }else if(pathName==='/api'){
        //En este ejemplo se lee un archivo json que contiene la data para la 
        //respuesta del api
        fs.readFile (`${ __dirname}/Data/data.json`,'utf-8',(err,data)=>{
            if (err) {
                res.hasHeader(400,{'Error-Cause':'Data no read'});
                res.write('<h1>Ups no fue posible leer los datos</h1>');
            } else {
                const dData= JSON.parse(data);
                res.writeHead(200,{'Content-type':'application/json'});
                console.log(data);
                res.end(data);
            }
        });

        //res.end('API');

    }else{
        res.writeHead(400,
            {'Content-type':'text/html',
        'my-own-header': 'Hola'}
        );        
        res.end('<h1>UPS no encontramos la pagina solicitada :(');
    }

   // res.end('Saludo desde servidor');
});

server.listen(8080,'127.0.0.1',()=>{
    console.log('Escuchando desde el puesto 8080'); 
});
 