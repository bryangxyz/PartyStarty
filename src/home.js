import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Redirect} from 'react-router-dom';
import Search from './search';
import SignIn from './signin';
import SignUp from './signup';
import Create from './create';
import Navbar from './navbar';
import EventList from './eventList.js';
import Event from './event'

var axios = require('axios');

class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			events: [],
			currentEvent: null,
		}
		this.componentWillMount = this.componentWillMount.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillMount(){
		axios.get('/getEvents')
		.then(data => {
			console.log('have data',data.data[0])
			this.setState({
				events: data.data
			})
			console.log(this.state.events)
		})
		.catch(error => {
			console.log('ERROR retrieving events')
		})
	}

	handleClick(event) {
			console.log('home', event);
			axios.post('/getEventDetail', {event: event})
				.then(data => {
					this.setState({
						currentEvent: data.data
					});
				})
				.catch(error => {
					console.log('ERROR retrieving Current Event')
				})
			}

	render(){
		return (
			<div>
				<Navbar />
				<div className="container">
					<div className="row">
						<div className="EventList col-2"> 
							<EventList events={this.state.events} click={this.handleClick}/>
						</div>
						<div className="col-10">
							<Event event={this.state.currentEvent} />
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default Home;
