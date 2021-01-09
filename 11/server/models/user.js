//SCHEMA

const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV)
const SALT_I= 10;

const userSchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    token:{
        type:String,
        require:true
    }
});

//pre-specify what we want to do before it saves
userSchema.pre('save',function(next){
    var user = this;
if (user.isModified('password')){ //isModified is to check if the password or the user was modifield
    bcrypt.genSalt(SALT_I, function(err,salt){
        if (err) return next (err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if (err) return next (err);
            user.password = hash; 
            next();    
        })
    })
} else { // if is not modifield, move forward
    next();
}

})

//comparePassword= whetever name can be // cb- callback
userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword, this.password, function(err,isMatch){ //this.password- hash password, inside database
        if(err) return cb(err); 
        cb(null,isMatch) //it gonna be true
    }) 
}


userSchema.methods.generateToken = function (cb){
    let user= this;
    let token = jwt.sign(user._id.toHexString(),config.SECRET);
    
    user.token = token;
    user.save((err,user)=>{
        if (err) return cb(err);
        cb(null,user)
    })
}

userSchema.statics.findByToken = function(token,cb){
    const user = this; //acess the database

    jwt.verify(token,config.SECRET,(err,decode)=>{ //decode- actual user id
        //findOne - find a record or document on the database
        user.findOne({'_id':decode, 'token':token},(err,user)=>{
            if (err) return cb(err);
            cb(null,user) 
        }) 
    })
}


userSchema.methods.deleteToken = function (token,cb){
    const user = this;
    //unset will remove that entry from the documents
    user.update({$unset:{token:1}},(err,user)=>{
        if (err) return cb(err);
        cb(null,user) 
    })
}


//Include User to the schema
const User = mongoose.model('User', userSchema);
module.exports = {User}