'use client';
import { HomePageSection } from "@/components/HomePageSection";
import MediaCard from "@/components/MediaCard";
import { useEffect, useState } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import "@/styles/MediaCard.css"


export default function Home() {
	const [isloading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [latestMoviesDataState, setLatestMoviesDataState] = useState([])
	const [topMoviesDataState, setTopMoviesDataState] = useState([])
	const [latestTVShowsDataState, setLatestTVShowsDataState] = useState([])
	const [topTVShowsDataState, setTopTVShowsDataState] = useState([])

	useEffect(() => {
		async function fetchCinemaData() {
			try {
				setError(null)
				setIsLoading(true)
				const responses = await Promise.all([
					fetch("/api/home/movie/now_playing"),
					fetch("/api/home/tv/on_the_air"),
					fetch("/api/home/movie/top_rated"),
					fetch("/api/home/tv/top_rated"),
				]);

				// Check responses
				for (const res of responses) {
					if (!res.ok) {
						throw new Error(`API failed with status ${res.status}`)
					}
				}

				const [latestMovies, latestTv, topMovies, topTv] = await Promise.all(
					responses.map(res => res.json())
				);

				setLatestMoviesDataState(latestMovies.results);
				setLatestTVShowsDataState(latestTv.results);
				setTopMoviesDataState(topMovies.results);
				setTopTVShowsDataState(topTv.results);

			} catch (err) {
				console.error("Error fetching cinema data: ", err)
				setError("Failed to load content due to some error.")
			} finally {
				setIsLoading(false)
			}
		}
		fetchCinemaData()
	}, [])

  return (
  <main className="container max-w-7xl mx-auto px-1 py-8 md:py-8">
		
		<section className="intro-section flex flex-col text-center bg-[#1f2937] rounded-xl py-20 px-8 mb-8" id="intro-section">
			<h1 className="intro-title text-4xl font-bold text-white mb-4">Your One-Stop Website for All Things Cinema</h1>
			<p className="intro-text text-xl text-[#9CA3AF] max-w-3xl mx-auto">
				Explore a vast collection of movies and TV shows,
				from the latest blockbusters to timeless classics.
			</p>
		</section>

		{/* {error &&
			<div className="container max-w-7xl mt-15 mx-auto px-1 py-8 md:py-8">
				<div className="text-center text-red-500 py-20">{error}</div>
			</div>
		} */}

		{error ? <div className="text-center text-red-500 py-10">{error}</div> : null}
		<HomePageSection title="Latest Movies" id="latestMovies">
			{isloading ?
				<LoadingSkeleton count={6} /> : 
				latestMoviesDataState.map((item) => (
					<MediaCard key={item.id} item={item} isMovie={true} layoutType="grid" />
				))
			}
		</HomePageSection>

		<HomePageSection title="Latest TV Shows" id="latestTVShows">
			{isloading ?
				<LoadingSkeleton count={6} /> : 
				latestTVShowsDataState.map((item) => (
					<MediaCard key={item.id} item={item} isMovie={false} layoutType="grid" />
				))
			}
		</HomePageSection>


		<HomePageSection title="Top Rated Movies" id="topMovies" type="horizontal-container">
			{isloading ?
				<LoadingSkeleton count={12}/> :
				topMoviesDataState.map((item) => (
					<MediaCard key={item.id} item={item} isMovie={true} layoutType="horizontal" />
				))
			}
		</HomePageSection>

		<HomePageSection title="Top Rated TV Shows" id="topTVShows" type="horizontal-container">
			{isloading ?
				<LoadingSkeleton count={12}/> :
				topTVShowsDataState.map((item) => (
					<MediaCard key={item.id} item={item} isMovie={false} layoutType="horizontal" />
				))
			}
		</HomePageSection>
	</main>
  );
}
