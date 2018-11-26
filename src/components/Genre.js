import React from 'react';

class Genre extends React.Component {
    state = {
        selectedGenre: this.props.genreList
    }

    genreValues = (event) => {
        let genreVal = Number(event.target.value); 
        let selectedGenre = this.state.selectedGenre;

        if(selectedGenre.includes(genreVal)){
            while (selectedGenre.indexOf(genreVal) !== -1) {
                selectedGenre.splice(selectedGenre.indexOf(genreVal), 1);
            }
            this.setState({selectedGenre: selectedGenre});
            this.props.callback(this.state.selectedGenre);
        } else {
            selectedGenre.push(genreVal);
            this.setState({selectedGenre: selectedGenre});
            this.props.callback(this.state.selectedGenre);
        }
    }

    render(){
        let genreID = 'genre-';
        return (
            <div key={this.props.i} className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id={genreID + this.props.id} value={this.props.id} onClick={this.genreValues} />
                <label className="form-check-label" htmlFor={genreID + this.props.id}>{this.props.genreName}</label>
            </div>
        )
    }
}

export default Genre;
