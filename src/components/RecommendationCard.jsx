import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

export default function RecommendationCard({ item }) {
  const placeholderWidth = 100
  const placeholderHeight = 150

  const hasTmdbData = item.tmdbData && item.tmdbData.id

  const posterPath = hasTmdbData
    ? `${IMAGE_BASE_URL}w342${item.tmdbData.poster_path}`
    : PLACEHOLDER_IMAGE_URL(placeholderWidth, placeholderHeight)

  const rating = (hasTmdbData && item.tmdbData.vote_average) ? 
    item.tmdbData.vote_average.toFixed(1)
    : 'N/A'
    
  const linkPath = hasTmdbData
    ? `/${item.media_type}/${item.tmdbData.id}`
    : `/search?q=${item.title}`

  function CardContent() {
    return (
    <div className={`flex gap-4 p-3 rounded-lg bg-gray-600/20 backdrop-blur-xl w-full max-w-2xl ${!hasTmdbData ? "opacity-70" : ""}`}>
      <div className="shrink-0">
        <Image
          src={posterPath}
          alt={`Poster for ${item.title}`}
          className="block w-[100px] h-auto aspect-[2/3] object-cover bg-gray-700 rounded-md"
          height={placeholderHeight}
          width={placeholderWidth}
          unoptimized={!hasTmdbData || !item.tmdbData.poster_path}
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold" title={item.title}>
          {item.title} {item.release_year && `(${item.release_year})`}
        </h3>
        <div className="text-sm text-gray-400 capitalize flex gap-2">
          <span>{item.type}</span> • 
          <span>{item.genres && `${item.genres.join(', ')}`}</span> • 
          <span className="flex items-center gap-1 text-xs">
            <span className="text-yellow-400 text-lg leading-4 -mt-0.5">★</span>
            <span className="font-">{rating}</span>
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-200">{item.reason}</p>
      </div>
    </div>
    )
  }

  return (
    <Link href={linkPath} className="transition-transform hover:scale-105 duration-300 ease-in-out hover:shadow-lg hover:shadow-black/40 backdrop-blur-xl shadow">
      <CardContent />
    </Link>
  )
}