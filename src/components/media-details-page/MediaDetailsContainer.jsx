import { fetchFromTmdb } from "@/lib/tmdb";
import Image from "next/image";
import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE_URL } from "@/utils/constants";
import TrailerBtn from "@/components/media-details-page/TrailerBtn";
import WatchlistBtn from "@/components/media-details-page/WatchlistBtn";
import AskAIBtn from "@/components/media-details-page/AskAIBtn";
import { notFound } from "next/navigation";
import { MdCalendarMonth } from 'react-icons/md';
import { HiClock } from 'react-icons/hi2';
import { MdStar } from 'react-icons/md';
import WatchProviders from "./WatchProviders";
import CastSection from "./CastSection";
import Similars from "./Similars";
import { MediaContainer } from "../MediaContainer";

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
  <div className="py-10 px-12 md:px-24 z-0">
    {detailsData.backdrop_path ? 
      <div className="fixed z-[-1] top-0 right-0 bottom-0 left-0 blur-3xl">
        <Image
          className="w-full h-full object-cover scale-110"
          src={`${IMAGE_BASE_URL}w1280${detailsData.backdrop_path}`}
          alt="Backdrop Image"
          width={1280}
          height={720}
          priority
        />
        <div className="absolute inset-[-20] bg-black/70"></div>
      </div>
      : ""
    }

    <div id="detailsContainer" className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-10 relative text-gray-300">

      <div className="rounded-lg overflow-hidden shadow-lg self-start md:max-w-full max-w-[300px]">
        <Image
          className="w-full h-full object-cover"
          src={detailsData.poster_path ?
            `${IMAGE_BASE_URL}w342${detailsData.poster_path}` :
            PLACEHOLDER_IMAGE_URL(300, 450)}
          alt={detailsData.name || detailsData.title}
          width={300}
          height={450}
          priority
          unoptimized={!detailsData.poster_path}
        />
      </div>

      <div className="flex flex-col gap-5 self-start">
        <h1 className="text-[48px] font-bold text-white leading-tight ml-[-3px]">{detailsData.name || detailsData.title} ({releaseYear})</h1>

        <div className="flex items-center gap-4 text-gray-400 font-medium flex-wrap mb-2">
          <span className="text-red-600 mr-4">{typeLabel}</span>
          <span className="flex gap-2 items-center">
            <MdStar className="text-amber-500 text-2xl mb-0.5" />
            <span className="text-md  tracking-wide">{detailsData.vote_average.toFixed(1)}</span>
          </span> • 
          <span>{lengthOrSeasons}</span> • 
          <span className="border border-gray-400 rounded px-2 py-0.5 text-sm">{ageRating}</span>
        </div>

        {/* Genres: */}
        <div className="flex flex-wrap gap-2 items-center mb-2">
          {detailsData.genres?.map(g => (
            <span className="bg-gray-700/50 border border-gray-500/10 backdrop-blur-xl py-0.5 px-3 rounded-full text-sm" key={g.id}>{g.name}</span>
          ))}
        </div>

        {/* <div className="flex items-baseline gap-2 text-lg mt-1 mb-2"> */}
          
          {/* <span className="text-sm text-gray-500">({detailsData.vote_count.toLocaleString()} votes)</span> */}
        {/* </div> */}

        <div className="flex gap-4 flex-wrap mt-4 mb-3">
          <TrailerBtn />
          <WatchlistBtn />
          <AskAIBtn />
        </div>

        <WatchProviders detailsData={detailsData}/>

        {detailsData.tagline ? <p className="italic text-gray-300 mt-8">"{detailsData.tagline}"</p> : null}
        {/* <h2 className="text-2xl font-semibold mt-4 text-white">Overview</h2> */}
        <p className="max-w-3xl">{detailsData.overview}</p>

      </div>
    </div>

    {detailsData.credits.cast.length>0 &&
      <CastSection data={detailsData.credits.cast} />
    }

    {detailsData.similar.results.length>0 &&
      <MediaContainer title="More like this" id="" type="horizontal-container">
        <Similars data={detailsData.similar.results} type={type} />
      </MediaContainer>
    }

    {detailsData.recommendations.results.length>0 &&
      <MediaContainer title="You may also like" id="" type="horizontal-container">
        <Similars data={detailsData.recommendations.results} type={type} />
      </MediaContainer>
    }
  </div>
  )
}
