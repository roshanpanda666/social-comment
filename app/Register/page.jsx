import Link from "next/link"
export default function Register(){
    return(
        <div>
            hello world
            <div className="text-white flex justify-center items-center h-screen">

                <div className="w-[40rem] border-2 border-b-white h-[24rem] rounded-2xl">
                    <div className="text-center text-white mt-16">
                        Enter the details
                    </div>

                    <div className="flex justify-center items-center mt-10">
                        <input type="text" placeholder="User-name" className="border-white text-white border-2"/>
                    </div>
                    
                    <div className="flex justify-center items-center mt-10">
                        <input type="text" placeholder="E-mail" className="border-white text-white border-2"/>
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <input type="password" placeholder="Password" className="border-white text-white border-2"/>
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <input type="password" placeholder="confirm Password" className="border-white text-white border-2"/>
                    </div>
                    <div className="text-center flex justify-center items-center h-10">
                        <button className="mt-5 hover:border-white hover:border-2 w-28">Register</button>
                    </div>

                    <div className="text-center mt-3 relative">
                        <div>
                            already have an account?<span className="border-b-[1.5px] border-gray-5"><Link href={"/"}><button>Login</button></Link></span>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}