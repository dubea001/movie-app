import { useState } from 'react';
import { fetchMovieDetails } from '../Utils/axiosFetch';

const MovieSearch = () => {
    const [movie, setMovie] = useState(null);
    const [searchWord, setSearchWord] = useState('');
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            setError(null);
            const movieData = await fetchMovieDetails(searchWord);
            setMovie(movieData);
            console.log(movieData);
        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                setError('The request took too long - please try again');
                console.error(
                    'The request took too long - please try again',
                    error
                );
            } else {
                setError('An error occured while fetching movie data');
                console.error(
                    'An error occured while fetching movie data',
                    error
                );
            }
        }
    };

    return (
        <div>
            <div className=''>
                <input
                    type='text'
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    className='border border-black'
                />
                <br />
                <button
                    onClick={handleSearch}
                    className='bg-blue-500 text-white px-4 py-2'
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default MovieSearch;
