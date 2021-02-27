const mongoose = require('mongoose');
const slugify= require('slugify');

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
    slug:String,
    createAt:{
        type:Date,
        default:Date.now()
        //select:false//esta linea oculta el campo en las consultas
    },
    startDates:[Date],
    secretTour:{
        type:Boolean,
        default:false
    }
},
{
    //Agrega la función virtual al modelo 
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}

);

/**Funcion virtual, se ejecutan en Mongo y son mostradas en la información que retorna la BD */
toursSchema.virtual('durationWeeks').get(function(){
    return this.duration/7;
}
);

//Middleware en el esquema  : corre antes de grabar y crea
toursSchema.pre('save', function(next){
    this.slug=slugify(this.name,{lower:true});
    next();
});
//se ejecuta antes del evento save
// toursSchema.pre('save', function(next){
//     console.log('Will save document');
//     next();
// });
// Se ejecuta tras el evento save
// toursSchema.post('save', function(doc,next){
//     console.log(doc);
//     next();
// });

//Función que se ejecuta en las consultas que son enviadas a la BD
toursSchema.pre(/^find/, function(next){
    this.find({secretTour: {$ne:true}});
    next();
});
toursSchema.pre('findOne', function(next){
    this.find({secretTour: {$ne:true}});
    next();
});

/**Se instancia el modelo en la base de datos (nombre tabla , estructura) */
const Tour=mongoose.model('tours',toursSchema);

module.exports=Tour;