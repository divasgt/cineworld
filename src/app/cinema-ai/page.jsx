"use client"

import { useEffect, useRef, useState } from "react"
import { IoMdSend } from 'react-icons/io';
import Markdown from "react-markdown";

export default function AskAIPage() {
  const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Welcome to CineWorld! I'm CineBot, your personal movie and TV show assistant. Ask me anything about cinema or request some recommendations!",
    },
  ]);
  const messagesEndRef = useRef(null)

  // scroll to bottom when to the last message
  useEffect(() => {
    // added block: "end" to scroll into view at the bottom of the window
    messagesEndRef.current?.scrollIntoView({behavior: "smooth", block: "end"})
  }, [messages])

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
    // setError(null)
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
      const errorMessage = err instanceof Error ? err.message : 'An unknown error.'
      console.error("Failed to get response from AI", err)
      const errorBotMessage = {
        role: "bot",
        // content: `Sorry, I've encountered an error.`,
        content: `Sorry, I've encountered an error: ${errorMessage}`
      }
      setMessages(prev => [...prev, errorBotMessage])

    } finally {
      setIsLoading(false)
    }
  }

  const messageElements = messages.map((message, index) => (
    <div
      key={index}
      className={`py-2 px-3 backdrop-blur-xl max-w-xl rounded-xl whitespace-pre-wrap ${message.role==="bot" ? "bg-gray-600/20 self-start rounded-bl-none" : "bg-blue-800/50 self-end rounded-br-none"}`}
    >
      <Markdown>{message.content}</Markdown>
    </div>
  ))
  

  return (
  <main className="flex flex-col h-[calc(100vh-70px)] px-4 lg:px-52">
    <div className="flex items-baseline justify-center gap-4 mt-4 mb-4">
      <h1 className="text-2xl font-semibold inline-block">Cinema AI</h1>
      <p className="inline-block text-lg text-gray-300">Ask AI to find your perfect watch!</p>
    </div>

    <div className="chat-window flex-1 w-full mx-auto rounded-2xl overflow-y-auto">
      <div className="messages-container flex flex-col gap-3 px-4">
        {messageElements}
        {isLoading &&
          <div className="py-2 px-3 backdrop-blur-xl max-w-xl rounded-xl bg-gray-600/20 self-start rounded-bl-none">
            <div className="animate-pulse">CineBot is typing...</div>
          </div>
        }
      </div>
      <div ref={messagesEndRef} />
    </div>

    <form onSubmit={handleSubmit} className="flex gap-4 w-full max-w-2xl mx-auto py-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything cinema"
        className="bg-gray-800/30 backdrop-blur-2xl border border-white/10 rounded-xl px-6 py-2.25 flex-1 outline-none focus:border-white/30 "
      />
      <button
        type="submit"
        className="text-sm text-white cursor-pointer px-3.5 py-1.25 bg-gray-500/40 backdrop-blur-2xl border border-white/10 hover:bg-gray-700/70 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={isLoading || !input.trim()}
        title="Send"
      >
        {isLoading ?
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          // : "Send"
          : <IoMdSend className="w-5 h-5"/>
        }
      </button>
    </form>
  </main>
  )
}