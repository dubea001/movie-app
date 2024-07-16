import axios from 'axios'

const fetchMovies = axios.create({
  baseURL: 'http://www.omdbapi.com/',
  timeout: 15000
})

export const fetchMovieDetails = async (title) => {
  try {
    const response = await fetchMovies.get('', {
      params: {
        t: title,
        Plot: 'full',
        apiKey: import.meta.env.VITE_API_KEY,
      },
    })
    return response.data
  } catch (error) {
      console.error('Error fetching movie details', error)
    throw error
  }
}

export default fetchMovies