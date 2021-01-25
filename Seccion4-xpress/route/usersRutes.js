const express = require('express');
//const fs = require('fs');
/**Se llama el controlador que contiene la lógica de los respectivos headers HTTP */
const userController = require('../controllers/userController');


// const userData=JSON.parse(
// fs.readFileSync(`./dev-data/data/users.json`)
// );
 
//#region Users
// const getAllUsers=(req,res)=>{    
//     console.log(req.requestTime);
//     res.status(200).json({
//         status:'success',
//         requestedAt:req.requestTime,
//         results: userData.length,
//         data:{
//             userData
//         }
//     })
// };
// /**Retorna un usuario especifico (param: id) */
// const getUser=(req,res)=>{
     
//     console.log(req.params);
//     const id= req.params.id*1;
//     const user= userData.find(el=> el._id=== id);
//     if(!user){
//         return res.status(404).json({status: 'fail',
//         message: 'Invalid Id'
//     });
//     }
//     if(id>userData.length){
//         return res.status(404).json({status: 'fail',
//         message: 'Invalid Id'
//         })
//     }
//     res.status(200).json({
//         status:'success',        
//          data:{
//              user
//          }
// })
// };

// /**Crea un user*/
// const createUser=(req,res)=>{
//     console.log(req.body);
//     const newId=userData[userData.length-1]._id+1;
//     const newUser=Object.assign({_id: newId},req.body);
//     //agrega el nuevo objeto
//     userData.push(newUser);
//     fs.writeFile(`${__dirname}/dev-data/data/users.json`,JSON.stringify(userData),err=>{
        
//         res.status(201).json({
//             status:'success',
//             data:{ 
//                 user:newUser
//              }
//         })
//     })

// };

// /**Actualiza un user (param: id)*/
// const updateUser=(req,res)=>{
 
//     console.log(req.params);
//     const id= req.params.id*1;
//     const user= userData.find(el=> el._id=== id);
//     if(!user){
//         return res.status(404).json({status: 'fail',
//         message: 'Invalid Id'
//     });
//     }
//     if(id>userData.length){
//         return res.status(404).json({status: 'fail',
//         message: 'Invalid Id'
//         })
//     }
//     res.status(200).json({
//         status:'success',
//         data:{
//             user:'<Update tour here . . .>'
//         }
// })
// };

// /**Elimina un tour (param: id)*/
// const deleteUser=(req,res)=>{ 
//     console.log(req.params);
//     const id= req.params.id*1;
//     const user= userData.find(el=> el._id=== id);
//     if(!user){
//         return res.status(404).json({status: 'fail',
//         message: 'Invalid Id'
//     });
//     }
//     if(id>userData.length){
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

//rutas users
const router= express.Router();
router
.route('/')
.get(userController.getAllUsers)
.post(userController.createUser);

router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router