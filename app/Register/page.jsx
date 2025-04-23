"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";
export default function Register() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState("");
    const [comment, setcomment] = useState("");


    const router=useRouter()
    const handlesubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            seterror("Please fill all the fields");
            return;
        } else {
            seterror("");
        }

        try {

            const resUserExists=await fetch('api/userexists',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email})
            })

            const {user}= await resUserExists.json()




            if(user){
                seterror("user exists")
            }
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, comment })
            });

            if (res.ok) {
                // Reset state to clear the input fields
                setname("");
                setemail("");
                setpassword("");
                setcomment("")

                router.push("/")
            } else {
                console.log("User registration failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="text-white flex justify-center items-center h-screen">
            <div className="w-[40rem] border-2 border-b-white h-[24rem] rounded-2xl">
                <div className="text-center text-white mt-16">register yourself</div>

                <form onSubmit={handlesubmit} className="flex flex-col items-center mt-10">
                    <input
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        type="text"
                        placeholder="User-name"
                        className="border-white text-white border-2 p-2 mb-4 w-64 rounded"
                    />

                    <input
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        type="email"
                        placeholder="E-mail"
                        className="border-white text-white border-2 p-2 mb-4 w-64 rounded"
                    />

                    <input
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="border-white text-white border-2 p-2 mb-4 w-64 rounded"
                    />

                    <button 
                        type="submit"
                        className="mt-5 hover:border-white hover:border-2 w-28 p-2 rounded"
                    >
                        Register
                    </button>
                </form>

                {error && (
                    <div className="bg-red-500 text-white text-center p-2 mt-2 w-64 mx-auto rounded">
                        {error}{comment}
                    </div>
                )}

                <div className="text-center mt-3">
                    Already have an account?{" "}
                    <span className="border-b-[1.5px] border-gray-500">
                        <Link href="/">
                            <button className="text-blue-400">Login</button>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}
