class APIFeatures{
    constructor(query,queryString){ 
        this.query=query;
        this.queryString=queryString;
    };

    filter(){
        const queryObj={...this.queryString};
        const excludeFields=['page','sort','limit','fields'];
        excludeFields.forEach(el=>delete queryObj[el]);
        let queryString=JSON.stringify(queryObj);
        queryString= queryString.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`);
        console.log(JSON.parse(queryString));        
        //let query= Tour.find(JSON.parse(queryString));
        this.query.find(JSON.parse(queryString));
        return this;
    }

    sort(){
        if(this.queryString.sort){
            const sorBy=this.queryString.sort.split(',').join(' ');             
            this.query=this.query.sort(sorBy);           
        }else{
            this.query=this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields(){
        if (this.queryString.fields) {
            //devuelve solo los fields solicitados
            const fields= this.queryString.fields.split(',').join(' ');
            this.query=this.query.select(fields);
        }else{
            this.query=this.query.select('-__v');
        }
        return this;
    }

    paginate(){
        const page=this.queryString.page * 1 || 1;
        const limit=this.queryString.limit * 1 || 100;
        const skip=(page - 1)* limit;       

        this.query=this.query.skip(skip).limit(limit);

        // if(this.queryString.page){
        //     const numTours=await Tour.countDocuments();           
        //     if(skip>=numTours) throw new Error('This page does not exists');
        // }
        return this;
    }

}
module.exports =APIFeatures;