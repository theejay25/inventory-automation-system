import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},  
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true},
    isVerified: {type: Boolean, default: false},
    verificationToken:String,
    verificationTokenExpiresAt:Date,
    resetPasswordToken:String,
    resetPasswordTokenExpiresAt:Date
})

const Users = mongoose.model('Users', userSchema)
export default Users