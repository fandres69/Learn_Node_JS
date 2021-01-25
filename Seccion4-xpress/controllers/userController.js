const fs = require('fs');

const userData=JSON.parse(
fs.readFileSync(`./dev-data/data/users.json`)
);
 
//#region Users
exports.getAllUsers=(req,res)=>{    
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
exports.getUser=(req,res)=>{
     
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
exports.createUser=(req,res)=>{
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
exports.updateUser=(req,res)=>{
 
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
exports.deleteUser=(req,res)=>{ 
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
//#endregion
