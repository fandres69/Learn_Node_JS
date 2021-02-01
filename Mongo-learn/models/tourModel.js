const mongoose = require('mongoose');

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

/**Modelo de una tabla de BD y sus validaciones*/
const toursSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,'A tour must have a name'],
        unique:true
    },
    duration:{
        type: Number,
        required:[true,'A tour must have a duration']
    },
    maxGroupSize:{
        type:Number,
        required:[true,'A tour must have a maxGroupSize']
    },
    difficulty:{
        type:String,
        required:[true,'A tour must have a difficulty']
    },
    ratingsAverage:{
        type:Number,
        default:4.5
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },    
    price: {
        type:Number, 
        required:[true,'A tour must have a price']
    },
    priceDiscount:Number,
    summary:{
        type:String,
        trim:true,
        required:[true,'A tour must have a description']
    },
    description:{
        type:String,
        trim:true
    },
    imageCover:{
        type:String,
        required:[true,'A tour must have a imageCover']
    },
    images:[String],
    createAt:{
        type:Date,
        default:Date.now()
        //select:false//esta linea oculta el campo en las consultas
    },
    startDates:[Date]
})

/**Se instancia el modelo en la base de datos (nombre tabla , estructura) */
const Tour=mongoose.model('tours',toursSchema);

module.exports=Tour;