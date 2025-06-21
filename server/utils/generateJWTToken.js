import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generateJWTToken = (res, user) => {

  const payload = {id: user._id, role: user.role}

  const secret = user.role === 'admin' ? process.env.USER_SECRET : process.env.ADMIN_SECRET

    const token = jwt.sign(payload, secret , {expiresIn: '1h'});


  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000, // 1 hour to match JWT expiration
  });

  return token;
};
