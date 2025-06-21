import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},  
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true},
    isVerified: {type: Boolean, default: false},
    salary: {type: Number, default: 0},
    workingDays: {type: [String], default: []},
    workingHours: {type: Object, default: { start: "09:00", end: "17:00" }},
    createdAt: {type: Date, default: Date.now},
    role: {type: String, enum: ['admin', 'employee'], default: 'employee'},
    verificationToken:String,
    verificationTokenExpiresAt:Date,
    resetPasswordToken:String,
    resetPasswordTokenExpiresAt:Date
}, {timestamps: true})

const Users = mongoose.model('Users', userSchema)
export default Users