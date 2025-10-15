'use client'
import H2ForSection from '@/components/H2ForSection'
import { useAuth } from '@/hooks/useAuth'
import { useWatchlist } from '@/hooks/useWatchlist'
import Loading from '../loading'
import { MediaContainer } from '@/components/MediaContainer'
import MediaCard from '@/components/MediaCard'

export default function WatchlistPage() {
  const { user, loading: authLoading } = useAuth()
  const { watchlist, loading } = useWatchlist(user?.id)

  if (authLoading) return <Loading />
  if (!user) return <div className='text-center mt-36 text-xl'>Please sign in to view your watchlist</div>

  return (
    <div className="w-full mx-auto px-10 py-8 md:py-8">
      <H2ForSection title="Your Watchlist" className='mb-8' />

      {loading ?
        <p className='shimmer-text text-white text-2xl'>Loading watchlist...</p>
      : watchlist.length === 0 ?
        <p className='text-white text-2xl'>No items in watchlist</p>
      :
        <MediaContainer>
          {watchlist.map(item => (
            <MediaCard
              key={item.tmdb_id}
              layoutType='grid'
              isMovie={item.media_type==="movie"}
              tmdbId={item.tmdb_id}
              mediaTitle={item.media_title}
              releaseYear={item.release_year}
              posterPath={item.poster_path}
            />
          ))}
        </MediaContainer>
      }
    </div>
  )
}