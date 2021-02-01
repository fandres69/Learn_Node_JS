const fs= require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./../../config.env'});
const Tour = require('../../models/tourModel');

let connDB =process.env.DATABASE.replace('<BDPASSWORD>',process.env.BDPASSWORD);
const DB= connDB.replace('<BDUSERNAME>',process.env.BDUSERNAME);

/**Crea una instancia de base de datos*/
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true     
})
.then(()=>{
    //console.log(con);
    console.log('BD connect success');
});

//READ SECTION JSON FILES
const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));

// IMPORT DATA INTO DATABASE
const importData= async()=>{
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded');
    } catch (err) {
        console.log(`Error importData : ${err}`);
    }
    process.exit();
};

//DELETE ALL DATA FROM DATABASE
const deleteData= async()=>{
    try {
        await Tour.deleteMany();
        console.log('data successfully deleted');
    } catch (err) {
        console.log(`Error deleteData : ${err}`);
    }
    process.exit();
};

if(process.argv[2]=='--import'){
    importData();
}else if(process.argv[2]=='--delete'){
    deleteData();
}
console.log(process.argv);