import React from 'react';
import ReactDOM from 'react-dom';

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      currentPoster: `https://image.tmdb.org/t/p/w500${this.props.currentMovie.poster}`
    }
    // handle adding movies to queue from results display
    this.handleAddMovietoQueue = this.handleAddMovietoQueue.bind(this);
  }
  // buld func to add movie to queue
  handleAddMovietoQueue() {
    this.setState({movies: this.state.movies.push(this.props.currentMovie)});
  };
  componentDidMount(){
  console.log(this.state.currentPoster);
  console.log(this.props.currentMovie.poster);
  }
// render results with add button on page
  render() {
    return (
      <div>
        <div>
          <h3>{this.props.currentMovie.value}</h3>
            <button onClick={this.handleAddMovietoQueue}>Add to queue</button>
            <div>{this.props.tagline}</div>
            <div>{this.props.overview}</div>
            <div>Length: {this.props.runtime}</div>
            <div>Voting: {this.props.vote}</div>
        </div>
      </div>
    );
  }
}


export default SearchResults;
