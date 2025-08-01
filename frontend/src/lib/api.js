import { axiosInstance } from "./axios"

export const signup = async (signupData) =>{
    const res = await axiosInstance.post("/auth/signup", signupData);
    return res.data;
}

export const login = async (loginData) =>{
    const res = await axiosInstance.post("/auth/login", loginData);
    return res.data;
}

export const logout = async () =>{
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
}

export const getAuthUser = async ()=>{
   try { // we use try block bcoz after hit the logout it will redirect to login page
     const res = await axiosInstance.get("/auth/me");
    return res.data;
   } catch (error) {
    console.log("Error in getauthuser",error);
    return null;
   }
}

export const completeOnboarding = async (userData)=>{
    const res = await axiosInstance.post("/auth/onboarding", userData);
    return res.data;
}


export async function getUserFriends(){
    const res = await axiosInstance.get("/users/friends");
    return res.data;
}

export async function getRecommendedUsers (){
    const res = await axiosInstance.get("/users");
    return res.data;
}

export async function getOutgoingFriendRqst (){
    const res = await axiosInstance.get("/users/outgoing-friend-requests");
    return res.data;
}

export async function sendFriendRqst (userId){
    const res = await axiosInstance.post(`/users/friend-request/${userId}`);
    return res.data;
}

export async function getFriendRqsts (){
    const res = await axiosInstance.get(`/users/friend-requests`);
    return res.data;
}

export async function acceptFriendRqst (requestId){
    const res = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
    return res.data;
}

export async function getStreamToken (){
    const res = await axiosInstance.get(`/chat/token`);
    return res.data;
}

