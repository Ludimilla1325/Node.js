/*
//METODOS PRONTOS DENTRO DO OS

const os = require ('os');
let user = os.userInfo(); //userInfo dá as informações do user

console.log(user)
console.log(user.username)

let platform = os.platform(); //platform irá ver qual tipo de sistema operacional está utilizando no not.

console.log(platform) 
*/

const os = require ('os');
const fs =  require ('fs');
const userData =  require('./user.js')

console.log(userData) // está entrando no big object e está trazendo as informções para você

//console.log(module) // parecerá todas as informações do module no console, e um dos mais importantes é o 
//-> exports, sempre que queremos compartilhar um arquivo, ou está requerido o user.js, isso vem com um module, com um objeto dizendo dentro quais informações, com váriaveis e coisas desse tipo  

let user = os.userInfo(); //userInfo dá as informações do user
let platform = os.platform(); //platform irá ver qual tipo de sistema operacional está utilizando no not.
let date= new Date();

let message = `User ${user.username} started app at ${date}\n`

// colocaremos 3 string, a primeira é o nome do arquivo q vamos criar, segundo é oq vc quer colocar no arquivo, o terceiro argumento será um callback, e terá o argumento err 
fs.appendFile("Hello.txt", message, (err) =>{
    if (err){
        console.log('error')
    }
}) 