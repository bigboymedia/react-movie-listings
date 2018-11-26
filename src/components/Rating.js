import React from 'react';

class Rating extends React.Component {
    state = {
        newScore: 3
    }

    sliderRange = (event) => {
        const slider = document.getElementById("ratingRange");
        const output = document.getElementById("ratingValue");

        this.setState({newScore: event.target.value})
        clearTimeout(this.timeout);

        this.timeout = setTimeout( () => {
            let sliderVal = slider.value;
            output.innerHTML = sliderVal;
            this.props.callback(this.state.newScore);
        }, 250);
    }
    render(){
        return (
            <div className="movie-rating">
                <p className="option-title">Rating</p>
                <input type="range" min="0" max="10" step="0.5" value={this.state.newScore} className="slider" id="ratingRange" onChange={this.sliderRange} />
                <p id="ratingValue">3</p>
            </div>
        )
    }
}

export default Rating;
