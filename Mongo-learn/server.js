const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

let connDB =process.env.DATABASE.replace('<BDPASSWORD>',process.env.BDPASSWORD);
const DB= connDB.replace('<BDUSERNAME>',process.env.BDUSERNAME);

/**Crea una instancia de base de datos*/
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false    
})
.then(()=>{
    //console.log(con);
    console.log('BD connect success');
});

const app=require('./app'); 

const port=process.env.PORT_ENV || 3000; 

/**Modelo de una tabla de BD y sus validaciones*/
const toursSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,'A tour must have a name'],
        unique:true
    },
    rating: {
        type:Number,
        default:4.5
        },
    price: {
        type:Number, 
        required:[true,'A tour must have a price']
    }
})
/**Se instancia el modelo en la base de datos (nombre tabla , estructura) */
//const Tour=mongoose.model('tours',toursSchema);

//**Se carga un registro de prueba */
// const testTour=new Tour({
//     name:'The Park Wood',
//     rating:4.7,
//     price:497
// });
//**Se guarda el registro en la base de datos (commit) */
// testTour.save().then(doc=>{
//     console.log(doc);
// }).catch(err=>{
//     console.log(`ERROR : ${err}`);
// });


app.listen(port,() => {
    console.log(`App running on port: ${port} ...`);
})