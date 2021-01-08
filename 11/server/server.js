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
        //res.status(200).send(doc)
        user.generateToken((err,user)=>{
            if(err) res.status(400).send(err);
            res.header('x-token', user.token).send(user)
        })
    })
});

//To check if email is in database or not
app.post('/api/user/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{ //user has all the methods we r using in schema
        if(!user) res.json({message:'Auth failed. User not found'});
    //res.status(200).send(user)

    // bcrypt.compare(req.body.password,user.password, (err,isMatch) =>{ //arguments : 1- passowrd user is passing,2- Hash password, 3- callback(err,isMatch{boolean})
    //     if (err) throw err;
    //     if (!isMatch){
    //         res.json({message:'Password is not matching'});
    //     } else {
    //         res.status(200).send(isMatch)
    //     }
    // }) 

    user.comparePassword(req.body.password,function(err,isMatch){
        if (err) throw err;
        if (!isMatch) return res.json({message:'wrong password'})

        user.generateToken((err,user)=>{
            res.header('x-token',user.token).send(user)    // to set a custom header, use use "x-name" , 2nd argument is the contetnts of this header
        })

    })
    })
})

//GET
app.get('/user/profile',(req,res)=>{
    //res.status(200).send('working')
    const token = req.header('x-token');

    User.findByToken(token,(err,user)=>{
        if (err) throw err;
        if(!user) return res .status(400).send()

        res.status(200).send(user) // in real life we dont send back the user data 
    })
})

app.listen(port,()=>{
    console.log(`started on port ${port}`)
})