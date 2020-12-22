const express = require ('express');
const hbs= require('express-handlebars');
const bodyParser= require('body-parser');
const fetch = require ('node-fetch');
const { response } = require('express');
const app=express();

//########## HBS SETUP ######
app.engine('hbs',hbs({
    extname:'hbs',
    defaultLayout:'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs')

//CSS
app.use("/css", express.static(__dirname + '/public/css'))
const jsonParse = bodyParser.json();

//GET - irá mostrar na tela os notes
app.get('/',(req, res) =>{
   
    fetch ('http://localhost:3000/messages')
        .then(response =>{
            response.json().then(json =>{
                res.render('home', {
                    articles:json
                })
            })
        })
        .catch(error => {
            console.log(error)
        }) 
})
app.get('/add_note',(req,res)=>{
    res.render('add_note')
})

//EDIT NOTE
app.get(`/edit_note/:id`,(req,res) =>{
   // console.log("hello",(req.params.id))
    fetch(`http://localhost:3000/messages/${req.params.id}`)
        .then(response =>{
            response.json().then(json =>{
                res.render('edit_note',{
                    articles: json
                })
            })
        })
})

//POST 
//jsonParse gonna take the information and give it back to us
app.post('/api/add_note',jsonParse,(req,res) =>{

    fetch('http://localhost:3000/messages',{
        method:'POST',  
        body:JSON.stringify(req.body),
        headers:{
            'Content-Type':'application/json'
        }  
    }).then((response)=>{ //Para ver se está funcionando, podemos enviar uma response para o webserver
       console.log(response)
        // res.status(200).send()
    })
})


//DELETE
app.delete('/api/delete/:id',(req,res)=>{
   // console.log(req.params.id)
   const id = req.params.id
   fetch(`http://localhost:3000/messages/${id}`,{
       method:'DELETE'
   }).then( response =>{
        res.status(200).send();
   })
}) 

//UPDATE
app.patch(`/api/edit_note/:id`,jsonParse,(req,res)=>{
    const id = req.params.id;
//The Fetch API is a simple interface for fetching resources. Fetch makes it easier to make web requests and handle responses than with the older
    fetch(`http://localhost:3000/messages/${id}`,{
        method:'PATCH',
        body:JSON.stringify(req.body), 
        //The JSON. stringify() method converts a JavaScript object or value to a JSON string
        headers:{
            'Content-Type':'application/json'
        }
    }).then(response=>{
        res.status(200).send();
    })
})

//Setting up server
const port = process.env.PORT || 3002;
app.listen(port,() =>{
    console.log(`server up on port ${port}`)
})