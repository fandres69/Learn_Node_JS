const fs = require('fs');

/**Se realiza lectura data tours */
const tours= JSON.parse(  
fs.readFileSync(`./dev-data/data/tours-simple.json`)
);

//#endregion middleware
//Funcion que valida los id de un tour
exports.checkTourId=(req,res,next,val) =>{
    console.log(`Tour id is: ${val}`);
    if(req.params.id*1>tours.length &&
        tours.find(el=>el.id===req.params.id)){
        return res.status(404).json({
            status:'fail',
            message: 'Invalid Id'
        });
    }
    next();
};

exports.checkBody=(req, res, next)=>{
    if(!req.body.name||!req.body.price){
        return res.status(404).json({
            status:'fail',
            message: 'Missing name or price'
        });
    }
    next();
};
//#endregion


//#region Tour
/**Retorna todos la data tours */
exports.getAllTours=(req,res)=>{    
    console.log(req.requestTime);
    res.status(200).json({
        status:'success',
        requestedAt:req.requestTime,
        results: tours.length,
        data:{
            tours
        }
    })
};
/**Retorna un tour especifico (param: id) */
exports.getTour=(req,res)=>{
     
    //console.log(req.params);
    const id= req.params.id*1;
    const tour= tours.find(el=> el.id=== id);
    if(!tour){
        return res.status(404).json({status: 'fail',
        message: 'Invalid Id'
    });
    }
    if(id>tours.length){
        return res.status(404).json({status: 'fail',
        message: 'Invalid Id'
        })
    }
    res.status(200).json({
        status:'success',        
         data:{
             tour
         }
})
};

/**Crea un tour*/
exports.CreateTour=(req,res)=>{
    console.log(req.body);
    const newId=tours[tours.length-1].id+1;
    const newTour=Object.assign({id: newId},req.body);
    //agrega el nuevo objeto
    tours.push(newTour);
    fs.writeFile(`./dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        
        res.status(201).json({
            status:'success', 
            data:{ 
                tour:newTour
             }
        })
    })

};

/**Actualiza un tour (param: id)*/
exports.UpdateTours=(req,res)=>{
 
    console.log(req.params);
    const id= req.params.id*1;
    const tour= tours.find(el=> el.id=== id);
    if(!tour){
        return res.status(404).json({status: 'fail',
        message: 'Invalid Id'
    });
    }
    if(id>tours.length){
        return res.status(404).json({status: 'fail',
        message: 'Invalid Id'
        })
    }
    res.status(200).json({
        status:'success',
        data:{
            tour:'<Update tour here . . .>'
        }
})
};

/**Elimina un tour (param: id)*/
exports.DeleteTour=(req,res)=>{ 
    console.log(req.params);
    const id= req.params.id*1;
    const tour= tours.find(el=> el.id=== id);
    if(!tour){
        return res.status(404).json({status: 'fail',
        message: 'Invalid Id'
    });
    }
    if(id>tours.length){
        return res.status(404).json({status: 'fail',
        message: 'Invalid Id'
        })
    }
    res.status(204).json({
        status:'success',
        data:null
})
};
//#endregion

