const bcrypt = require('bcrypt');
const { nextTick } = require('process');

// First generate the salt(random data)
bcrypt.genSalt(10,(err,salt)=>{ //1-how many times salt will be generated, 2- callback(actual error, salt)
    //console.log(salt)
    if(err) return next (err);

//1- actual passport, 2-salt, 3- callback(err,hash-wat will store into database)
    bcrypt.hash('password123',salt,(err,hash)=>{
        console.log(hash)
    })
}) 