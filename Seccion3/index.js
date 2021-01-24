const fs= require('fs');
const superagent= require('superagent');

const readFilePro= file=>{
    return new Promise((resolve, reject) =>{
        fs.readFile(file,(err, data) =>{
            if(err) reject('No se encuentra el archivo');
            resolve(data);
        });
    });
};

const writeFilePro =(file,data)=>{
    return new Promise((resolve, reject) =>{
        fs.writeFile(file, data, err =>{
            if(err) reject('No se pudo escribir el archivo');
            resolve('Success');
        });
    });
};

//#region Uso de async / await 2
const getDogPic= async ()=>{

    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res= await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        //Se crean 3 promesas mas
        const res1Pro=  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro=  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro=  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        //Se agrupan todas las respuestas en un array de promesas
        const all=await Promise.all([res1Pro,res2Pro,res3Pro]);

        //console.log(all);
        const img= all.map(el=>el.body.message); //se muestran las respuestas obtenidas (urls)
        console.log(img);
        console.log(res.body.message);

        await writeFilePro(`${__dirname}/dog-img.txt`,img.join('\n'));//Se escriben las url obtenidas en el
        console.log('Random dog image save to file');
    } catch (err) {
        console.log(err);
       throw err;
    }
    return '2: Ready dog';
};

//llamado a métodos async / await donde se llama una función que retorna una promesa

(async()=>{
    try {
        console.log('1: Will get dog pics');
        const x = await getDogPic();
        console.log(x);
        console.log('3: done getting dog pics');
    } catch (err) {
        console.log('2: Not ready dog');
    }
})();


//#endregion


//#region Uso de promesas async/await

/**Modelo de creación de una función async */
// const getDogPic= async ()=>{

//     try {
//         const data = await readFilePro(`${__dirname}/dogg.txt`);
//         console.log(`Breed: ${data}`);

//         const res= await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//         console.log(res.body.message);

//         await writeFilePro(`${__dirname}/dog-img.txt`,res.body.message);
//         console.log('Random dog image save to file');
//     } catch (err) {
//         console.log(err);
//        throw err;
//     }
//     return '2: Ready dog';
// };

// console.log('1: Will get dog pics');
// getDogPic().then(x=>{
//     console.log(x);
//     console.log('3: done getting dog pics');
// })
// .catch(err =>{
//     console.log('2: Not ready dog');
// });
 

//#endregion

//#region Promesas 3
/**Uso de promesas anidadas
 * 
 * Las promesas son bloques de código que una vez ejecutadas retornan un valor
 * o un error el cual se puede capturar y devolver, sin romper la ejecución del código
 * 
 */

// const readFilePro= file=>{
//     return new Promise((resolve, reject) =>{
//         fs.readFile(file,(err, data) =>{
//             if(err) reject('No se encuentra el archivo');
//             resolve(data);
//         });
//     });
// };
// const writeFilePro =(file,data)=>{
//     return new Promise((resolve, reject) =>{
//         fs.writeFile(file, data, err =>{
//             if(err) reject('No se pudo escribir el archivo');
//             resolve('Success');
//         });
//     });
// };

// readFilePro(`${__dirname}/dog.txt`)
// .then(data=>{
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
// })
// .then(res=>{
//     console.log(res.body.message);
//     return writeFilePro(`${__dirname}/dog-img.txt`,res.body.message);
// })
// .then(()=>{
//     console.log('Random dog image save to file');
// })
// .catch(err=>{
//     console.log(err);
// })


//#endregion
//#region Promesas 1 y 2


/**En este fragmento se consume un api donde retorna la url de la imagen de un
 * perro, cuyo nombre esta escrito en el archivo dog.txt, y el valor retornado 
 * es almacenado en el archivo dog-img.txt
 */
// fs.readFile(`${__dirname}/dog.txt`,(err,data)=>{
//     //console.log(`Breed: ${data}`);

//     //Forma 1
//     // superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     // .end((err ,res) =>{
//     //     if(err) console.log(err.message);
//     //     console.log(res.body);

//     //     fs.writeFile("dog-img.txt",res.body.message,err =>{
//     //         if(err) console.log(err.message);
//     //         console.log("Random dog Save to file");
//     //     });
//     // });
//     //Forma 2 se espera a que el proceso termine
//     // superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     // .then(res =>{
//     //     if(err) console.log(err.message);
//     //     console.log(res.body);

//     //     fs.writeFile("dog-img.txt",res.body.message,err =>{
//     //         if(err) console.log(err.message);
//     //         console.log("Random dog Save to file");
//     //     });
//     // }).catch(err=>{
//     //     console.log(err.message);
//     // });
    

// });


//#endregion
