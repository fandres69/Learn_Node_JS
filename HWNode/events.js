const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter{
    constructor(){
        super();
    }
}
const myevent = new Sales();

myevent.on("newSale",()=>{
    console.log("There was a new sale");
});
myevent.on("newSale",()=>{
    console.log("Costumer name : Fandres");
});

myevent.on("newSale", stock=>{
    console.log(`There are new ${stock} items left in stock`);
});


myevent.emit("newSale",9);


//****************************** */

const server= http.createServer();


server.on("request",(req,res)=>{
    console.log('Request received');
    res.end("Request received");
});


server.on("request",(req,res)=>{
    console.log('Another Request received :)');
    
});

server.on('close',()=>{
    console.log('Server closed');
});

server.listen(8000,"127.0.0.1",()=>{
    console.log("Waiting for request . . .");
});