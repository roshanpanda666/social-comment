"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {
  const commentRef = useRef();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const email = "saby@example.com"; // Replace with actual dynamic email

  // Fetch all comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/commentpart?email=${email}`);
        const data = await res.json();
        if (data.success) {
          setComments(data.comments);
          if (commentRef.current) {
            commentRef.current.value = data.comments[data.comments.length - 1] || "";
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching comment:", err);
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = commentRef.current.value;

    try {
      const response = await fetch("/api/commentpart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, comment }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Comment added ✅");
        setComments((prev) => [...prev, comment]);
        commentRef.current.value = "";
      } else {
        alert("Failed to add comment ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong 💥");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-transparent border-white border-2 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          {loading ? "Loading..." : "Add a Comment"}
        </h2>

        <input
          type="text"
          ref={commentRef}
          placeholder="Type your comment..."
          className="w-full border px-3 py-2 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Add Comment
        </button>
      </form>

      <div className="mt-8 w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">Previous Comments:</h3>
        <ul className="space-y-2">
          {comments.map((c, index) => (
            <li key={index} className="bg-gray-800 p-2 rounded">
              {c}
            </li>
          ))}
        </ul>
      </div>

      <Link href="/dashboard" className="mt-6 text-blue-400 underline">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Page;
