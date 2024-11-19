
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true}
})

const UserModel = mongoose.model('user',userSchema)

module.exports = UserModel