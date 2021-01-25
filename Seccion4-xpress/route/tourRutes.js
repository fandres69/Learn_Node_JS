const express = require('express');
//const fs = require('fs');
/**Se llama el controlador que contiene la lógica de los respectivos headers HTTP */
const tourController=require('../controllers/tourController');

/**Se realiza lectura data tours */
//const tours= JSON.parse(  
//fs.readFileSync(`./dev-data/data/tours-simple.json`)
//);
//#region Tour
/**Retorna todos la data tours */
// const getAllTours=(req,res)=>{    
//     console.log(req.requestTime);
//     res.status(200).json({
//         status:'success',
//         requestedAt:req.requestTime,
//         results: tours.length,
//         data:{
//             tours
//         }
//     })
// };

// /**Retorna un tour especifico (param: id) */
// const getTour=(req,res)=>{
     
//     console.log(req.params);
//     const id= req.params.id*1;
//     const tour= tours.find(el=> el.id=== id);
//     if(!tour){
//         return res.status(404).json({status: 'fail',
//         message: 'Invalid Id'
//     });
//     }
//     if(id>tours.length){
//         return res.status(404).json({status: 'fail',
//         message: 'Invalid Id'
//         })
//     }
//     res.status(200).json({
//         status:'success',        
//          data:{
//              tour
//          }
// })
// };

// /**Crea un tour*/
// const CreateTour=(req,res)=>{
//     console.log(req.body);
//     const newId=tours[tours.length-1].id+1;
//     const newTour=Object.assign({id: newId},req.body);
//     //agrega el nuevo objeto
//     tours.push(newTour);
//     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        
//         res.status(201).json({
//             status:'success',
//             data:{ 
//                 tour:newTour
//              }
//         })
//     })

// };

// /**Actualiza un tour (param: id)*/
// const UpdateTours=(req,res)=>{
 
//     console.log(req.params);
//     const id= req.params.id*1;
//     const tour= tours.find(el=> el.id=== id);
//     if(!tour){
//         return res.status(404).json({status: 'fail',
//         message: 'Invalid Id'
//     });
//     }
//     if(id>tours.length){
//         return res.status(404).json({status: 'fail',
//         message: 'Invalid Id'
//         })
//     }
//     res.status(200).json({
//         status:'success',
//         data:{
//             tour:'<Update tour here . . .>'
//         }
// })
// };

// /**Elimina un tour (param: id)*/
// const DeleteTour=(req,res)=>{ 
//     console.log(req.params);
//     const id= req.params.id*1;
//     const tour= tours.find(el=> el.id=== id);
//     if(!tour){
//         return res.status(404).json({status: 'fail',
//         message: 'Invalid Id'
//     });
//     }
//     if(id>tours.length){
//         return res.status(404).json({status: 'fail',
//         message: 'Invalid Id'
//         })
//     }
//     res.status(204).json({
//         status:'success',
//         data:null
// })
// };
//#endregion

const router= express.Router(); 

//middleware for route request
router.param('id',tourController.checkTourId);
router
.route('/')
.get(tourController.getAllTours)
.post(tourController.checkBody,tourController.CreateTour);

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.UpdateTours)
.delete(tourController.DeleteTour);

module.exports = router

