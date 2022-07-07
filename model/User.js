const mongoose = require('mongoose')


const UserSchema= mongoose.Schema({
                         uid:String,
                         pic:String,
                         email:String,
                         name:String,
                         
                         
})
module.exports = User = mongoose.model('users', UserSchema);