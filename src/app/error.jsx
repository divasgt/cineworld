'use client'

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center h-full grow">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-red-500 mb-6">Failed to load data. Please try again later.</p>
      <button
        onClick={() => reset()}
        className="bg-gray-600 hover:bg-gray-500 cursor-pointer text-white px-4 py-2 rounded"
      >
        Try again
      </button>
    </div>
  )
}