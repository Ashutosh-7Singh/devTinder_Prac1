const express = require("express");
const connectDb = require("./config/database");
const validateSignUpData = require("./utils/validation");
const bcrypt = require("bcrypt");
const User = require("./model/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userAuth = require("./middleware/auth");
const app = express();

app.use(express.json())
app.use(cookieParser())
app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;
    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // creating a new instacne of the user

    const userInfo = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    const user = await userInfo.save();
    res.json({ message: "User data saved Sucessfully", user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Somthing went wrong",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$7890");
      res.cookie("token", token);
    }
    res.status(200).json({sucess:true,message:"Login Successful",user})

  } catch (error) {
    res.status(500).json({ success: false, message: "Invalid credentials" });
  }
});

app.get("/profile",userAuth, async(req,res)=>{
    try {
        const user=req.user;
        return res.status(200).json({success:true,message:"User found Successfully",user})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})


connectDb()
  .then(() => {
    console.log("Databse connected Sucessfuly");
    app.listen(1234, () => {
      console.log("Server is Successfully listening on port 1234");
    });
  })
  .catch(() => {
    console.log("Databse not connected Sucessfully");
  });
