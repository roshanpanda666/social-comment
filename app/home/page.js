"use client"
import React from 'react'
import useSWR from 'swr'

// SWR fetcher function
const fetcher = async (url) => {
  const res = await fetch(url, { cache: "no-cache" })
  const data = await res.json()
  return data.result || []
}

const Home = () => {
  const { data: datalist, error, isLoading } = useSWR('/api/userdata', fetcher, {
    refreshInterval: 5000, // auto refresh every 5s
  })

  if (error) return <div className="text-red-500">Failed to load data 😢</div>
  if (isLoading) return <div className="text-white">Loading... 🔄</div>

  // Flatten the data to extract individual comments with user info and timestamp
  const flattenedComments = datalist.flatMap((item) =>
    item.comments?.map((comment) => ({
      userId: item._id,
      name: item.name,
      email: item.email,
      text: typeof comment === 'string' ? comment : comment.text,
      createdAt: typeof comment === 'string' ? null : comment.createdAt,
    })) || []
  ).reverse() // latest comment first

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-white mb-8">Social Comments</h1>

      <div className="w-full max-w-2xl flex flex-col gap-4">
        {flattenedComments.map((item, index) => (
          <div
            key={`${item.userId}-${index}`}
            className="bg-gray-800 hover:bg-gray-700 transition-all p-6 rounded-2xl shadow-md border border-gray-700"
          >
            <div className="text-white text-xl font-semibold mb-1">{item.name}</div>
            <div className="text-gray-400 text-sm mb-1">{item.email}</div>
            {item.createdAt && (
              <div className="text-gray-500 text-xs mb-2">
                🕒 {new Date(item.createdAt).toLocaleString()}
              </div>
            )}
            <div className="text-cyan-500 text-2xl">💬 {item.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
