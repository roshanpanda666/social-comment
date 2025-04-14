import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const authOptopn={
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{},


            async authorize(credentials){
                const user={id:'1'}
                return user
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

const handlers = nextAuth(authOptopn)

export {handlers as GET,handlers as POST}