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


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{ // destination gonna take the request, the actual file that is processing and the callback
        cb(null,'uploads/')
    },
    filename:(req,file,cb) =>{
      cb(null,`${file.fieldname}_${Date.now()}_${file.originalname}`)  // the original name has the extension
    }
})
//Configuration - 1- destine , 2- single file


app.post('/api/uploads',(req, res) =>{

    const upload = multer({
        storage,
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
    
    }).fields([
        {name:'image', maxCount:2},
        {name:'image2',maxCount:10}
    ]);

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