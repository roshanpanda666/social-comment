"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Userinfo = () => {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("/api/getusercomment")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setComments(data.comments); // now using array of comments
        }
      });
  }, []);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="text-white flex justify-center items-center h-screen">
        <div className="w-[40rem] border-2 border-b-white h-auto py-10 px-6 rounded-2xl bg-black shadow-xl">
          <div className="text-center text-xl font-bold mb-6">User Details</div>

          <div className="flex justify-center items-center mb-3">
            <div className="font-semibold">User:</div>
            <span className="ml-2">{session?.user?.name}</span>
          </div>

          <div className="flex justify-center items-center mb-3">
            <div className="font-semibold">E-mail:</div>
            <span className="ml-2">{session?.user?.email}</span>
          </div>

          <div className="flex justify-center items-start mb-3">
            <div className="font-semibold">Comments:</div>
            <div className="ml-2 flex flex-col text-left max-w-md">
              {comments.length > 0 ? (
                comments.map((c, i) => (
                  <p key={i} className="text-sm text-gray-200">
                    • {c}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-400">No comments yet</p>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              className="text-center bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg text-white transition duration-200"
              onClick={() => signOut()}
            >
              Log Out
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <Link href="/comment">
              <div className="text-blue-400 underline hover:text-blue-600">
                Go to Comment Page
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userinfo;
