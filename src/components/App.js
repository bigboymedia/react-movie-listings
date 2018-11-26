import React from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../config';
import Grid from './Grid';
import MovieInfo from './MovieInfo';
import LoadMoreBtn from './LoadMoreBtn';
import Spinner from './Spinner';
import Rating from './Rating';
import Genre from './Genre';

class App extends React.Component {
    state = {
        movies: [],
        movieResult: [],
        loading: false,
        currentPage: 0,
        totalPages: 0,
        ratingScore: 3,
        genre: [],
        selectedGenre: []
    }

    componentDidMount(){
        this.setState({loading: true});
        const endpoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`;
        this.fetchItems(endpoint);
        const genreEndpoint = `${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
        this.fetchGenres(genreEndpoint);
    }

    loadMoreItems = () => {
        let endpoint = '';
        this.setState({loading: true});
        endpoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${this.state.currentPage + 1}`;
        this.fetchItems(endpoint);
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            this.setState({
                movies: [...this.state.movies, ...result.results],
                loading: false,
                currentPage: result.page,
                totalPages: result.total_pages
            })
            this.MovieResult();
        })
    }

    fetchGenres = (genreEndpoint) => {
        fetch(genreEndpoint)
        .then(result => result.json())
        .then(result => {
            this.setState({
                genre: [...this.state.genre, ...result.genres]
            })
        })
    }

    MovieResult = (rating, genre) => {
        let movieList = this.state.movies;
        let movieRating, genreSelected, updatedMovieList;
        rating !== undefined ? movieRating = rating : movieRating = this.state.ratingScore;
        genre !== undefined ? genreSelected = genre : genreSelected = this.state.selectedGenre;

        function doTheFilter(){
            function filterByRating(movies) {
                return movies.vote_average >= movieRating;
            }
            function filterByBoth(movies) {
                return (movies.vote_average >= movieRating) && genreSelected.every(v => movies.genre_ids.indexOf(v) >= 0);
            }

            if(genreSelected.length === 0){
                updatedMovieList = movieList.filter(filterByRating);
            } else {
                updatedMovieList = movieList.filter(filterByBoth);
            }

        }
        doTheFilter();
        this.setState({
            movieResult: updatedMovieList,
            ratingScore: movieRating,
            selectedGenre: genreSelected
        })
    }

    ratingUpdate = (newRatingScore) => {
        let newRating = newRatingScore;
        this.setState({
            ratingScore: newRating
        })
        let selectedGenreArray = this.state.selectedGenre;
        this.MovieResult(newRating, selectedGenreArray);
    }

    genreConverter = (genre, genreList) => {
        let txt = '', i;
        genre.forEach(genreName);
        function genreName(value) {
            for (i = 0; i < genreList.length; i++) {
                if(value === genreList[i].id){
                    txt += genreList[i].name + ' ';
                }
            }
        }
        return txt;
    }

    genreUpdate = (newGenre) => {
        let selectedGenreArray = newGenre;
        this.setState({
            selectedGenre: selectedGenreArray
        })
        let ratingScore = this.state.ratingScore;
        this.MovieResult(ratingScore, selectedGenreArray);
    }

    render() {
        return (
            <div className="row movie-wrapper">
                <h1 className="col-12">Movies Now Playing</h1>
                <div className="col-sm-3">
                    <Rating
                        score={this.state.ratingScore}
                        callback={this.ratingUpdate}
                    />
                    <div className="movie-genre">
                        <p className="option-title">Genre</p>
                        {this.state.genre.map( (element, i) => {
                            return (
                                <Genre
                                    key={i}
                                    id={element.id}
                                    genreName={element.name}
                                    genreList={this.state.selectedGenre}
                                    callback={this.genreUpdate}
                                />
                            )
                        })}
                        <p id="genre-selected" className="d-none"></p>
                    </div>
                </div>
                <div className="col-sm-9">
                    <Grid>
                        {this.state.movieResult.map( (element, i) => {
                            return (
                                <MovieInfo
                                    key={i}
                                    image={element.poster_path ? `${IMAGE_BASE_URL}${element.poster_path}` : './images/no_image.jpg' }
                                    movieName={element.title}
                                    movieGenre={this.genreConverter(element.genre_ids, this.state.genre)}
                                />
                            )
                        })}
                    </Grid>
                    {this.state.loading ? <Spinner /> : null}
                    {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ? <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} /> : null }
                </div>
            </div>
        )
    }

}

export default App;
