// import checkmodel from "../Model/Checkmodel.js";
import usermodel from "../Model/Usermodel.js";
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcrypt"

export const useradd = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "Fill all the details" });
    }

    // check email format
    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({ message: "Email must end with @gmail.com" });
    }

    // check for duplicates separately
    const emailExists = await usermodel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const usernameExists = await usermodel.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // const passwordExists = await usermodel.find({ password:password });
    // if (passwordExists) {
    //   return res.status(400).json({ message: "Password is already used, choose another one" });
    // }

    //username and password length 

    if (username.length<3 || username.length>20){
      res.status(400).json({
        message:"length of username should be btw 3-20"
      })
      return 
    }


    if (password.length<3 || password.length>20){
      res.status(400).json({
        message:"length of password should be btw 3-20"
      })
      return 
    }

    // save data if all good
    const hashedpassword = await bcrypt.hash(password,10)
    const data = new usermodel({ email, username, password:hashedpassword });
    const savedData = await data.save();

    res.status(201).json({
      message: "Registered successfully",
      result: savedData,
    });
  } catch (err) {
    console.error("Enter valid Credentials", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const userlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check empty fields
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all the details" });
    }
    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({ message: "Email must end with @gmail.com" });
    }

    // find user by email
    const user = await usermodel.findOne({ email });
     if (user==null){
      return res.status(400).json({ message: "Email not registered" });

    }
    if (!user ) {
      return res.status(400).json({ message: "Email not registered" });
    }

   

    //length of username and password 



    if (password.length<3 || password.length>20){
      res.status(400).json({
        message:"length of password should be btw 3-20"
      })
      return 
    }
   

    // compare password
    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Password doesn't match" });
    }
    // const accesstoken = jsonwebtoken.sign({id:user._id.toString(),email:user.email},process.env.secret_key,{expiresIn:"7d"})
   const jwttoken = jsonwebtoken.sign({ id: user._id, email: user.email }, process.env.secret_key, { expiresIn: "7d" });

  res.status(200).json({
  message: "Login successfully",
  result: user,
  jwttoken
});
  } catch (err) {
    console.error("Enter valid Credentials", err);
    res.status(500).json({ message: "server error" });
  }
};

export const updateuser = async (req,res)=>{
  const userId = req.user.id
  const {password,confirmPassword} = req.body 
  try{
    if (!confirmPassword || !password) {
      return res.status(400).json({ message: "Fill all the details" });
    }
    if (password.length<3 || password.length>20){
       return  res.status(400).json({
         message:"length of password should be btw 3-20"
      })
     
    }
    if (password!==confirmPassword){
       return res.status(400).json({message:"Password doesn't match"})
       
    }
    const allUsers = await usermodel.find({});
    for (let u of allUsers) {
      const isSame = await bcrypt.compare(password, u.password);
      if (isSame) {
        return res.status(400).json({ message: "Password is already used" });
      }
    }

    const hashedpassword = await bcrypt.hash(password,10)
    const updateuser = await usermodel.findByIdAndUpdate(userId,{password:hashedpassword},{new:true})
    res.status(200).json({message:"user updated successfully",updateuser})

  }
  catch(err){
    res.status(500).json({message:"error in updating user",error:err.message})

  }
}

export const getdetails = async(req,res)=>{
  const userId = req.user.id
  const gettingdetails = await usermodel.findById(userId)
  if (!gettingdetails){
    res.status(400).json({message:"user ledu"})
    return 
  }
  const {email,username,password} = gettingdetails
  res.status(200).json({message:"getting details of user",result:{email,password,username}})
}


// export const addCartItems = async(req,res)=>{
//   const id =await (req.params.id)
//   if ()
// }

