import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"


export async function signup(req,res){

    const { email, password, fullName }  = req.body;

    try {
        if(!email || !password || !fullName){
            return res.status(400).json({
                success : false,
                message: "All fields are required"
            })
        }
        if(password.length < 6){
            return res.status(401).json({
                success : false,
                message: "Password must be at least 6 characters"
            })
        }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
    return res.status(401).json({
                success : false,
                message: "Invalid email formate"
            })
    }

    const existingUserEmail = await User.findOne({email});
    if(existingUserEmail){
    return res.status(401).json({
                success : false,
                message: "email already existed! please use diffrent email."
            })    
    }

    const idx = Math.floor(Math.random()*100) + 1;// gen a num btw 1 - 100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
       email,
       fullName,
       password, 
       profilePic : randomAvatar,
    })

    try {
        await upsertStreamUser({
        id: newUser._id.toString(),
        name : newUser.fullName,
        image : newUser.profilePic || "",
    })
    console.log(`Stream user created for ${newUser.fullName}`);
    } catch (error) {
        console.log('Error creating Stream user:',error);   
    }

    const token =  jwt.sign(
        { userId : newUser._id },
        process.env.JWT_SECRET_KEY,{ 
        expiresIn : "7d" 
        })

        res.cookie("jwt", token, {
            maxAge : 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,   // prevent XSS attacks
            sameSite : "strict", // prevent CSRF attacks
            secure : process.env.NODE_ENV === "production"
        })
        res.status(201).json({
                success : true,
                user: newUser,
            })

    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({
            message : "Internal Server Error"
            })
    }
}

export async function login(req,res){
    try {
        const { email, password } = req.body;
        if(!email || !password){
        return res.status(400).json({
                success : false,
                message: "All fields are required"
            })
        }
    const user = await User.findOne({ email });
    if(!user){
        return res.status(401).json({
                success : false,
                message: "Invalid email!"
            })
    }
    const isPasswordCorrect = await user.matchPassword(password);
    if(!isPasswordCorrect){
        return res.status(401).json({
                success : false,
                message: "Invalid password!"
            }) 
    }

    const token =  jwt.sign(
        { userId : user._id },
        process.env.JWT_SECRET_KEY,{ 
        expiresIn : "7d" 
        })

        res.cookie("jwt", token, {
            maxAge : 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,   // prevent XSS attacks
            sameSite : "strict", // prevent CSRF attacks
            secure : process.env.NODE_ENV === "production"
        })
        res.status(201).json({
                success : true,
                user,
            })
    
    } catch (error) {
     console.log("Error in signup controller", error);
        res.status(500).json({
            success :false ,
            message : "Internal Server Error"
            })
    }
}

export async function logout(req,res){
    res.clearCookie("jwt");
    res.status(200).json({ 
        success: true,
        message: "Logout successfull."
    })
}

export async function onboard(req,res) {  
    try {
        const userId = req.user._id;
        const {fullName, bio, nativeLanguage, learningLanguage, location} = req.body;
        
        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
        res.status(400).json({ 
        success: false,
        message: "All fields are required.",
        missingFeilds: [
            !fullName && "fullName",
            !bio && "bio",
            !nativeLanguage && "nativeLanguage",
            !learningLanguage && "learningLanguage",
            !location && "location",
        ].filter(Boolean),
        })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            // fullName, bio, 
            // nativeLanguage, 
            // learningLanguage, 
            // location // insted of this we can use this also
            ...req.body,
            isOnboarded: true,
        }, {new : true})

        if(!updatedUser){
        return res.status(404).json({ 
        success: false,
        message: "User not found."
        })
        }

        try {
            await upsertStreamUser({
            id: updatedUser._id.toString(),
            name: updatedUser.fullName,
            image: updatedUser.profilePic || "",
        })
        console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
        
        } catch (str) {
            console.log('Error updating Stream user during onboarding', str.message);
            
        }
        
        res.status(200).json({ 
        success: true,
        user : updatedUser,
    })
    } catch (error) {
    console.log('Onboarding error', error);
    res.status(500).json({
        success :false ,
        message : "Internal Server Error"
        })
    
    }
}
// 1:24 postman
