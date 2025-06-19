import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generateJWTToken = async ( res, userid ) => {
    const token = jwt.sign({id: userid}, process.env.USER_SECRET, {expiresIn: '1h'})

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Helps prevent CSRF attacks
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
     return token
}