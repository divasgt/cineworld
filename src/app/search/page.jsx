"use client"
import MediaCard from "@/components/MediaCard"
import { MediaContainer } from "@/components/MediaContainer"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchResults, setSearchResults] = useState([])
  
  useEffect(() => {
    const query = searchParams.get('q') || ""
    
    async function fetchSearchResults() {
      if (query) {
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
          const data = await res.json()
          setSearchResults(data.results)
          console.log("Fetched search results data: ", data)
        } catch(err) {
          console.error("Error fetching search results:", err)
          setSearchResults([])
        }
      } else {
        // If query is empty, clear search results
        setSearchResults([])
      }
    }
    fetchSearchResults()
  }, [searchParams])

  return (
  <div className="px-24">
    <MediaContainer title="Search Results">
      <Suspense fallback={<Loading />} >
        {searchResults.map(item => (
          <MediaCard key={item.id} item={item} isMovie={item.media_type==="movie"} layoutType="grid" />
        ))}
        {/* {JSON.stringify(searchResults)} */}
      </Suspense>
    </MediaContainer>
  </div>
  )
}

function Loading() {
  return (
  <div className="loading animate-pulse grid-span">Searching...</div>
  )
}