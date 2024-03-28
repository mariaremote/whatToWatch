import { populateGenreDropdown, getSelectedGenre, displayMovie, getRandomMovie, clearCurrentMovie } from './helper.js';

// LEARN HOW TO EXCLUDE API KEY FROM SCRIPT FILE !!!!!

const tmdbKey = '4aeb889aff82aacf26b0d4eb43d0adcc';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch, { method: 'GET' });
        if (response.ok) {
            const jsonResponse = await response.json();
            // console.log(jsonResponse);
            const genres = jsonResponse.genres;
            // console.log(genres);
            return genres;
        }
    } catch (error) {
        console.log(error);
    }
};

const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = '/discover/movie';
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch, { method: 'GET' });
        if (response.ok) {
            const jsonResponse = await response.json();
            // console.log(jsonResponse);
            const movies = jsonResponse.results;
            console.log(movies);
            return movies;
        }
    } catch (error) {
        console.log(error);
    }
};

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch, { method: 'GET' });
        if (response.ok) {
            const movieInfo = await response.json();
            return movieInfo;
        }
    } catch (error) {
        console.log(error);
    }
};
// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
    const movieInfo = document.getElementById('movieInfo');
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    }
    const movies = await getMovies();
    const randomMovie = await getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);
    displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;

export { showRandomMovie };
