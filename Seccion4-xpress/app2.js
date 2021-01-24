 //Require zone
 const fs = require('fs');
 const express= require('express');
 
 /**Se crea el servidor */
 const app= express();
 
 //Esta linea se usa para parcear una solicitud que contiene datos en formato json
 app.use(express.json());
 
 //Uso funciones middleware, quye se ejecutan en los llamados de route
 app.use((req,res,next) => {
     console.log("Hello from middleware");
     next();
 });

 app.use((req,res,next) => {
     req.requestTime = new Date().toString();    
    next();
});

 
  /**Se realiza lectura data tours */
 const tours= JSON.parse(  
     fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
 );
 
    /**Funciones para callback http verbs */

/**Retorna todos la data tours */
const getAllTours=(req,res)=>{    
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
const getTour=(req,res)=>{
     
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
             tour
         }
})
};

/**Crea un tour*/
const CreateTour=(req,res)=>{
    console.log(req.body);
    const newId=tours[tours.length-1].id+1;
    const newTour=Object.assign({id: newId},req.body);
    //agrega el nuevo objeto
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        
        res.status(201).json({
            status:'success',
            data:{ 
                tour:newTour
             }
        })
    })

};

/**Actualiza un tour (param: id)*/
const UpdateTours=(req,res)=>{
 
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
const DeleteTour=(req,res)=>{ 
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


//#region HTTP Verbs require
 //app.get('/api/v1/tours',getAllTours);  
 app.get('/api/v1/tours/:id',getTour); 
 //app.post('/api/v1/tours',CreateTour);
 //app.patch('/api/v1/tours/:id',UpdateTours);
 //app.delete('/api/v1/tours/:id',DeleteTour);
 //#endregion

 //Forma de exponer los verbos del api con route
app.route('/api/v1/tours')
.get(getAllTours)
.post(CreateTour);

app.route('/api/v1/tours/:id')
.get(getTour)
.patch(UpdateTours)
.delete(DeleteTour);

 /**Puerto de escucha del servidor */
 const port=3000;
 
 /**Instancia expuesta */
 app.listen(port,() => {
     console.log(`App running on port: ${port} ...`);
 })
 