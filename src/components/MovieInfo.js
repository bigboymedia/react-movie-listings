import React from 'react';

const MovieInfo = (props) => {
    return (
        <div className="movie-thumb">
            <img src={props.image} alt="movie poster" />
            <div className="movie-thumb-text">
                <p className="movie-thumb-title">{props.movieName}</p>
                <p className="movie-thumb-genres">{props.movieGenre}</p>
            </div>
        </div>
    )
}

export default MovieInfo;
