import { MediaContainer } from "@/components/MediaContainer";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-8 py-8 md:py-8">
      <section className="intro-section flex flex-col text-center bg-[#1f2937] rounded-xl py-20 px-8 mb-8" id="intro-section">
        <h1 className="intro-title text-4xl font-bold text-white mb-4">Your One-Stop Website for All Things Cinema</h1>
        <p className="intro-text text-xl text-[#9CA3AF] max-w-3xl mx-auto">
          Explore a vast collection of movies and TV shows,
          from the latest blockbusters to timeless classics.
        </p>
      </section>

      <MediaContainer title="Latest Movies" id="latestMovies">
        <LoadingSkeleton count={6} />
      </MediaContainer>

      <MediaContainer title="Latest TV Shows" id="latestTVShows">
        <LoadingSkeleton count={6} />
      </MediaContainer>

      <MediaContainer title="Top Rated Movies" id="topMovies" type="horizontal-container">
        <LoadingSkeleton count={12} layoutType="horizontal"/>
      </MediaContainer>

      <MediaContainer title="Top Rated TV Shows" id="topTVShows" type="horizontal-container">
        <LoadingSkeleton count={12} layoutType="horizontal"/>
      </MediaContainer>
    </main>
  );
}