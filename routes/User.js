

const bcrypt = require('bcrypt'); 
const router = require('express').Router()
const RegisterUser = require('../Model/RegisterUser')








async function genSalt(password){
      const salt= await bcrypt.genSalt(10);
      const hashedpassword= await bcrypt.hash(password ,salt);
         return hashedpassword;
}
// Register User
router.post('/register',async (req,res)=>{
      const{username,email,password}=req.body
      let existingUser;
      try {
        existingUser = await RegisterUser.findOne({ email });
      } catch (err) {
        return console.log(err);
      }
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User aleady exists! Login instead" });
      }
try{
       const hashedPassword= await genSalt(password)
       

        const newUser= new RegisterUser({
              username: username,
              email: email,
              password: hashedPassword,           
        })
        const user = await newUser.save();
        res.status(200).json({message:"Account created successfully"});

 }catch(err){
                     console.log(err);
                     res.status(500).json(err)
                     
                }  
        
})
//login
router.post('/login',async (req,res) => {
 const { email, password } = req.body;       
let existingUser;

try {
existingUser = await RegisterUser.findOne({ email });
const isPasswordCorrect = await bcrypt.compare(
                         password,
                         existingUser.password);
                                                
if (!isPasswordCorrect) {
return res.status(400).json({ message: "Invalid Credentials" });
} else {
 return res.status(200).json({ message: "Login Successfull", existingUser });
 }
                          
 }
 catch (err) {
                         
 if (!existingUser) {
return res.status(404).json({
message: "Couldn't find the User by this email",
});
 }      
}
                       
})
router.get("/login/success", async(req, res) => {
  
  let existingUser;
  existingUser = await RegisterUser.findOne({});
  if (existingUser) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: existingUser,
      //   cookies: req.cookies
    });
  }
});



module.exports= router