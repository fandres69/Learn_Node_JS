# para crear una base de datos

* se ejecuta el comando 
>mongo

* se crea el esquema use {nombre esquema}
>use learn-node

* se crea una tabla con un registro db.{tabla}.insertMany({key:value,key:value}) cuando se insertan varios registros o db.{tabla}.insertOne({key:value,key:value}) para un solo registro
>db.tours.insertOne({name:"The Forest Hiker", price:297,rating:4.7})
 
* Al ejecutar el código anterior nos devolverá un mensaje como este
    ```
    {
            "acknowledged" : true,
            "insertedId" : ObjectId "600e3f053a01b536199c2122")
    }
    ```

* Para realizar una consulta se puede hacer con la función find db.{tabla}.find() o argumento find db.{tabla}.find({key:val})
>db.tours.find()
>db.tours.find({difficulty:"easy"})
>db.tours.find({price:{$lte:500}})
>db.tours.find({price:{$lt:500}})

## Inserción data de ejercicio
>db.tours.insertMany([{name:"The Sea Explorer", price:497,rating:4.8},{name:"The Snow Adventure", price:997,rating:4.9,difficulty:"easy"}])

## Update data
>db.tours.updateOne({name:"The Snow Adventure"},{$set:{price:597}});
   


# Password instancia Mongo nube

User: fatobonq
password: KtnUqHcvlHBdEkgq

## Conexión aplicación ##
mongodb+srv://fatobonq:KtnUqHcvlHBdEkgq@cluster0.8byti.mongodb.net/test


## Conexión mongoshell ##
mongo "mongodb+srv://cluster0.8byti.mongodb.net/Cloud-Learn-node" --username fatobonq

<!-- ## Conexión Aplicación propia ## -->
mongodb+srv://fatobonq:<password>@cluster0.8byti.mongodb.net/<dbname>?retryWrites=true&w=majority