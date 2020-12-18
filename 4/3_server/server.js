/*
//1- we need to bring a module, a built in module from node- http


// this module http prove a method called create server

//this method gonna take a callback that is a kind of an event listener
// this callback is going to get two different arguments request and response
// this server is waiting something to happen and when you connect, you r making a request, 
//And the response is what you sent back to the user with the actual httl
// whetever the request happen, the serve will send a response and the response start with the head

const http = require('http');

http.createServer((req,res) =>{ //Here we receive the request
    res.writeHead(200,{'Content-Type':'text/plain'}); //set the letters- aqui está res pq vamos mandar um response, precisamos de 2 arugumentos dentro, o primeiro é the tax code e se tudo tiver bem vc irá ter uma resposta de 200
    res.end('hello everyone, im a response, yesss it works!!!')   //sending my response- the Content-Type is for the text- whenever we make a request, we open, so after you set the headers, you need send a response and close the connection 
}).listen(8000,'127.0.0.1')

// RENDERIRNG HTML
const http = require('http');
const server = http.createServer((req,res) =>{
    res.writeHead(200,
        {'Content-Type':'text/html'});
        res.write (`
        <html>
            <body>
                <h1
                style = "background:red">
                Hello there </h1>            
            </body>
        </html>
        `)
        res.end(); 
})

server.listen(8000,'127.0.0.1');
console.log("server is running")


// RENDERIRNG HTML - pegando de um html
const http = require('http');
const fs = require('fs')

const server = http.createServer((req,res) =>{
    res.writeHead(200,{'Content-Type':'text/html'});
        //Fetchng the index HTML
    let HTML= fs.readFileSync(`${__dirname}/index.html`) //dirname give us the path to the directory    
    res.end(HTML); 
})

server.listen(8000,'127.0.0.1');
console.log("server is running");
console.log(__dirname)


//RENDERING JSON DATA - 
//Simple way to send some back that json data like an API
const http = require('http');
const fs = require('fs')

const server = http.createServer((req,res) =>{
    res.writeHead(200,{'Content-Type':'application/json'});
    const names= ["francis"," james", "rob" ]
    const cars = {
        name:"Ford",
        model:"Fiesta"
    }

    const json = JSON.stringify({
        names,
        cars
    })
    res.end(json); 
})

server.listen(8000,'127.0.0.1');
console.log("server is running");
*/

//ROTATING- Whenever we make a request of very specific Url, we need a way to catch rhe location
const http = require('http');
const fs = require('fs')

const server = http.createServer((req,res) =>{

    if(req.url === "/"){
        res.writeHead(200, {'Content-Type':'text/html'});
        const HTML = fs.readFileSync(`${__dirname}/index.html`);
        res.end(HTML)
    } else if (req.url === "/api/user"){
        res.writeHead(200,{'Content-Type':'application/json'});
        const user = JSON.stringify({
            name:"Francis",
            lastname:"Jones"
        });
        res.end(user)
    } else {
        res.writeHead(404);
        res.end();
    }

})

server.listen(8000,'127.0.0.1');
console.log("server is running");