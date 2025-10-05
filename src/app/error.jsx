'use client'

export default function Error({ error, reset }) {

  return ( // Use flex-grow to make the error component fill the available space
  <div className="flex flex-col items-center justify-center h-full grow">
    <h1 className="text-3xl font-bold text-red-500">Something Went Wrong</h1>
    <p className="mt-4">Couldn't load the page. Please try again.</p>
    <button
      onClick={reset}
      className="mt-6 bg-gray-600 hover:bg-gray-500 cursor-pointer text-white px-4 py-2 rounded"
    >
      Try Again
    </button>
  </div>
  )
}