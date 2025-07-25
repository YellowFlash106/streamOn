import {StreamChat } from "stream-chat"
import "dotenv/config"

const apiKey =  process.env.STEAM_API_KEY
const apiSecret =  process.env.STEAM_API_SECRET

if(!apiKey || !apiSecret){
    console.log("Stream API key or Secret in missing");
}
const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData
    } catch (error) {
        console.log('Error upserting Stream user',error);
        
    }
}

export const genStreamToken = (userId) =>{
    
}