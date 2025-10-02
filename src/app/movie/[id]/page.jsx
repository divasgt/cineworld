"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE_URL } from "@/utils/constants";
import "@/styles/details.css";
import TrailerBtn from "./components/TrailerBtn";
import WatchlistBtn from "./components/WatchlistBtn";
import AskAIBtn from "./components/AskAIBtn";

function getAgeRating(detailsData, type) {
  if (type==="movie" && detailsData.release_dates) {
    const inRelease = detailsData.release_dates.results.find(r => r.iso_3166_1 === 'IN')

    if (inRelease && inRelease.release_dates.length > 0) {
      return inRelease.release_dates[0].certification || 'NR'
    }
  } else if (type === 'tv' && data.content_ratings) {
    const inRating = data.content_ratings.results.find(r => r.iso_3166_1 === 'IN')

    if (inRating) {
      return inRating.rating || 'NR'
    }
  }

  return detailsData.adult ? '18+' : 'All Ages'
}

export default function moviePage() {
  const {id} = useParams()

  // state variables
 	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
  const [detailsData, setDetailsData] = useState({})

  // constants
  const type = "movie";
  const releaseYear = (detailsData.release_date || detailsData.first_air_date || '').slice(0, 4)
  const ageRating = getAgeRating(detailsData, type)
  const lengthOrSeasons = type === 'movie'
    ? `${Math.floor(detailsData.runtime / 60)}h ${detailsData.runtime % 60}m`
    : `${detailsData.number_of_seasons} Season${detailsData.number_of_seasons > 1 ? 's' : ''}`
  const typeLabel = type === 'movie' ? 'Movie' : 'TV Show'

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
        console.log(result)
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
  <main className="main-content">
    <div id="detailsContainer" className="details-container py-8 px-24">

      {isLoading ? 
        <div className="w-full p-20 pt-[100px] rounded-lg animate-pulse flex items-center justify-center text-lg">
          Loading...
        </div>
        
        :
        <>
        <div className="poster">
          <Image
            className="w-full h-auto block"
            src={detailsData.poster_path ?
              `${IMAGE_BASE_URL}w342${detailsData.poster_path}` :
              PLACEHOLDER_IMAGE_URL(300, 450)}
            alt={detailsData.name || detailsData.title}
            width={300}
            height={450}
            priority={true}
          />
        </div>

        <div className="info">
          <h1 className="title">{detailsData.name || detailsData.title} ({releaseYear})</h1>
          <p className="meta-inline">
            <span className="type">{typeLabel}</span> • 
            <span className="length">{lengthOrSeasons}</span> • 
            <span className="age-rating">{ageRating}</span>
          </p>
          <div className="genres">{detailsData.genres.map(g => (
            <span className="genre-badge" key={g.id}>{g.name}</span>
          ))}</div>
          <div className="star-rating">
            <span className="star">★</span>
            <span className="rating-value">{detailsData.vote_average.toFixed(1)}</span>
            <span className="out-of-10">/ 10</span>
            <span className="total-votes">({detailsData.vote_count.toLocaleString()})</span>
          </div>

          <div className="btn-group">
            <TrailerBtn />
            <WatchlistBtn />
            <AskAIBtn />
          </div>

          <div className="watch-providers-title">Where to Watch
            {/* Todo */}
          </div>

          {detailsData.tagline ? <p className="tagline">"{detailsData.tagline}"</p> : null}
          <h2 className="overview-title">Overview</h2>
          <p className="overview">{detailsData.overview}</p>
        </div>
        </>
      }
      


      {/* <p>{JSON.stringify(detailsData)}</p> */}
    </div>
  </main>
  )
}