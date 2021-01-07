const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');

const app= express();
const port = process.env.PORT || 3000;

//DB

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth')

//Require the module
const {User} = require('./models/user');
app.use(bodyParser.json());

//POST
app.post('/api/user',(req,res)=>{

    const user = new User ({
        email:req.body.email,
        password:req.body.password
    });
    user.save((err,doc)=>{
        if(err) res.status(400).send(err); // err-retorna se há algum erro; doc- retorna o body 
        res.status(200).send(doc)
    })
});

//To check if email is in database or not
app.post('/api/user/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) res.json({message:'Auth failed. User not found'});
    //res.status(200).send(user)

    bcrypt.compare(req.body.password,user.password, (err,isMatch) =>{ //arguments : 1- passowrd user is passing,2- Hash password, 3- callback(err,isMatch{boolean})
        if (err) throw err;
        if (!isMatch){
            res.json({message:'Password is not matching'});
        } else {
            res.status(200).send(isMatch)
        }
    }) 
    })
})


app.listen(port,()=>{
    console.log(`started on port ${port}`)
})