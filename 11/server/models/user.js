//SCHEMA

const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
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

//Include User to the schema
const User = mongoose.model('User', userSchema);
module.exports = {User}