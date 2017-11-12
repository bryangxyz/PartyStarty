import React from 'react';
import ReactDOM from 'react-dom';
var $ = require("jquery");
import MovieQueueList from './movieQueueList';
var axios = require('axios');
import Typeahead from 'typeahead.js';
import Bloodhound from 'typeahead.js';

class Search extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			input: "",
			currentMovie: {title: "A Bug's Life", id: 9487, poster: "/u9qGMRwcPwP0WETxulS5hKUsEum.jpg", overview: "On behalf of \"oppressed bugs everywhere,\" an inventive ant named Flik hires a troupe of warrior bugs to defend his bustling colony from a horde of freeloading grasshoppers led by the evil-minded Hopper.", votes: 6.8},
			movies: []
		}
		this.handleSearch = this.handleSearch.bind(this);
		this.selectMovie = this.selectMovie.bind(this);
		this.handleAddMovieToQueue = this.handleAddMovieToQueue.bind(this);
	}

	// Handles changing inputs in search form
	handleSearch(e){ 
		this.setState({input: e.target.value});
	}

	// Handles picking a movie from suggestions
	selectMovie(movie){
		this.setState({currentMovie: movie});
		console.log(this.state.currentMovie);
	}

	// Resets search form on click
	clearSearch(e){
		e.target.value = ''
	}

	// Adds movie to queue 
	handleAddMovieToQueue() {
		axios.post("/addMovie",{currentMovie: this.state.currentMovie})
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.log(error);
		})
    this.setState({movies: [...this.state.movies, this.state.currentMovie]});
  };

	componentDidMount(){
	//BLOOD HOUND
	var MovieTitles = new Bloodhound({
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  datumTokenizer: function(data){
	  	Bloodhound.tokenizers.whitespace(data.value);
		},
	  remote: {
	  	url: 'https://api.themoviedb.org/3/search/movie?api_key=d048a770f228472a4201b947da86a0a5&query=%QUERY',
	  	wildcard: '%QUERY',
	  	filter: function(movies){
	  		return $.map(movies.results, function(data){
	  			return {
	  				title: data.title,
	  				id: data.id,
	  				poster: data.poster_path,
	  				overview: data.overview,
	  				votes: data.vote_average,
	  				date: data.release_date
	  			}
	  		})
	  	}
	  }	
	})
	MovieTitles.initialize();
		//TYPE AHEAD
	$('.typeahead').typeahead({
	  highlight: true,
	  hint: true
	},
	{
	  name: 'MovieTitles',
	  source: MovieTitles.ttAdapter(),
	  templates: {
	  	suggestion: function(data){
	  		return '<p>' + data.title + '</p>'
	  	}
	  }
	})
	.on('typeahead:selected', function(err, movie) {
		if(err) console.log('ERROR RENDERING MOVIES')
    this.selectMovie(movie);
  	console.log(movie.title);
		$('.typeahead').typeahead('val', movie.title);
  }.bind(this));
	
	}

	//RENDER
	render(){
		return (
			<div className="container searchComp">
			<div className="row">
				<div className="col-10">
						<input onChange={this.handleSearch} onClick={this.clearSearch} className="typeahead searchForm form-control" type="text" placeholder="Search for movies..." />
					<div className="card w-75">
					<div className="card-header">
					    <h3 className="card-title">{this.state.currentMovie.title}</h3>
					  </div>
						<img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${this.state.currentMovie.poster}`} />
						<div className="card-body">
							<div className="card-text">
								<p>{this.state.currentMovie.overview}</p>
								<p>Release Date {this.state.currentMovie.date}</p>
								<p>Average Score {this.state.currentMovie.votes}</p>
							</div>	
						</div>
						<p onClick={this.handleAddMovieToQueue} className="btn btn-secondary w-50 center"> ADD TO QUEUE </p>
						<br></br>
					</div>	
					</div>
				<div className="col-2">
					<MovieQueueList movies={this.state.movies}/>
				</div>
				</div>
			</div>
		)
	}
}

export default Search;
