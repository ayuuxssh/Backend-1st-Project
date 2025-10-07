const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB= async()=>{
    try{
    let conn = await mongoose.connect(process.env.MONGODB_URI,{

    })
    console.log("MONGODB is connected");
}catch(error)
{
    console.error({message:error.message});
}
}

module.exports= connectDB;