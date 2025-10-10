"use client"

import { useState } from "react"

export default function AskAIPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Welcome to CineWorld! I'm CineBot, your personal movie and TV show assistant. Ask me anything about cinema or request some recommendations!",
    },
  ]);

  async function handleSubmit(e) {
    e.preventDefault()

    const query = input.trim()
    if (!query) return

    const userMessage = {
      role: "user",
      content: query,
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setError(null)
    setInput("")

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({query: query, messages: messages})
      })

      if (!response.ok) {
        throw new Error("API request failed")
      }
      
      const result = await response.json()
      const botMessage = {
        role: "bot",
        content: result.data,
      }
      setMessages((prev) => [...prev, botMessage])
      console.log(result.data)

    } catch(err) {
      // const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.'
      console.error("Failed to get response from AI", err)
      const errorBotMessage = {
        role: "bot",
        content: `Sorry, I've encountered an error.`,
        // content: `Sorry, I've encountered an error: ${errorMessage}`
      }
      setMessages(prev => [...prev, errorBotMessage])

    } finally {
      setIsLoading(false)
    }
  }
  
  return (
  <main className="mx-24 mt-12 flex flex-col items-center h-[85vh]">
    <div className="flex items-baseline justify-center gap-4 border-b-2 border-red-600">
      <h1 className="text-2xl font-semibold inline-block">Cinema AI</h1>
      <p className="inline-block text-lg text-gray-300">Ask AI to find your perfect watch!</p>
    </div>

    <div className="chat-container flex-1 w-full h-full  rounded-2xl relative">
      <div>
        chats: <br />
      </div>

      <form onSubmit={handleSubmit} className="absolute bottom-12 right-1/2 translate-x-1/2 flex gap-4 w-full max-w-2xl " >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything cinema"
          className="bg-gray-800/30 border border-white/10 rounded-xl px-6 py-2.25 flex-1 outline-none focus:border-white/30"
        />
        <button
          type="submit"
          className="text-sm text-white cursor-pointer px-3.5 py-1.25 bg-gray-500/30 border border-white/10 hover:bg-gray-700/70 rounded-xl transition"
          disabled={isLoading}
        >Send</button>
      </form>
    </div>
  </main>
  )
}