import MovieSearch from './MovieSearch';

const Navbar = () => {
    return (
        <nav className='flex items-center justify-between z-50 sticky top-0 bg-red-500 py-6 px-8'>
            <a href='/'>
                Dubea <span>Movies</span>
            </a>
            <MovieSearch />
        </nav>
    );
};

export default Navbar;
