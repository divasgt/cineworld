// Configuration 
export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const BASE_URL = 'https://api.themoviedb.org/3';

// This function should throw on error to let the caller decide how to handle it.
export async function fetchFromTmdb(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.append("api_key", TMDB_API_KEY)

  // Append each param from params
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  
  console.log(`Fetching from: ${endpoint}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  // if (data.results) return data.results;
	return data;
}
