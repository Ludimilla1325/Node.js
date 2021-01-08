const bcrypt = require('bcrypt');
const { nextTick } = require('process');
const {MD5} = require('crypto-js');
const jwt = require ('jsonwebtoken');

// // First generate the salt(random data)
// bcrypt.genSalt(10,(err,salt)=>{ //1-how many times salt will be generated, 2- callback(actual error, salt)
//     //console.log(salt)
//     if(err) return next (err);

// //1- actual passport, 2-salt, 3- callback(err,hash-wat will store into database)
//     bcrypt.hash('password123',salt,(err,hash)=>{
//         console.log(hash)
//     });

// /*Token is going to be a hash that we provide the user after they log and they will grab the token. Whenever they acess our api, 
// we are going to get this token and check if the token is correct*/

// }) 


//CRYPTO JS


// const secret = "supersecret";
// const secretSalt= 'lsbwybxknow'
// const jwt = require('jsonwebtoken');

// var user = {
//     id:1,
//     token:MD5('password123').toString() + secretSalt
// }
// //console.log(user)

// const receivedToken = "482c811da5d5b4bc6d497ffa98491e38lsbwybxknow"

// if( receivedToken === user.token){
//     console.log('move forward')
// }



// JSONWEBTOKEN
//Encoding- sign[payload(equal to whetever you want to use to generate the token)] 
//Deconding - verify

let id = "10000";
const secret = "supersecret";

//const token = jwt.sign(id,secret);

const receivedToken = "eyJhbGciOiJIUzI1NiJ9.MTAwMDA.v46XZTowl3YeHvoQ486peBU7y_xLvf6N5nvTdo2WhsQ"
const decodeToken = jwt.verify(receivedToken,secret)

console.log(decodeToken)

