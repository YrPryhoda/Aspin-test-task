import mongoose from "mongoose";

export const mongoConnect = async () => {
  const path = process.env.MONGO_URL as string;
  
  return await mongoose.connect(path);
};
