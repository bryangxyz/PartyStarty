import React from 'react';
import ReactDOM from 'react-dom';
import MovieQueueListEntry from './movieQueueListEntry';
var $ = require("jquery");
var axios = require('axios');

class MovieQueueList extends React.Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}

	render(){
		return (
			<div className="q">
				<h3>Movie Queue</h3>
				{this.props.movies.map( (movie,i) => {
					return <MovieQueueListEntry movie={movie} key={i} />
				})}
			</div>
		)
	}
}

export default MovieQueueList; 