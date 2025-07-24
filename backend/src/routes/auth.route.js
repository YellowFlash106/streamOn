import express from "express";
import { signup ,login, logout, onboard } from "../controllers/auth.controller.js";
import { protectRroute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/onboarding", protectRroute, onboard);

// check if user is logged in 
router.get("/me", protectRroute, (req,res)=>{
     res.status(200).json({ 
        success: true,
        data: req.user,
    })
})

export default router
// 1 : 30