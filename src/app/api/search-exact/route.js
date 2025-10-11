import { BASE_URL, TMDB_API_KEY } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')
  const year = searchParams.get('year')
  const type = searchParams.get('type') // 'movie' or 'tv'

  if (!title || !type) {
    return NextResponse.json(
      { error: 'Query parameters "title" and "type" are required' },
      { status: 400 }
    )
  }

  const endpoint = type === 'movie' ? 'search/movie' : 'search/tv'
  const yearParam = type === 'movie' ? 'year' : 'first_air_date_year'

  // let url = `${BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&language=en-US&page=1`
  // if (year) url += `&${yearParam}=${year}`
  // This is more robust way of attaching search parameters to url, instead of string concatenation above
  const url = new URL(`${BASE_URL}/${endpoint}`)
  url.searchParams.append('api_key', TMDB_API_KEY)
  url.searchParams.append('query', title)
  url.searchParams.append('language', 'en-US')
  url.searchParams.append('page', '1')
  if (year) url.searchParams.append(yearParam, year)

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.results || data.results.length === 0) {
      return NextResponse.json(null)
    }

    // Find a result that closely matches the title and year
    const matchedResult = data.results.find(result => {
      const resultTitle = (result.title || result.name || '').toLowerCase()
      
      // return false early if title not match
      if (resultTitle !== title.toLowerCase()) {
        return false
      }

      // if year is provided, it must also match
      if (year) {
        const resultYear = (result.release_date || result.first_air_date || '').substring(0, 4)
        return resultYear === year
      }

      // Title matches, and no year was provided
      return true
    })

    // Return matched result, or null if no good match was found
    return NextResponse.json(matchedResult || null)
  } catch (error) {
    console.error('Failed to fetch exact search from TMDB:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data from TMDB' },
      { status: 500 }
    )
  }
}

