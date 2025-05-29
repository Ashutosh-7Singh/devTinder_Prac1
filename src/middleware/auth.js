
const jwt=require("jsonwebtoken")
const User=require("../model/user")

const userAuth=async(req,res,next)=>{
    try {
        const {token}=req.cookies;
        if(!token){
            return res.status(400).josn({success:false,message:"Token is not valid "})
        }
        // validate the token
        const decodeObj= await jwt.verify(token,"DEV@Tinder$7890")

        // find the user
        const {_id}=decodeObj

        const user = await User.findById(_id)
        if(!user){
            res.status(400).josn({success:false,message:"User not found"})
        }
        req.user=user;
        next();
    } catch (error) {
        res.status(500).josn({
            success:false,message:error.message
        })
    }
}

module.exports=userAuth