const Tour= require('../models/tourModel');
const APIFeatures= require('../utils/apiFeatures');

exports.aliasTopTours=(req,res,next)=>{
    req.query.limit='5';
    req.query.sort='-ratingsAverage,price';
    req.query.fields='name,price,ratingsAverage,summary,difficulty';
    next();
};
//#region Tour
/**Retorna todos la data tours */
exports.getAllTours= async (req,res)=>{        
    try {   
        
        //#region Comentarios
        //Método para omitir filtros enviados en la url como parámetros 
        //1 Se obtienen los parametros enviados en la url
        // const queryObj={...req.query};
        //console.log(queryObj);
        //2 Se crea el array con el listado de excluciones
        //const excludeFields=['page','sort','limit','fields'];
        //3 Se eliminan del objeto las excluciones
        //excludeFields.forEach(el=>delete queryObj[el]);
        //console.log(queryObj);
        //4 Se realiza la consulta en la BD
        
        //filtros avanzados
        // let queryString=JSON.stringify(queryObj);
        // queryString= queryString.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`);
        // console.log(JSON.parse(queryString));
        
        // let query= Tour.find(JSON.parse(queryString));
        //{difficulty: 'easy',duration:{$gte:5}}
        //sort
        // if(req.query.sort){
            //     const sorBy=req.query.sort.split(',').join(' '); 
            //     console.log(sorBy);
            //     query.sort(sorBy);
            //     //sort('price ratingsAverage')
            // }else{
                //     query=query.sort('-createdAt');
                // }

                //field limiting
        // if (req.query.fields) {
            //     //devuelve solo los fields solicitados
            //     const fields= req.query.fields.split(',').join(' ');
            //     query=query.select(fields);
            // }else{
                //     query=query.select('-__v');
                // }
                
                //Pagination muestra los datos divididos en el numero de paginas que son solicitadas según 
                //la variable limit
                // const page=req.query.page * 1 || 1;
                // const limit=req.query.limit * 1 || 100;
                // const skip=(page - 1)* limit;
                
                // //page=2&limit=10, 1-10, page 1, 11-20, page 2, 21-30, page 3 
                // query=query.skip(skip).limit(limit);
                
                // if(req.query.page){
                    //     const numTours=await Tour.countDocuments();
                    //     console.log(numTours);
                    //     if(skip>=numTours) throw new Error('This page does not exists');
                    // }
                    
        //#endregion
        const features = new APIFeatures(Tour.find(),req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
        const tours= await features.query; 
        
        //const tours= await Tour.find(queryObj);
        //const tours= await Tour.find();
        res.status(200).json({
            status:'success',
            length:tours.length,        
            data:{tours}
        });
    } 
    catch (err) {
        res.status(404).json({
            status:'error',
            message: err.message
        });
    }
};

/**Retorna un tour especifico (param: id) */
exports.getTour= async (req, res)=>{
    console.log(req.params.id);
    try {
        const tourResponse=await Tour.findById(req.params.id);
        res.status(200).json({
            status:'success',
            data: {tourResponse}
        });
    } 
    catch (err) {
        res.status(400).json({
            status:'error',
            message:err.message
        });
    }
//    
};

/**Crea un tour*/
exports.CreateTour= async(req,res)=>{
    
    try{      
        const newTour= await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newTour
        });
    } 
    catch (err) {
          res.status(400),json({
            estatus: 'error',
            message: err.message
          });
    }

};

/**Actualiza un tour (param: id)*/
exports.UpdateTours= async(req,res)=>{

    try {

        const tourUpdate= await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });   
        res.status(200).json({
            status:'success',
            data: { tourUpdate }
            
    });
    }
    catch (err) {
        res.status(400).json({
            status:'error',
            message: err.message
        });
    }
   
};

/**Elimina un tour (param: id)*/
exports.DeleteTour= async(req,res)=>{ 
    console.log(req.params); 
    try {
        const tourDelete= await Tour.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status:'success',
            data:null            
         });
        
    } catch (err) {
        res.status(400).json({
            status:'error',
            message: err.message
        });
    }
   
};
//#endregion

/**CRUD funcional en totalidad con parámetros simples */