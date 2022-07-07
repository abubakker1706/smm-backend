const router = require('express').Router()
const passport = require('passport')
const User = require('../model/User')

const CLIENT_URL = 'http://localhost:3000/'

// ('/login/success',async(req,res)=>{
//                        const user= await User.find()
//                        res.status(200).json(user)
//                        console.log(user)
// })
// function isLoggedIn(req,res,next) {
//   if(req.isAuthenticated()){
//     return next
//   }
// }

router.get("/facebook", passport.authenticate("facebook",{scope:'email'}));

router.get("/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect:CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get('/linkdin',
  passport.authenticate('linkedin', { state: 'SOME STATE'  }));

router.get('/linkdin/callback', 
  passport.authenticate('linkedin', {  
    successRedirect:CLIENT_URL,
    failureRedirect: "/login/failed", }),
  );
//twitter
router.get("/twitter", passport.authenticate("twitter"));

// redirect to home page after successfully login via twitter
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/auth/login/failed"
  })
);





module.exports = router

