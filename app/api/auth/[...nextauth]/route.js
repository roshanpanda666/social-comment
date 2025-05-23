import { connectionSRT } from "@/app/lib/db";
import User from "@/app/lib/model/schema";
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import mongoose from "mongoose";
export const authOption={
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{},


            async authorize(credentials){
                const{email,password}=credentials
                

                try{
                    await mongoose.connect(connectionSRT)
                    const user=await User.findOne({email})
                    if(!user){
                        return null 
                    }

                    const passwordMatch=await bcrypt.compare(password,user.password)
                    if(!passwordMatch){
                        return null

                    }
                    return user
                }catch(error){
                    console.log("error:",error);
                }   
            },

        }),
    ],
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/"
    }

};

const handler = nextAuth(authOption)

export {handler as GET,handler as POST}