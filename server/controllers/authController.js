import Users from '../models/users.js'
import products from '../models/products.js'
import bcrypt from 'bcrypt'
import {verificationToken} from '../utils/verificationToken.js'
import { passwordResetMail, verifyMail, welcomeMail } from '../email/email.js'
import { generateJWTToken } from '../utils/generateJWTToken.js'
import crypto from 'crypto'

export const test = async (req,res)=> {
try {
        const product = await products.find()
        res.status(200).json({msg: 'connected', products: product })
} catch (error) {
    console.log(error)
}
}

//route @ api/auth/signup
//desc add a new user
export const signup = async (req, res) => {
    const {name, email, password} = req.body

    const user = await Users.findOne({email})
      try {
    
        if(user) {
            return res.status(400).json({success: false, message: 'User with this email exists'})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const theverificationToken = verificationToken()

         // Auto-admin only if this is the first user ever
          const isFirstUser = (await Users.countDocuments()) === 0;
          const role = isFirstUser ? 'admin' : 'employee';

         const newUser = new Users({
            name, 
            email, 
            password: hashedPassword, 
            role: role, 
            verificationToken: theverificationToken, 
            verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000 // Token valid for 1 hours
        })
        
        await newUser.save()
        
        await verifyMail(newUser.email, 'Verify Your Email Account',  `<h1> Your Verification Token is</h1><br /> <h1>${theverificationToken}</h1> `)



        return res.status(201).json({
            success: true, 
            message: 'User successfully created',
            user: {
                name: newUser.name,
                email: newUser.email,
                id: newUser._id,
              }
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


//route @ api/auth/login
//user login route
export const login = async (req , res) => {
  const { email, password } = req.body

  try {
    
    const existingUser = await Users.findOne({email})

    if(!existingUser) {
        return res.status(400).json({success: false, message: "User with this email does not exist"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

    if(!isPasswordCorrect) {
        return res.status(400).json({success: false, message: "Password does not match"})
    }

    if(!existingUser.isVerified) {
        return res.status(400).json({success: false, message: "Please verify your email first"})
    }

    generateJWTToken(res, {id: existingUser._id, role: existingUser.role})

    const message = existingUser.role === 'admin' ? 'Welcome Admin' : "Welcome User"


    if (!existingUser.hasLoggedIn) {
      await welcomeMail(existingUser.email, 'Welcome To Stocks', existingUser.name);
      existingUser.hasLoggedIn = true;
      await existingUser.save();
    }


  res.status(200).json({
  success: true,
  message,
  user: {
    name: existingUser.name,
    email: existingUser.email,
    id: existingUser._id,          
    role: existingUser.role
  }
});

  } catch (error) {
    res.status(500).json({success: false, message: 'Error occured in login'})
    
  }
} 

//route @ api/auth/forgot-password
//description send User reset password
export const forgotPassword = async (req, res) => {
try {
    const {email} = req.body
  
    const existingUser = await Users.findOne({email})
  
    if(!existingUser) {
      return res.status(400).json({success: false, message: 'User does not exist'})
    }
  
    const resetPasswordToken = crypto.randomBytes(32).toString('hex')
    const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 //expires in 1hr
    existingUser.resetPasswordToken = resetPasswordToken
    existingUser.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt
  
    await existingUser.save()
  
    await passwordResetMail(existingUser.email, 'Reset Your Password', `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`)
  
    res.status(200).json({success: true, message: 'Reset token has been sent to email'})
} catch (error) {
  res.status(500).json({success: false, message: 'Error in sending password Reset link'})
  console.log(error)
  throw error
}

}

//route @api/auth/reset-password
//desc reset user Password
export const resetPassword = async (req, res) => {
  const {token} = req.params
  const {password} = req.body

try {
    if (!token) {
      return res.status(400).json({success: false, message: 'No reset token provided'})
    }

    const existingUser = await Users.findOne({ 
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: {$gt: Date.now()}
     })

    if(!existingUser) {
      return res.status(400).json({success: false, message: 'User does not exist'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    existingUser.password = hashedPassword;
    existingUser.resetPasswordToken = undefined
    existingUser.resetPasswordTokenExpiresAt = undefined

    await existingUser.save()

    res.status(200).json({success: true, message: 'Password successfully reset'})
} catch (error) {
  console.log(error)
  res.status(500).json({success: false, message: 'Unsuccessful password reset'})
  throw error
}


}

//route @api/auth/logout
//desc user logout
export const logout = async (req, res) => {
     try {
        res.clearCookie('token'); // Clear the JWT token cookie
        return res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
}

// route @ api/auth/update-user
// desc: update user information
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const existingUser = await Users.findById(id);

    if (!existingUser) {
      return res.status(400).json({ success: false, message: 'Unable to find this user' });
    }

    // Only update the fields that are provided
    if (name) existingUser.name = name;

    await existingUser.save();

    res.status(200).json({
      success: true,
      message: 'User info successfully updated',
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error in updating user info' });
  }
};


//route @ api/auth/delete-user
//desc delete user 
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Optional: Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }

    const existingUser = await Users.findById(id);

    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User does not exist' });
    }

    await Users.deleteOne({ _id: id });

    return res.status(200).json({ success: true, message: 'User successfully deleted' });

  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ success: false, message: 'Error in deleting user' });
  }
};



// export const resendToken = async (req, res) => {
//   const {email} = req.body

//   try {
    
//     const existingUser = await Users.findOne({email})

//     if(!existingUser) {
//       return res.status(500).json({success: false, message: 'user with this email does not exist'})
//     }

//     const resetPasswordToken = crypto.randomBytes(32).toString('hex')
//     const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60

//     existingUser.resetPasswordToken = resetPasswordToken
//     existingUser.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt

//     await existingUser.save()

//     await passwordResetMail(
//       existingUser.email,
//       "Reset Your Account Password",
//       `${process.env.CLIENT_URL}/reset`
//     )

//   } catch (error) {
    
//   }
// }

