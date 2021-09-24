const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName : String,
    userName : {
        type: String,
        required:true,
        unique: true
    },
    userType: { 
        type: String,
        enum: ['student', 'teacher', 'librarian'],
        default: "student"
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: String,
    image: String,
    otp: "",
    isDelete: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save',function(next){
    var user= this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10,function (err,salt) {
            if(err){
                return next(err);
            }
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err){
                    return next(err);
                }
                else{
                    user.password= hash;
                }
                next();
            })
        })
    }
    else{
        next();
    }
})

module.exports= mongoose.model('User',userSchema);