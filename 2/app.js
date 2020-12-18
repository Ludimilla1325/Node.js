
//console.log(process.argv) //aqui irá pegar oq estamos passando no comando do terminal

const fs = require('fs'); //we are require the fs module
//We are require the package
const commandLineArgs =  require ('command-line-args');
 //We are passing what the package gonna read in the command lines
const optionDefinitions = [
    {name:'name',type: String},
    {name:'order',type:String},
    {name:'payment',type:Number},
    {name:'exit',type:Boolean},
];

const options = commandLineArgs(optionDefinitions)

// Programa 
// 1- node app.js 
// 2- node app.js  --name=James
// 3- node app.js  -- order=PIZZA
// 4- node app.js  --payment= 100
// 5- node app.js  --exit


let getJson = fs.readFileSync('db.json'); //aqui recebemos o arquivo json apenas como string
let data = JSON.parse(getJson); //aqui convertemos de JSON para um object

const saveIt = (newData) =>{
    const toString = JSON.stringify(newData); //aqui precisamos converter tudo novamente, mas de object para json é salvar isso
    fs.writeFileSync('db.json', toString); //irá pegar primeiro o que queremos converter, and then with what we want to store it
}

if(options.name) {
    data.name = options.name;  //aqui o arquivo.json está recebendo as informações

    console.log(`Hello, ${options.name}, we are serving CAKE, PIZZA and SALAD`)

    saveIt(data);

} else if(options.order){
    data.order = options.order;

    console.log(`Ok ${data.name}, that would be $25, you will pay with ?`)
    
    saveIt(data);

} else if(options.payment){
    data.payment = options.payment;

    console.log(`Your change is ${options.payment - 25}, thanks for eating at chuckies, type --exit to get the order`)

    saveIt(data);

} else if (options.exit) {
    console.log(data)

    console.log(`Thanks!`)

    data.name='';  //aqui estará voltando para o ínicio 
    data.order='';
    data.payment='';
    saveIt(data);
} else {
    console.log(`Hello, please enter your name`)
}

