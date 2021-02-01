const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const app=require('./app'); 

const port=process.env.PORT_ENV || 3000; 

app.listen(port,() => {
    console.log(`App running on port: ${port} ...`);
})