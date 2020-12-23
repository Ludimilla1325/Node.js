const {MongoClient} = require('mongodb');
const URL ='mongodb://localhost:27017/test';
// const url = 'mongodb://localhost:27017/test';

// const client = new MongoClient(url, {useUnifiedTopology: true});


// MongoClient.connect(URL,(err,db)=>{
//     if(err){
//         console.log('Error')
//     }

//     console.log('connected to test')
//     db.close(); //close the connection we just open
// })

// MongoClient.connect(URL,(err,db)=>{

    // db.collection('Cars').insertOne({
    //     _id:45,
    //     model:"Ford",
    //     year:2017
    // },(err,res)=>{
    //     if (err) {
    //         return console.log(`Cannot insert: ${err}`)
    //     }
    //     console.log(res.ops)
//     })
//     console.log('connected to test')
//     db.close(); //close the connection we just open
// })

// 

// MongoClient.connect(URL,(err,db)=>{

    // const cars = [
    //     {model:"chevy", year:2017},
    //     {model:"nissan", year:2018},
    //     {model:"ferrari", year:2000},
    //     {model:"audi", year:1998},
    // ];


    // db.collection("Cars").insertMany(cars,(err,res) =>{
    //     if(err){
    //         return console.log(`Cannot insert: ${err}`)
    //     }
    //     console.log(res.ops) 
    // })

//     console.log('connected to test')
//     db.close(); //close the connection we just open
// })


// 

//Find return all the documents
// MongoClient.connect(URL,(err,db)=>{
    
//      //db.collection("Cars").find().skip(1).limit(1).toArray((err,docs)=>{
//         db.collection("Cars").find({year:2000}).toArray((err,docs)=>{
//     if(err){
//             return console.log(`Cannot get: ${err}`)
//         };
        
//         console.log(docs)
//     })
    

//     console.log('connected to test')
//     db.close(); //close the connection we just open
// })

// MongoClient.connect(URL,(err,db)=>{
    
//     db.collection("Cars").findOne({year:2000},{model:0,_id:0},(err,doc)=>{
//         console.log(doc)
//     })
//    console.log('connected to test')
//    db.close(); //close the connection we just open
// })

// MongoClient.connect(URL,(err,db)=>{
    //DELETE MANY

    // db.collection("Cars").deleteMany({year:2000},(err,doc)=>{
    //     console.log(doc)
    // })

    // db.collection("Cars").deleteMany({year:1998}).then((result)=>{
    //     console.log(result)
    // })

    //DELETE ONE

    // db.collection("Cars").deleteOne({model:"nissan"},(err,doc)=>{
    //     console.log(doc)
    // })

    // db.collection("Cars").findOneAndDelete({year:1998},(err,doc)=>{
    //     console.log(doc)
    // })


//    console.log('connected to test')
//    db.close(); //close the connection we just open
// })

//UPDATE

MongoClient.connect(URL,(err,db)=>{

    db.collection("Cars").findOneAndUpdate({
//find
        model:"nissan"
    },{
//Update
        // $set:{
        //     year:1001
        // }
    $inc:{
        year:+2
    }
    },{
//Options
       // returnOriginal:false, //true= mostrará o original e não o update
        upsert:true
    },(err,doc)=>{
        console.log(doc)
    })
console.log('connected to test')
db.close(); //close the connection we just open
})