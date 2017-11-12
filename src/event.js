import React from 'react';
import ReactDOM from 'react-dom';
import Search from './search';
var axios = require('axios');

class Event extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<div>{this.props.event && this.props.event.eventTitle}</div>
				<div>{this.props.event && this.props.event.eventLocation}</div>
				<div>{this.props.event && this.props.event.eventTime.slice(0,10)}</div>
				<div>{this.props.event && this.props.event.eventDesc}</div>
				<Search />
			</div>
		)
	}
}

export default Event;
