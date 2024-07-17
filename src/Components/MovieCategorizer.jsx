import { fetchAndCategorizeMovies } from '../Utils/movieFetch';
import { movieTitles } from '../Constants/index';
import { useEffect, useState } from 'react';

const MovieCategorizer = () => {
    const [categorizedMovie, setCategorizedMovie] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setError(null);
                const categorized = await fetchAndCategorizeMovies(movieTitles);
                setCategorizedMovie(categorized);
                console.log(categorized);
            } catch (error) {
                setError('There was an error fetching movie data');
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='flex flex-wrap'>
            {Object.keys(categorizedMovie).map((genre) => (
                <div key={genre} className='my-4 min-w-full relative'>
                    <h2 className='mb-2 text-red-500 my-4 font-bold text-xl'>
                        Top Rated {genre} Movies
                    </h2>

                    <div className='flex overflow-x-auto items-center space-x-4 movie-categorizer'>
                        {categorizedMovie[genre].map((movie) => (
                            <div
                                key={movie.imdbID}
                                className='flex-shrink-0 shadow-md mx-8 my-4 w-60 min-h-[26rem]'
                            >
                                <img
                                    className='w-full'
                                    src={movie.Poster}
                                    alt={`${movie.Title} poster`}
                                />
                                <h2 className='text-sm font-bold'>
                                    {movie.Title} {movie.Year}
                                </h2>
                                <p className='text-sm'>
                                    Rating: {movie.imdbRating}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieCategorizer;
