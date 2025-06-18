import Users from '../models/users.js'
import bcrypt from 'bcrypt'
import {verificationToken} from '../utils/verificationToken.js'
import { verifyMail } from '../email/email.js'

export const test =  (req,res)=> {
try {
        res.status(200).json({msg: 'connected'})
} catch (error) {
    console.log(error)
}
}

// @route   GET /api/auth/all-users
// @desc    Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      message: 'All users retrieved successfully',
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to retrieve users',
      error: error.message,
    });
  }
};


// @route   GET /api/auth/users
// @desc    Get users by name
export const getUsersByName = async (req, res) => {
  try {
    const name = req.query.name;

    if (!name) {
      return res.status(400).json({ message: 'Name query is required' });
    }

    const users = await Users.find({ name });

    res.status(200).json({
      message: 'Authorized for route',
      users,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Something went wrong while fetching users',
      error: error.message,
    });
  }
};


//route @ api/auth/signup
//desc add a new user
export const signup = async (req, res) => {
    const {name, email, password} = req.body

    const user = await Users.findOne({email})
      try {
    
        if(user) {
            return res.status(400).json({success: false, message: 'User with this email exists'})
        }

        console.log('no  existing user found')
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const theverificationToken = verificationToken()

         const newUser = new Users({
            name, 
            email, 
            password: hashedPassword, 
            verificationToken: theverificationToken, 
            verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000 // Token valid for 1 hours
        })
        
        await newUser.save()
        
        await verifyMail(newUser.email, 'Verify Your Email Account',  `<h1> Your Verification Token is</h1><br /> <h1>${theverificationToken}</h1> `)


        return res.status(201).json({
            success: true, 
            message: 'User successfully created',
            user: {...newUser._doc, password: undefined}
        })
} catch (error) {
    res.status(500).json({success: false, message: 'Something went wrong in sign up'})
    console.log(error)
    throw error
}
}

//route @ api/auth/verify-email
//desc verify the user email with temporary token
export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await Users.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token',
      });
    }

    // Mark user as verified
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    user.isVerified = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Account successfully verified',
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error verifying account',
    });
  }
};
