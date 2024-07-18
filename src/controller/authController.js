const User = require("../models/User");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "user already exists" });
    }

    user = new User({
      email,
      password,
    });
    await user.save();
    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

exports.login=async (req,res)=>{
const {email,password}=req.body
try {
   
   let user =await User.findOne({email})
   if(!user){
    return res.status(400).json({msg:"Invaild Credential"})
   }

   const isMatch=await bcrypt.compare(password,user.password)


   if(!isMatch){
    return res.status(400).json({msg:"Invaild Credential"})
   }


   const payload={user:{id:user.id}}

jwt.sign(payload,procecss.env.JWT_SECRET,{expiresIn:'1h'},(err,token)=>{
    if(err) throw err;
    return res.json({token})
})


} catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
}

}