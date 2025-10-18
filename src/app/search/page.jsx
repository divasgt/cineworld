"use client"
import H2ForSection from "@/components/H2ForSection"
import MediaCard from "@/components/MediaCard"
import { MediaContainer } from "@/components/MediaContainer"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ""
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    
    async function fetchSearchResults() {
      if (query) {
        setIsLoading(true)
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
          const data = await res.json()
          setSearchResults(data.results)
          console.log("Fetched search results data: ", data)
        } catch(err) {
          console.error("Error fetching search results:", err)
          setSearchResults([])
        } finally {
          setIsLoading(false)
        }
      } else {
        // If query is empty, clear search results
        setSearchResults([])
      }
    }
    fetchSearchResults()
  }, [query])

  return (
  <main className="w-full mx-auto px-5 md:px-10 lg:px-24 py-14">
    <H2ForSection title="Search Results" />
    {isLoading ? 
      <Loading />
      :
      (searchResults.length>0 && query) ? 
        <MediaContainer>
          {searchResults.map(item => (
              <MediaCard key={item.id} item={item} isMovie={item.media_type==="movie"} layoutType="grid" showInfo={true} />
            ))
          }
        </MediaContainer>
        : (query && searchResults.length===0) ?
          <div className="mt-24 grid-span text-center text-xl">No results found for your query.</div>
          :
          <div className="mt-24 grid-span text-center text-xl">Search any movie, tv show or anime etc.</div>
    }
  </main>
  )
}

function Loading() {
  return (
  <div className="mt-24 text-center font-semibold text-xl">
    <span className="shimmer-text">Searching...</span>
  </div>
  )
}