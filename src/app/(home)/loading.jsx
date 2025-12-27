import { MediaContainer } from "@/components/MediaContainer";
import MediaCardSkeleton from "@/components/MediaCardSkeleton";
import H2ForSection from "@/components/H2ForSection";

export default function Loading() {
  return (
	  <main className="w-full mx-auto px-5 md:px-10 py-8">
      <section className="intro-section flex flex-col text-center rounded-xl py-10 md:py-20 md:px-8 mb-8" id="intro-section">
        <h1 className="intro-title text-2xl md:text-4xl font-bold text-white mb-4">Your One-Stop Website for All Things Cinema</h1>
        <p className="intro-text text-lg md:text-xl text-[#9CA3AF] max-w-3xl mx-auto">
          Explore a vast collection of movies and TV shows,
          from the latest blockbusters to timeless classics.
        </p>
      </section>

      <section className="my-14">
        <H2ForSection title="Latest Movies" />
        <MediaContainer title="Latest Movies" id="latestMovies">
          <MediaCardSkeleton count={6} />
        </MediaContainer>
      </section>

      <section className="my-14">
        <H2ForSection title="Latest TV Shows" />
        <MediaContainer title="Latest TV Shows" id="latestTVShows">
          <MediaCardSkeleton count={6} />
        </MediaContainer>
      </section>

      <section className="my-14">
        <H2ForSection title="Top Rated Movies" />
        <MediaContainer title="Top Rated Movies" id="topMovies" type="horizontal-container">
          <MediaCardSkeleton count={12} layoutType="horizontal" />
        </MediaContainer>
      </section>

      <section className="my-14">
        <H2ForSection title="Top Rated TV Shows" />
        <MediaContainer title="Top Rated TV Shows" id="topTVShows" type="horizontal-container">
          <MediaCardSkeleton count={12} layoutType="horizontal" />
        </MediaContainer>
      </section>
    </main>
  )
}