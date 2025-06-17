import Users from '../models/users.js'
import bcrypt from 'bcrypt'
import {verificationToken} from '../utils/verificationToken.js'

export const test =  (req,res)=> {
try {
        res.status(200).json({msg: 'connected'})
} catch (error) {
    console.log(error)
}
}

export const signup = async (req, res) => {
    const {name, email, password} = req.body

    const user = await Users.findOne({email})
try {
    
        if(user) {
            return res.status(400).json({success: false, message: 'User with this email exists'})
        }

        console.log('no user found')
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const theverificationToken = verificationToken()

         const newUser = new Users({
            name, 
            email, 
            password: hashedPassword, 
            verificationToken: theverificationToken, 
            verifiedTokenExpiresAT: Date.now() + 24 * 60 * 60 * 1000 // Token valid for 24 hours
        })
        
        await newUser.save()
        
        return res.status(200).json({
            success: true, 
            message: 'User successfully created',
            user: {...newUser._doc, password: undefined}
        })
} catch (error) {
    res.status(400).json({success: false, message: 'Error in signup'})
    console.log(error)
    throw error
}
}