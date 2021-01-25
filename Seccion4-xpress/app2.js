/**en app3 se migran las rutas a módulos externos */

//Require zone
 const fs = require('fs');
 const express= require('express');
 const morgan= require('morgan');


 /**Se crea el servidor */
 const app= express();
 
 //Esta linea se usa para parcear una solicitud que contiene datos en formato json
 app.use(express.json());
 

 //Uso funciones middleware, que se ejecutan en los llamados de route

 //Este middleware imprime las peticiones y el tiempo de respuesta del api
 //muy util para registros
 app.use(morgan('dev'));

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
 const userData=JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
 );
 
//Funciones para callback http verbs

//#region Tour
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
//#endregion
//#region Users
const getAllUsers=(req,res)=>{    
    console.log(req.requestTime);
    res.status(200).json({
        status:'success',
        requestedAt:req.requestTime,
        results: userData.length,
        data:{
            userData
        }
    })
};

/**Retorna un usuario especifico (param: id) */
const getUser=(req,res)=>{
     
    console.log(req.params);
    const id= req.params.id*1;
    const user= userData.find(el=> el._id=== id);
    if(!user){
        return res.status(404).json({status: 'fail',
        message: 'Invalid Id'
    });
    }
    if(id>userData.length){
        return res.status(404).json({status: 'fail',
        message: 'Invalid Id'
        })
    }
    res.status(200).json({
        status:'success',        
         data:{
             user
         }
})
};

/**Crea un user*/
const createUser=(req,res)=>{
    console.log(req.body);
    const newId=userData[userData.length-1]._id+1;
    const newUser=Object.assign({_id: newId},req.body);
    //agrega el nuevo objeto
    userData.push(newUser);
    fs.writeFile(`${__dirname}/dev-data/data/users.json`,JSON.stringify(userData),err=>{
        
        res.status(201).json({
            status:'success',
            data:{ 
                user:newUser
             }
        })
    })

};

/**Actualiza un user (param: id)*/
const updateUser=(req,res)=>{
 
    console.log(req.params);
    const id= req.params.id*1;
    const user= userData.find(el=> el._id=== id);
    if(!user){
        return res.status(404).json({status: 'fail',
        message: 'Invalid Id'
    });
    }
    if(id>userData.length){
        return res.status(404).json({status: 'fail',
        message: 'Invalid Id'
        })
    }
    res.status(200).json({
        status:'success',
        data:{
            user:'<Update tour here . . .>'
        }
})
};

/**Elimina un tour (param: id)*/
const deleteUser=(req,res)=>{ 
    console.log(req.params);
    const id= req.params.id*1;
    const user= userData.find(el=> el._id=== id);
    if(!user){
        return res.status(404).json({status: 'fail',
        message: 'Invalid Id'
    });
    }
    if(id>userData.length){
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
//#region Route tours app.route
// app.route('/api/v1/tours')
// .get(getAllTours)
// .post(CreateTour);

// app.route('/api/v1/tours/:id')
// .get(getTour)
// .patch(UpdateTours)
// .delete(DeleteTour);

// //Route users

// app.route('/api/v1/users')
// .get(getAllUsers)
// .post(createUser);

// app.route('/api/v1/users/:id')
// .get(getUser)
// .patch(updateUser)
// .delete(deleteUser);
//#endregion
//#region Rutas con middleware

//Se crea un objeto express Route para declarar las rutas
//sobre la cual trabajara el api asi:

//rutas Tour
const tourRute= express.Router();
tourRute
.route('/')
.get(getAllTours)
.post(CreateTour);

tourRute
.route('/:id')
.get(getTour)
.patch(UpdateTours)
.delete(DeleteTour);

//rutas users
const usersRute= express.Router();
usersRute
.route('/')
.get(getAllUsers)
.post(createUser);

usersRute
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);


//llamado

app.use('/api/v1/tours',tourRute);
app.use('/api/v1/users',usersRute);
//#endregion


//start server
 /**Puerto de escucha del servidor */
 const port=3000;
 
 /**Instancia expuesta */
 app.listen(port,() => {
     console.log(`App running on port: ${port} ...`);
 })
 