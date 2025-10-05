import { MediaContainer } from "@/components/MediaContainer";
import MediaCard from "@/components/MediaCard";
import { fetchFromTmdb } from "@/lib/tmdb";

export default async function Home() {
	let latestMoviesData = []
	let latestTVShowsData = []
	let topMoviesData = []
	let topTVShowsData = []
	
	try {
		const [latestMoviesResponse, latestTvResponse, topMoviesResponse, topTvResponse] = await Promise.all([
			fetchFromTmdb("/movie/now_playing", "homePage"),
			fetchFromTmdb("/tv/on_the_air", "homePage"),
			fetchFromTmdb("/movie/top_rated", "homePage"),
			fetchFromTmdb("/tv/top_rated", "homePage"),
		]);

		// Check responses
		// for (const res of responses) {
		// 	if (!res.ok) {
		// 		throw new Error(`API failed with status ${res.status}`)
		// 	}
		// }

		// const [latestMovies, latestTv, topMovies, topTv] = await Promise.all(
		// 	responses.map(res => res.json())
		// );

		latestMoviesData = latestMoviesResponse.results
		latestTVShowsData = latestTvResponse.results
		topMoviesData = topMoviesResponse.results
		topTVShowsData = topTvResponse.results
	} catch (err) {
		console.error("Error fetching cinema data: ", err)
		throw err // the nearest error.jsx page will be shown
	}

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
			{latestMoviesData.map((item) => (
				<MediaCard key={item.id} item={item} isMovie={true} layoutType="grid" />
			))
			}
		</MediaContainer>

		<MediaContainer title="Latest TV Shows" id="latestTVShows">
			{latestTVShowsData.map((item) => (
				<MediaCard key={item.id} item={item} isMovie={false} layoutType="grid" />
			))
			}
		</MediaContainer>


		<MediaContainer title="Top Rated Movies" id="topMovies" type="horizontal-container">
			{topMoviesData.map((item) => (
				<MediaCard key={item.id} item={item} isMovie={true} layoutType="horizontal" />
			))
			}
		</MediaContainer>

		<MediaContainer title="Top Rated TV Shows" id="topTVShows" type="horizontal-container">
			{topTVShowsData.map((item) => (
				<MediaCard key={item.id} item={item} isMovie={false} layoutType="horizontal" />
			))
			}
		</MediaContainer>
	</main>
	);
}
