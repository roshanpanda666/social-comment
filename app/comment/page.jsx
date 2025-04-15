"use client";
import React, { useRef } from "react";

const Page = () => {
  const commentRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = commentRef.current.value;
    alert(comment);

    try {
      const response = await fetch("/api/commentpart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ comment }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Data added successfully ✅");
        commentRef.current.value = ""; // optional: clear the input
      } else {
        alert("Failed to add data ❌");
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
          Leave a Comment
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
