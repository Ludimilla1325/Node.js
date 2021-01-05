const express = require ('express');
const bodyParser = require('body-parser');

const app= express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json())
//DB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/book_db');

const {Book} = require('./models/books');
const {Store} = require ('./models/stores');

//ROUTE LISTEN TO THE POST REQUEST
app.post('/api/add/store',(req,res)=>{
    // console.log('Getting a post req');
    // console.log(req.body)

    const store = new Store({
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone
    });

    store.save((err,doc)=>{
        if(err) res.status(400).send(err);
        res.status(200);
    })
});

app.post('/api/add/books',(req,res)=>{
    const book =  new Book({
        name:req.body.name,
        author:req.body.author,
        pages:req.body.pages,
        price:req.body.price,
        stores:req.body.stores,
    });
    book.save((err,doc)=>{
        if(err) res.status(400).send(err);
        res.status(200);
    })
})

//GET
app.get('/api/stores',(req,res)=>{
    //console.log(req.body)

    Store.find((err,doc)=>{
        if(err) res.status(400).send(err);
        res.send(doc)
    })
})

app.get('/api/books',(req,res)=>{
    
    Book.find((err,doc)=>{
        if(err) res.status(400).send(err);
        res.send(doc)
    })
})

const port= process.env.PORT || 3005;
app.listen(port,()=>{
    console.log(`Started at port ${port}`)
})