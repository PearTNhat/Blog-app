import mongoose from 'mongoose';
const connectDB= async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connect to mongodb successfully");
  } catch (error) {
    console.log("connect to mongodb failed",error.message);
    process.exit(1)
  }
}
export {connectDB};