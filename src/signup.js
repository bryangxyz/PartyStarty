import React from 'react';
import ReactDOM from 'react-dom';
var axios = require('axios');
import {Link} from 'react-router-dom';
import Navbar from './navbar';

class SignUp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
		this.handlePasswordInput = this.handlePasswordInput.bind(this);
	}

		handleSubmit(event){
		axios.post('/signup', {username: this.state.username, password: this.state.password})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		})
	}

		handleUserInput(e){
		this.setState({username: e.target.value});
	}

	handlePasswordInput(e){
		this.setState({password: e.target.value});
	}

	render(){
		return (
			<div>
				<Navbar />
				<div className="signInForm">
				<form className="">
					<h2>Sign Up</h2>
					<div className="form-group">
						<input className="form-control userInput" onChange={this.handleUserInput} type="text" placeholder="Username" />
						<input className="form-control passInput" onChange={this.handlePasswordInput} type="password" placeholder="Password" />
					</div>
					<Link to="/home" className="btn btn-secondary" onClick={this.handleSubmit}>Sign Up</Link>
				</form>
				</div>
			</div>
		)
	}
}

export default SignUp; 