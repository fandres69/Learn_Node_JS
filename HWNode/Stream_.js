/**Ejemplo de como leer contenido en nuestro servidor
 * y mostrarlo en nuestra pagina (3 formas diferentes)
*/
const fs = require("fs");
const server = require("http").createServer();

server.on("request",(req,res)=>{
    
    //solucion 1
    // fs.readFile(`${__dirname}/test-file.txt`,(err,data)=>{
    //     if (err) console.log(err);        
    //     res.end(data);
    // });

    //Solucion 2 : stream
    // const readable= fs.createReadStream(`${__dirname}/test-file.txt`);
    // readable.on('data',chunk=>{
    //     res.write(chunk);
    // });

    // readable.on('end',()=>{
    //     res.end();
    // });

    // readable.on("error",err=>{
    //     console.log(err);
    //     res.status(500);
    //     res.end("File no found");
    // });
    //solucion 3 : stream
     const readable= fs.createReadStream(`${__dirname}/test-file.txt`);
     readable.pipe(res);
     //readable.pipe(writeableDesc);

});

server.listen(8080,"127.0.0.1",()=>{

    console.log("Server is on");
});