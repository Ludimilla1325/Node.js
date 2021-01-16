const express = require('express');
const formidable = require ('express-formidable');
const hbs = require('express-handlebars');
const cloudinary = require('cloudinary');
const path = require('path'); //dont need to install
const bodyParser = require('body-parser');
const multer = require ('multer');
const port = process.env.PORT || 3002;

cloudinary.config({ 
    cloud_name: 'dapmwtpyj', 
    api_key: '617555437968635', 
    api_secret: 'vfvwW0VknMASaKbtJ9t6u5klxXQ' 
  });

const app = express();

////######### HBS SETUP ############/////
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(formidable({
    multiples:true
}))

// GET
app.get('/', (req, res) => {
    res.render('home')
});

//POST
app.post('/api/uploads',(req, res) =>{
    
    console.log(req.fields);
    console.log(req.files);
    res.status(200).send('ok');
})

app.listen(port,()=>{
    console.log(`Started on port ${port}`)
});