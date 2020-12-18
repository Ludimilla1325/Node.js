const express = require ('express');
const hbs= require('express-handlebars');
const bodyParser= require('body-parser');
const fetch = require ('node-fetch');
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

//GET
app.get('/',(req, res) =>{
    res.render('home')
})
app.get('/add_note',(req,res)=>{
    res.render('add_note')
})


//POST 
//jsonParse gonna take the information and give it back to us
app.post('/api/add_note',jsonParse,(req,res) =>{
 
   fetch('http://localhost:3004/messages',{
   method:'POST',  
   body:JSON.stringify(req.body),
   headers:{
       'Content-Type':'aplication/json'
   }  
   }).then((response)=>{ //Para ver se está funcionando, podemos enviar uma response para o webserver
    res.status(200).send()
   })
   console.log(req.body)
})

//Setting up server
const port = process.env.PORT || 3001;
app.listen(port,() =>{
    console.log(`server up on port ${port}`)
})