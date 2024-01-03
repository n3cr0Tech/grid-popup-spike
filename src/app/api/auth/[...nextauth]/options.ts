import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { GoogleProfile } from "next-auth/providers/google";
import axios, { AxiosResponse } from "axios";
import { ThrowExpression } from "@/app/utils/errorHandler";
import { GetEmployeeRecordURL } from "@/app/utils/envVariableManager";

const DEFAULT_ROLE = "customer";

function ensureGoogleIDHasValue(): string{
    let result = process.env.GOOGLE_ID ? process.env.GOOGLE_ID : "foo-google-id";
    if(!process.env.GOOGLE_ID){
        console.error(`ERROR! process.env.GOOGLE_ID value not found, using default value: ${result}`);
    }
    
    return result;
}

function ensureGoogleSecretHasValue(): string{
    let result = process.env.GOOGLE_SECRET ? process.env.GOOGLE_SECRET : "foo-google-secret";
    if(!process.env.GOOGLE_ID){
        console.error(`ERROR! process.env.GOOGLE_SECRET value not found, using default value: ${result}`);
    }    
    return result;
}

// returns either "customer" OR "employee" OR "admin"
async function GetRoleFromMyServer(_email: string): Promise<string>{
    let api_key_header = process.env.AUTH_TOKEN_HEADER_NAME ?? ThrowExpression("ERROR: Null value for env variable AUTH_TOKEN_HEADER_NAME");
    let api_key = process.env.SERVER_API_KEY ?? ThrowExpression("ERROR: Null value for env variable SERVER_API_KEY");
    let DEFAULT_ROLE = "customer"; //assume user is just a customer

    var headers = {        
        headers: {} as any
    };


    headers.headers['Content-Type'] = 'application/json';
    headers.headers[api_key_header] = api_key;

    const requestOptions = {            
        email: _email        
    };
  
    console.log(`Making axios.post to ${GetEmployeeRecordURL()}`);       
    try{
        const response = await axios.post(GetEmployeeRecordURL(), requestOptions, headers);           
        if(response.status === 200){            
            let result = response.data.role;
            console.log(`!!! result: ${result}`);   
            return result;
        }
    }catch(error){
        console.log(`Response status code: ${error}`);        
    }    
    return DEFAULT_ROLE;
}


export const options: NextAuthOptions = {       
    secret: process.env.AUTH_SECRET ?  process.env.AUTH_SECRET : "foo-auth-secret",
    providers: [
        GoogleProvider({
            profile(profile: GoogleProfile){
                console.log("!!! Google profile: ");
                console.log(profile);
                return {
                    ...profile,                    
                    role: DEFAULT_ROLE, // assume they're just a customer, assign the role in the jwt() callback below bcuz it's async
                    id: profile.sub.toString(),
                    image: profile.avatar_url,
                }
            },
            clientId: ensureGoogleIDHasValue(),
            clientSecret: ensureGoogleSecretHasValue(),
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })        
    ],        
    callbacks:{
        // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
        async jwt({ token, user }){
            let role = DEFAULT_ROLE
            if(user){
                if(user.email){
                    role = await GetRoleFromMyServer(user.email);
                    console.log(`!!! options got role from Server: ${role}`);
                }
                user.role = role;
                token.role = user.role;                
            }
            return token;
        },
        //if you wnat to use the role in client components
        async session({ session, token }){
            if(session?.user){
                session.user.role = token.role;                
            }
            return session;
        },

        // redirects for sign in and sign out
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            // console.log(`!!! redirect url: ${url}... baseUrl:${baseUrl}`);
            // let result = baseUrl;
            // if (url.startsWith("/")){                
            //     result = `${baseUrl}${url}`;
            //     console.log(`!!! clause 1`);
            // } 
            // // Allows callback URLs on the same origin
            // else if (new URL(url).origin === baseUrl){
            //     result = url;
            //     console.log(`!!! clause 2`);
            // }             
            // console.log(`!!! result url: ${result}`);
            // return result;
            
            return url.startsWith(baseUrl) ? url : baseUrl;
        }
    }
}

