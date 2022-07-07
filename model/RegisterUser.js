const mongoose =require('mongoose');


const RegisterUserSchema = mongoose.Schema({

username:{
                         type: String,
                         required: true,

},
email: {
                         type: String,
                         required: true,
                         unique: true,
},
password: {
                         type: String,
                         required: true,
                         minLength:6,
},

});
module.exports =RegisterUser= mongoose.model("RegisterUser", RegisterUserSchema);

