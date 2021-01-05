const mongoose =  require('mongoose');
mongoose.Promise =  global.Promise;
mongoose.connect('mongodb://localhost:27017/App');

 carSchema = mongoose.Schema({
     brand:String,
     model:String,
     year:Number,
     avail:Boolean
 });

 const Car = mongoose.model('Car', carSchema) //primeiro argumento-nome, segundo o Schema

//  const addCar = new Car({
//      brand:"Ford",
//      model:"Focus",
//      year:2000,
//      avail:true
//  })
//  //STORE DATA

//  addCar.save((err,doc)=>{
//      if(err) return console.log(err);
     
//      console.log(doc)
//  })

//GETING DATA - FIND, FINDONE, FINDID

    //FIND- pode se obter um elemento ou vários
// Car.find({brand:"Nissan"},(err,doc)=>{ //no lugar de brand pode ser qualquer outro argumento, como _id
//     if (err) return console.log(err)
//     console.log(doc)
// })

//FINDONE- sempre responde um elemento, se houver dois elementos, será dado o primeiro
// Car.findOne({brand:"Ford"},(err,doc)=>{
//     if (err) return console.log(err)
//     console.log(doc)
// })

//FINDBYID- Pega o documento pelo o id
// Car.findById("5fe48d58053fa54ad421caf9",(err,doc)=>{
//     if (err) return console.log(err)
//     console.log(doc)
// })



//REMOVING DATA- findOneAndRemove

// Car.findOneAndRemove({brand:"Nissan"},(err,doc)=>{
//     if (err) return console.log(err)
//     console.log(doc)
// })

//findByIdAndRemove
// Car.findByIdAndRemove("5fe48d58053fa54ad421caf9",(err,doc)=>{
//     if (err) return console.log(err)
//     console.log(doc)
// })

//REMOVE- can delete a lot of entrance at once
// Car.remove({brand:"Ford"},(err,doc)=>{ //{}se colocar isso, apagará tudo!
//     if (err) return console.log(err)
//     console.log(doc)
// })

//UPDATING DATA -update

// Car.update({_id:"5fe497c7c868c3c8cdbb086e"},{
//     $set:{
//         year:2018
//     }
// },(err,doc)=>{
//     if (err) return console.log(err)
//     console.log(doc)
// })


    // findByIdAndUpdate- the 3rd argument is not the callback, it will be with some options
// Car.findByIdAndUpdate("5fe497c7c868c3c8cdbb086e",{ //Não precisa passar apenas o ID, pode ser outro como brand
//     $set:{
//         model:"abc" 
//     }
// },{
//     new:false //true- update false- origin
// },(err,doc)=>{
//     if (err) return console.log(err)
//     console.log(doc)
// })

Car.findById("5fe497c7c868c3c8cdbb086e",(err,car)=>{
    if (err) return console.log(err);
   // console.log(car)

   car.set({
       brand:"whatever"
   })
   car.save((err,doc)=>{
    if (err) return console.log(err);
    console.log(doc) 
   })
})
