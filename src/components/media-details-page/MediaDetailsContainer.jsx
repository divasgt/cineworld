import { fetchFromTmdb } from "@/lib/tmdb";
import Image from "next/image";
import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE_URL } from "@/utils/constants";
import "@/styles/details.css";
import TrailerBtn from "@/components/media-details-page/TrailerBtn";
import WatchlistBtn from "@/components/media-details-page/WatchlistBtn";
import AskAIBtn from "@/components/media-details-page/AskAIBtn";
import { notFound } from "next/navigation";

function getAgeRating(detailsData, type) {
  if (type==="movie" && detailsData.release_dates) {
    const inRelease = detailsData.release_dates.results.find(r => r.iso_3166_1 === 'IN')

    if (inRelease && inRelease.release_dates.length > 0) {
      return inRelease.release_dates[0].certification || 'NR'
    }
  } else if (type === 'tv' && detailsData.content_ratings) {
    const inRating = detailsData.content_ratings.results.find(r => r.iso_3166_1 === 'IN')

    if (inRating) {
      return inRating.rating || 'NR'
    }
  }

  return detailsData.adult ? '18+' : 'All Ages'
}

export default async function MediaDetailsContainer({type, id}) {
  // Fetch data directly instead of calling the API route
  let detailsData
  try {
    detailsData = await fetchFromTmdb(`/${type}/${id}`, "detailsPage")
  } catch (err) {
    if (err.message.includes('404')) notFound()
    throw err // For other errors, the nearest error.jsx page will be shown
  }
  
  const releaseYear = (detailsData.release_date || detailsData.first_air_date || '').slice(0, 4)
  const ageRating = getAgeRating(detailsData, type)
  const lengthOrSeasons = type === 'movie'
    ? `${Math.floor(detailsData.runtime / 60)}h ${detailsData.runtime % 60}m`
    : `${detailsData.number_of_seasons} Season${detailsData.number_of_seasons > 1 ? 's' : ''}`
  const typeLabel = type === 'movie' ? 'Movie' : 'TV Show'  
  
  return (
  <>
  {detailsData.backdrop_path ? 
    <div className="fixed z-[-1] top-0 right-0 bottom-0 left-0">
      <Image
        className="w-full h-full object-cover scale-110"
        src={`${IMAGE_BASE_URL}w1280${detailsData.backdrop_path}`}
        alt="Backdrop Image"
        width={1280}
        height={720}
        priority
      />
      <div className="absolute inset-0 bg-black/70"></div>
    </div>
    :
    ""
  }
  
  <div id="detailsContainer" className="details-container relative py-10 px-24 z-0">
      
    {/* <div className="w-full p-20 pt-[100px] rounded-lg animate-pulse flex items-center justify-center text-lg">
      Loading...
    </div> */}

    <div className="poster">
      <Image
        // className="w-full h-full object-cover block"
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
        <span className="age-rating">{ageRating}</span> • 
        <span className="genres">{detailsData.genres?.map(g => (
          <span className="genre-badge" key={g.id}>{g.name}</span>
        ))}</span>
      </p>
      <div className="star-rating">
        <span className="star">★</span>
        <span className="rating-value">{detailsData.vote_average.toFixed(1)}</span>
        {/* <span className="out-of-10">/ 10</span> */}
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
    

    {/* <p>{JSON.stringify(detailsData)}</p> */}
  </div>
  </>
  )
}
