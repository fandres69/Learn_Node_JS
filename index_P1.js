/**
 * Para crear un servidor se debe crear una constante que herede del paquete http
 * y se crea un servidor.
 * 
 * Para ver la petición realizada (ruta) se usa req.url
 * 
 * Agregar Dependencias
 *  npm install nodemon --save-dev
 *  npm install nodemon --global
 *  npm install slugify
 *  npm install bootstrap
 * 
 * Crear archivo de paquete
 * 
 * npm init (Se siguen las instrucciones)
 * 
 * Se recomienda la instalación de los plugins para vscode enumerados a continuación
 * 1. DotENV
 * 2. Eslint
 * 3. Image preview
 * 4. TabNine
 * 5. TODO Highlight
 */

const http= require('http');
const fs= require('fs');
const url= require('url');
//llamados a módulos propio
const Rept=require('./Modules/Module');
//llamado a módulos de terceros herramienta npm
const slugify= require('slugify');

/**Lee la plantilla html Home */
const VHome= fs.readFileSync(`${__dirname}/Views/Home.html`,'utf-8');
/**Lee la plantilla html Clientes */
const VCliente= fs.readFileSync(`${__dirname}/Views/Clientes.html`,'utf-8');
const vFOOT= fs.readFileSync(`${__dirname}/Views/Foot.html`,'utf-8');

/**Lee los datos del archivo json data */
const data = fs.readFileSync(`${__dirname}/Data/data.json`,'utf-8');

console.log(slugify('Prueba de cadena',{lower:true})); 

const dataOjb=JSON.parse(data);

/**Remplaza las llaves del archivo Clientes {%llave%} */
// const Remplacetemp=(temp,remp)=>{
//     let outp= temp.replace(/{%ID%}/g,remp.id);
//     outp = outp.replace(/{%NOMBRE%}/g,remp.Nombre);
//     outp = outp.replace(/{%TELEFONO%}/g,remp.Telefono);
//     //console.log(outp);
//     return outp;
// };

/**Remplaza regiones especificas dentro de la pagina Home*/
const VfinalHOme=(temp,remp,foo)=>{
let outp= temp.replace(/{%CLI%}/g,remp);
outp= outp.replace(/{%FOT%}/g,foo);
//console.log(outp);
return outp;
};
//Cuando se utilizan datos provenientes de archivos json se debe incluir la opción join(''), a fin de que no
//se usen las , como separador de los datos y no sean mostrados en el html que se responde

const Vfinal= dataOjb.map(x=> Rept(VCliente,x)).join('');

const Vfinalview=VfinalHOme(VHome,Vfinal,vFOOT);



/**Se crea el servidor y se colocan las validaciones de ruta (request)*/
const server= http.createServer((req,res)=>{
    /**se obtiene la url*/
    //const pathName=req.url;
    
    /**se obtiene los parámetros por query y la url*/
    const {query,pathname}= url.parse(req.url,true);
    
    console.log(query);
    console.log(pathname);
    
    if(pathname === '/'){
        
        const xxx= new URLSearchParams(pathname);
        console.log(xxx);
        res.writeHead(200, {'Content-type':'text/html'});
        res.end(Vfinalview);        
    }  
    //login page
    else if (pathname==='/login' || pathname === '/Login') {
        res.writeHead(200);       
        res.end('Login page');

    }    
    //api
    else if(pathname==='/api'){
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

    
    }
    //No found
    else{
        
             
        res.writeHead(200, {'Content-type':'text/html'});
        res.end(Vfinalview);   
        // res.writeHead(400,
        //     {'Content-type':'text/html',
        // 'my-own-header': 'Hola'}
        // );        
        // res.end('<h1>UPS no encontramos la pagina solicitada :(');
    }

   // res.end('Saludo desde servidor');
});

/**Se levanta la instancia del servidor y se crea la ip de escucha y el puerto */
server.listen(8080,'127.0.0.1',()=>{
    console.log('Escuchando desde el puesto 8080'); 
});
 