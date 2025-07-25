import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
    try {
        const currUserId = req.user.id;
        const currUser = req.user;
        const recommendedUsers = await User.find({
            $and: [
                {_id : {$ne : currUserId}},   // exclude current user
                {$id : {$nin : currUser.friends}},   // exclude current users friends
                {isOnboarded : true},
            ]
        })
        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.log('Error in getRecommendedUsers controller', error.message);
        res.status(500).json({
            success :false ,
            message : "Internal Server Error"
            })
    }
}

export async function getMyFriends(req, res) {
    
    try {
        const user = await User.findById(req.user.id)
        .select("friends")
        .populate("friends", "fullName profilepic  nativeLaguage learningLaguage");

        res.status(200).json(user.friends);
    } catch (error) {
    console.log('Error in getMyFriends controller', error.message);
    res.status(500).json({
            success :false ,
            message : "Internal Server Error"
            })
    }
}