
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const RegisterUser = require('./routes/User')
const dotenv= require('dotenv')

//const PostSetup= require('./Post')
const passport = require("passport");
const passportSetup = require("./Passport");
const FacebookRoute = require('./routes/facebookRoute');
const PostRoute = require('./routes/postRoute');
const bodyParser = require('body-parser')
dotenv.config()
const session= require('express-session')
;
mongoose.connect(process.env.MONGO_URL,{
                         useNewUrlParser: true,
})
.then(()=>console.log('connected to db'))
.catch((err)=>console.log(err))

const app = express();
app.use(express.json());



app.use(session(
                         {secret: 'SECRET', 
                         resave: false, 
                         saveUninitialized: true 
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(require('cookie-parser')());
//app.use(require('body-parser').urlencoded({ extended: true }));
const jsonParser=bodyParser.json();
const urlencoded=bodyParser.urlencoded({ extended:false})

app.use(cors({
                         origin: 'http://localhost:3000',
                         method: "GET,POST,PUT,DELETE",
                         credentials:true,
}))



                   
//app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));









 app.use('/auth',FacebookRoute)
 const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};
app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});
app.use('/',urlencoded,PostRoute)
app.use('/user',RegisterUser)

app.listen(process.env.PORT,()=>{
console.log('listening on port')
})