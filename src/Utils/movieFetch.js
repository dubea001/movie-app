import { fetchMovieDetails } from './axiosFetch'

export const fetchAndCategorizeMovies = async (movieTitles) => {

  try {
    const moviePromises = movieTitles.map(title => fetchMovieDetails(title))
    const movies = await Promise.all(moviePromises)

    const categorizeMovies = movies.reduce((acc, movie) => {
      if (movie.Genre) {
        const primaryGenre = movie.Genre.split(',')[0]
          if (!acc[primaryGenre]) {
            acc[primaryGenre] = []
          }
          acc[primaryGenre].push(movie) 
      }
      return acc
    }, {})

    Object.keys(categorizeMovies).forEach((genre) => {
      categorizeMovies[genre].sort((a, b) => {
        const ratingA = parseFloat(a.imdbRating)
        const ratingB = parseFloat(b.imdbRating)

        return ratingB - ratingA
      })
    })

    return categorizeMovies;

  } catch (error) {
    console.error('error fetching movie data', error)
    throw error
  }
}