import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    image: String,
    email: String,
    contactNumber: String,
    address: String,
    });

const User = mongoose.model("User", userSchema);
export default User;