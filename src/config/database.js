const mongoose=require("mongoose")

const connectDb=async ()=>{
    await mongoose.connect("mongodb://localhost:27017/devTinder3")
}



module.exports=connectDb;