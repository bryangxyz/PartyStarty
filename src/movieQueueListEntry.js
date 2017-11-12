import React from 'react';
import ReactDOM from 'react-dom';
var $ = require("jquery");
var axios = require('axios');

class MovieQueueListEntry extends React.Component {
	constructor(props){
		super(props)
		this.state = {
		}
		this.handleUpvote = this.handleUpvote.bind(this);
		this.handleDownvote = this.handleDownvote.bind(this);
	}
	handleUpvote(title){
		console.log('upvoted');
		console.log(title);
		axios.post('/upvote', {title: title})
		.then(function(data){
			console.log(data);
		})
		.catch(function(error){
			console.log(error);
		})
	}
	handleDownvote(){
		console.log('downvoted');
		axios.post('/downvote')
		.then(function(data){
			console.log(data);
		})
		.catch(function(error){
			console.log(error);
		})
	}
	// <SearchResultsDisplay currentMovie={this.state.currentMovie}/>
	render(){
		return (
			<div className="qEntry">
				<ul  className="list-group">	
					<li className="list-group-item">{this.props.movie.title}</li>
					<li className="btn btn-secondary btn-sm list-group-item movie-buttons" onClick={this.handleUpvote}>UPVOTE {this.props.movie.upvotes}</li>
					<li className="btn btn-secondary btn-sm list-group-item movie-buttons" onClick={this.handleDownvote}>DOWNVOTE {this.props.movie.downvotes}</li>
				</ul>
			</div>
		)
	}
}

export default MovieQueueListEntry;
