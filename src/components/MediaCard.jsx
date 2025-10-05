'use client';
import "@/styles/MediaCard.css";
import { useRouter } from "next/navigation";
import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE_URL } from "@/utils/constants";
import Image from "next/image";

export default function MediaCard({item, isMovie, layoutType}) {
  const router = useRouter();
  
  const title = isMovie ? item.title : item.name;
  const releaseDate = isMovie ? item.release_date : item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';

  // Use placeholder size based on approximate card size
  const placeholderWidth = layoutType === 'horizontal' ? 130 : 140;
  const placeholderHeight = placeholderWidth * 1.5; // Maintain 2:3 ratio
  const posterPath = item.poster_path ? `${IMAGE_BASE_URL}w342${item.poster_path}` : PLACEHOLDER_IMAGE_URL(placeholderWidth, placeholderHeight);


  function handleCardClick() {
    console.log(`Clicked on ${isMovie ? 'Movie' : 'TV Show'} ID: ${item.id}`);
    router.push(`/${isMovie ? 'movie' : 'tv'}/${item.id}`);
  }

  return (
  <div className='card'
    onClick={handleCardClick}
  >
    <Image
     src={posterPath}
      alt={title}
      className="card-img"
      height={342}
      width={342}
      unoptimized={!item.poster_path}
      // onError={this.src=PLACEHOLDER_IMAGE_URL(placeholderWidth, placeholderHeight)}
    />
    <div className="card-body">
      <h3 className="card-title" title={title}>{title}</h3>
      <div className="year-and-rating-container">
        <div className="card-year">{year}</div>
        <div className="card-rating">
            <span className="star">★</span>
            <span>{rating !== 'N/A' ? rating : 'No Rating'}</span>
        </div>
      </div>
    </div>
  </div>
  )
}
