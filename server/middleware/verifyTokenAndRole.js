import jwt from 'jsonwebtoken'

export const verifyTokenAndRole = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token){
        return res.status(403).json({
            succcess: false,
            messsage: 'no token provided'
        })
    }

    try {

        let decoded;

        try {
            
          decoded = jwt.verify(token, process.env.ADMIN_SECRET)

        } catch (error) {
            
          decoded = jwt.verify(token, process.env.USER_SECRET)
            
        }

        req.user = decoded
    } catch(error) {
        return res.status(403).json({success: false, message: 'token is expired or invalid'})
    }

    next()
}