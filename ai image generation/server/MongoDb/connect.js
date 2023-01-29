import mongoose from "mongoose";

const connectDB=(url)=>{
    mongoose.set('strictQuery',true);

    mongoose.connect(url)
    .then(()=>console.log('connected to database Successfully'))
    .catch((err)=>console.log(err))
}

export default connectDB;