const fs = require("fs");
const crypto= require('crypto');
setTimeout(()=>console.log("Timer 1 finished"),0);
setImmediate(()=>console.log("Immediate 1 finished"));
const start= Date.now();
process.env.UV_THREADPOOL_SIZE = 1;


fs.readFile(`${__dirname}/test-file.txt`,()=>{
    console.log("I/O finished");
    console.log("----------------------");

    setTimeout(()=>console.log("Timer 2 finished"),0);
    setTimeout(()=>console.log("Timer 3 finished"),3000);
    setImmediate(()=>console.log("Immediate 1 finished"));

    process.nextTick(()=>console.log("Process nextTick"));
    crypto.pbkdf2('Password','salt',100000,1024,'sha512',()=>{
        console.log(Date.now()-start,"Password encrypted");
    });
    crypto.pbkdf2('Password','salt',100000,1024,'sha512',()=>{
        console.log(Date.now()-start,"Password encrypted");
    });
    crypto.pbkdf2('Password','salt',100000,1024,'sha512',()=>{
        console.log(Date.now()-start,"Password encrypted");
    });
    crypto.pbkdf2('Password','salt',100000,1024,'sha512',()=>{
        console.log(Date.now()-start,"Password encrypted");
    });
});
console.log("hello from the top level code");
