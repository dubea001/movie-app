import { useState } from 'react';
import { fetchMovieDetails } from '../Utils/axiosFetch';
import { FaSearch } from 'react-icons/fa';

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
            setSearchWord('');
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
            <div className='border border-white rounded-full px-4 py-2 flex gap-2 items-center justify-center'>
                <input
                    type='text'
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    className='focus:outline-0 w-56 bg-transparent placeholder:text-white'
                    placeholder='Search movie and press enter'
                />
                <FaSearch onClick={handleSearch} className='cursor-pointer' />
            </div>
        </div>
    );
};

export default MovieSearch;
