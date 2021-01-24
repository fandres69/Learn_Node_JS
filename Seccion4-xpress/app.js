/**Ejemplo de uso de express framework */
/**
 * En las apis REST solo se usan verbos http para manejar el CRUD de la data
 * 
 * add --> POST --> Crear
 * get --> GET --> read
 * Update --> PUT / PATCH--> update (PUT se enviá el objeto completo, PATCH solo parte del mismo)
 * delete --> DELETE --> delete 
 * 
 */ 

 //Require zone
const fs = require('fs');
const express= require('express');

/**Se crea el servidor */
const app= express();

//Esta linea se usa para parcear una solicitud que contiene datos en formato json
app.use(express.json());


 /**Se realiza lectura data tours */
const tours= JSON.parse(
 
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/**Url API expuesta 
 * Se requiere todos los objetos tour
*/
app.get('/api/v1/tours',(req,res)=>{
   
    res.status(200).json({
        status:'success',
        results: tours.length,
        data:{
            tours
        }
})
});

/**Para extraer el valor de una variable se debe escribir
 *  "/:" seguido del nombre de la variable a capturar
 * por ejemplo /:id, cuando un parámetro es opcional se debe poner "?"
 * al final por ejemplo /:y?
 * 
 * /api/v1/tours/:id/:x/:y?
*/
app.get('/api/v1/tours/:id',(req,res)=>{
    
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
});

//Creación de un tour
app.post('/api/v1/tours',(req,res)=>{
    //console.log(req.body);
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

});

app.patch('/api/v1/tours/:id',(req,res)=>{

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
});

app.delete('/api/v1/tours/:id',(req,res)=>{

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
})




/**Respuesta a solicitudes GET */
// app.get('/',(req,res) => {
    
//     //Respuesta simple
//     //res.status(200).send('Hello from the server side');

//     //Respuesta json
//     res.status(200).json({ message:'Hello from the server side',
//     app:'express-learn'
//     });
// });

/**Respuesta a solicitudes Post */
// app.post('/',(req,res) => { 
//     res.send('this is a Post methods');
// })

/**Puerto de escucha del servidor */
const port=3000;

/**Instancia expuesta */
app.listen(port,() => {
    console.log(`App running on port: ${port} ...`);
})
