"use client"
import React from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
const Userinfo = () => {    
  const {data:session}=useSession()

  return (
    <div>
      <div>
      <div className="text-white flex justify-center items-center h-screen">

<div className="w-[40rem] border-2 border-b-white h-[20rem] rounded-2xl">
    <div className="text-center text-white mt-16">
        user details
    </div>
    
    <div className="flex justify-center items-center mt-10">
        <div>user:</div><span className='ml-2'>{session?.user?.name}</span>
    </div>
    <div className="flex justify-center items-center mt-3">
    <div>e-mail:</div><span className='ml-2'>{session?.user?.email}</span>
    </div>
    <div className='flex justify-center items-center'>
    <div className='text-center mt-6 bg-red-500 w-32 cursor-pointer'onClick={()=>signOut()}>log out</div>

    </div>
    <Link href="/comment">
      
      <div className="text-blue-400">comment</div>
    </Link>
</div>
</div>
      </div>
    </div>
  )
}

export default Userinfo
