
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protectRoute = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token){
        return res.status(401).json({ 
        success: false,
        message: "Unauthorized - no token provided."
    })
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(!decode){
        return res.status(401).json({ 
        success: false,
        message: "Unauthorized - invalid token."
    })
    }
    const user = await User.findById(decode.userId).select("-password");
    if(!user){
    return res.status(401).json({ 
        success: false,
        message: "Unauthorized - user not found."
    })
    }
    req.user = user;
    next();

    } catch (error) {
        console.log('Error in protectRoute middleware', error);
        return  res.status(500).json({ 
        success: false,
        message: "Internal Server Error."
    })
    }
}
