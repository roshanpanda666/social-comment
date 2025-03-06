"use client"
import Link from "next/link"
import { useState } from "react"
export default function Register(){

    const[name,setname]=useState("")
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const[error,seterror]=useState("")

    const handlesubmit=async(e)=>{
       e.preventDefault()
       if(!name||!email||!password){
        seterror("Please fill all the fields")
        return
       }
       else{
        seterror("")
       }

       try {
         const res=await fetch("api/register",
         {
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                name,email,password
            })
        })
        if (res.ok){
            let form=e.target
            form.reset()
        }
        else{
            console.log("user registration failed");
        }
       } catch (error) {
        console.log();
       }
    }

 
    return(
        <div>
            hello world
            <div className="text-white flex justify-center items-center h-screen">

                <div className="w-[40rem] border-2 border-b-white h-[24rem] rounded-2xl">
                    <div className="text-center text-white mt-16">
                        Enter the details
                    </div>

                    <div className="flex justify-center items-center mt-10">
                        <input 
                        onChange={(e)=>setname(e.target.value)}
                        type="text" placeholder="User-name" className="border-white text-white border-2"/>
                    </div>
                    
                    <div className="flex justify-center items-center mt-10">
                        <input onChange={(e)=>setemail(e.target.value)} type="text" placeholder="E-mail" className="border-white text-white border-2"/>
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <input onChange={(e)=>setpassword(e.target.value)} type="password" placeholder="Password" className="border-white text-white border-2"/>
                    </div>
                    <div className="text-center flex justify-center items-center h-10">
                        <button onClick={handlesubmit} className="mt-5 hover:border-white hover:border-2 w-28">Register</button>
                    </div>

                    <div className="text-center mt-3 relative">
                        <div>
                            already have an account?<span className="border-b-[1.5px] border-gray-5"><Link href={"/"}><button>Login</button></Link></span>
                        </div>
                    </div>
                   <div>
                    {error&&(
                        <div className="bg-red-500 w-32 flex text-center justify-center items-center">
                            {error}
                        </div>
                    )
                    }
                   
                   </div>
                </div>
            </div>
        </div>
    )
}