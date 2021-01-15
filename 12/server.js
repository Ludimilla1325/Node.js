const express = require('express');
const hbs = require('express-handlebars');
const path = require('path'); //dont need to install
const bodyParser = require('body-parser');
const multer = require ('multer');
const port = process.env.PORT || 3002;

const app = express();

////######### HBS SETUP ############/////
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());

// GET
app.get('/', (req, res) => {
    res.render('home')
});

//Configuration - 1- destine , 2- single file


app.post('/api/uploads',(req, res) =>{

    const upload = multer({
        dest:'uploads/',
        limits:{fileSize:500000000},
        fileFilter:(req,file,cb)=>{
            //console.log(file)
            const ext = path.extname(file.originalname)
            if(ext !== '.jpg' && ext !=='.png'){
                return cb(res.status(400).end('only jpg is allowed'), false);
            }
            //console.log(ext)
            
      
            cb(null,true)

        }
    
    }).array('image',10); //the 2nd argument is the amount

   upload(req,res,function(err){
    console.log(req.body)
       if(err){
           return res.status(400).end('Error')
        }
        res.end('file uploaded')
   })
    // res.status(200).send('ok');
})


app.listen(port,()=>{
    console.log(`Started on port ${port}`)
});