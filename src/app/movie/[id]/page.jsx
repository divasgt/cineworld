"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function moviePage() {
  const {id} = useParams()
 	const [isloading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
  const [detailsData, setDetailsData] = useState(null)

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setError(null)
				setIsLoading(true)
        const url = `/api/details/movie/${id}`
        const res = await fetch(url)

        if (!res.ok) {
          throw new Error(`API failed with status ${res.status}`)
        }
        
        const result = await res.json()
        setDetailsData(result)
      } catch(err) {
        console.error("Error fetching cinema data: ", err)
				setError("Failed to load content due to some error.")
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchMovieDetails()
  }, [])
  
  
  return (
  <div id="detailscontainer">
    <div className="poster">
      <img src={"a"} alt="" />
    </div>


    <div>movie page</div>
    <p>{JSON.stringify(detailsData)}</p>
  </div>
  )
}