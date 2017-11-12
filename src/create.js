import React from 'react';
import ReactDOM from 'react-dom';
import Search from './search';
import Navbar from './navbar';
import {Link} from 'react-router-dom';
import Home from './home'
import axios from 'axios';

class Create extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			title: "",
			location: "",
			date: "",
			time: "",
			description: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTitle = this.handleTitle.bind(this);
		this.handleLocation = this.handleLocation.bind(this);
		this.handleDate = this.handleDate.bind(this);
		this.handleTime = this.handleTime.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
	}

	handleSubmit(e){
		axios.post('/create', {
			title: this.state.title,
			location: this.state.location,
			date: this.state.date,
			time: this.state.time,
			description: this.state.description
		})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		})
	}

	handleTitle(e){
		this.setState({title: e.target.value});
	}

	handleLocation(e){
		this.setState({location: e.target.value});
	}

	handleDate(e){
		this.setState({date: e.target.value});
	}

	handleTime(e){
		this.setState({time: e.target.value});
	}

	handleDescription(e){
		this.setState({description: e.target.value});
	}


	render(){
		return (
			<div>
				<Navbar />
				<div className="createpage">
					<h2>Create Event</h2>
				<form >
					<label>Title</label>
					<input onChange={this.handleTitle} className="form-control" type="text" placeholder="Title" />
					<br></br>
					<label>Location</label>
					<input onChange={this.handleLocation} className="form-control" type="text" placeholder="Location"/>
					<br></br>
					<label>Date</label>
					<input onChange={this.handleDate} className="form-control" type="date" id="example"/>
					<br></br>
					<label>Time</label>
					<input onChange={this.handleTime} className="form-control" type="time"/>
					<br></br>
					<label>Description</label>
					<input onChange={this.handleDescription} className="form-control" type="text" placeholder="Description" />
					<br></br>
					<Link to="/" onClick={this.handleSubmit} className="btn btn-secondary btn-lg textarea">Create Event</Link>
				</form>






				</div>
			</div>
		)
	}
}

export default Create;
