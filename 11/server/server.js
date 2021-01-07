const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose')

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
})
app.listen(port,()=>{
    console.log(`started on port ${port}`)
})