const mongoose = require('mongoose'); 

const usersSchema = new mongoose.Schema({
    firstName:String ,
    lastName:String ,
    email:String ,
    password:String ,
    phonenumber:String ,
    subscribe:Boolean
})




module.exports =  mongoose.model('users',usersSchema)