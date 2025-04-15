"use client";
import React, { useRef, useEffect, useState } from "react";

const Page = () => {
  const commentRef = useRef();
  const [loading, setLoading] = useState(true);
  const email = "saby@example.com"; // Replace with dynamic user email later

  // Fetch comment on load
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await fetch(`/api/commentpart?email=${email}`);
        const data = await res.json();
        if (data.success && commentRef.current) {
          commentRef.current.value = data.comment;
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching comment:", err);
        setLoading(false);
      }
    };

    fetchComment();
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
        alert("Comment updated successfully ✅");
      } else {
        alert("Failed to update comment ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong 💥");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-transparent border-white border-2 p-6 rounded-lg shadow-md w-[24rem]"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-white">
          {loading ? "Loading..." : "Edit Your Comment"}
        </h2>

        <input
          type="text"
          ref={commentRef}
          placeholder="Type your comment..."
          className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Save Comment
        </button>
      </form>
    </div>
  );
};

export default Page;
