// Configuration 
export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const BASE_URL = 'https://api.themoviedb.org/3';

// This function should throw on error to let the caller decide how to handle it.
export async function fetchFromTmdb(endpoint, type) {
  const homePageUrl = `${BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
  const detailsPageUrl = `${BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&append_to_response=videos,release_dates,content_ratings,credits,keywords,similar,recommendations,external_ids,watch/providers`;

	let url = homePageUrl;
	if (type==="homePage") url=homePageUrl
	else if (type==="detailsPage") url=detailsPageUrl

  console.log(`Fetching from: ${endpoint}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  // if (data.results) return data.results;
	return data;
}
