
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protectRroute = async (req, res, next) =>{
    try {
        const token = req.cookie.jwt;
        if(!token){
        return res.status(401).json({ 
        success: false,
        message: "Unauthorized - no token provided."
    })
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(!decode){
        res.status(401).json({ 
        success: false,
        message: "Unauthorized - invalid token."
    })
    }
    const user = await User.findById(decode.userId).select("-password");
    if(!user){
    res.status(401).json({ 
        success: false,
        message: "Unauthorized - user not found."
    })
    }
    req.user = user;
    next();

    } catch (error) {
        console.log('Error in protectRroute middleware', error);
        res.status(500).json({ 
        success: false,
        message: "Internal Server Error."
    })
    }
}
