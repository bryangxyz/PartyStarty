import React from 'react';
import ReactDOM from 'react-dom';
import {Link , Redirect} from 'react-router-dom';
import Navbar from './navbar'
var $ = require('jquery');
var axios = require('axios');

class SignIn extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: "",
			auth: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
		this.handlePasswordInput = this.handlePasswordInput.bind(this);
	}
	// componentWillMount(){
	// 	if(isAuth === true){
	// 		render()
	// 	}
		// if(this.state.auth !== window.isAuth){
		// 	this.setState({auth: isAuth});
		// }
	// }
	handleSubmit(event){
		var that = this;
		console.log(this.state.username, this.state.password);
		axios.post('/signin', {username: this.state.username, password: this.state.password})
		.then((response) => {
			return response;
		})
		.then((response) => {
			console.log("res data ", response.data);
				console.log("auth: ", this.state.auth);
			if(response.data === 'error'){	
			// if (this.refs.myRef) {this.setState({auth:false})}
				window.isAuth = false; 
			} else {
			// 
				window.isAuth = true;
			}
			console.log('isaAuth in promise',isAuth);
			// $('#signin').click();
		})
		// .then((response)=>{
		// 	this.setState({auth:true})
		.catch((error) => {
			console.log(error);
		})
		// this.context.history.push('/home');
	}
	handleUserInput(e){
		this.setState({username: e.target.value});
	}
	handlePasswordInput(e){
		this.setState({password: e.target.value});
	}
// if(window.isAuth){
// 			return (
// 				<Redirect to="/home" />
// 			)
// 			}
	// componentDidMount(){
	// $('body').keypress(function(event) {
 //    if (event.keyCode == 13 || event.which == 13) {
 //        $('signin').trigger('click');
 //        console.log('hello')
 //    }
	// });
	// }

	render(){
		
		return (
			
			<div ref="myRef">
				<Navbar />
				<div  className="signInForm">
				<form className="">
					<h2>Sign In</h2>
					<div className="form-group">
					<input className="form-control userInput" onChange={this.handleUserInput} type="text" placeholder="Username" />
					<input className="form-control passInput" onChange={this.handlePasswordInput} type="password" placeholder="Password" />
					</div>
					<Link to="/home" id="signin" className="btn btn-secondary signIns" onClick={this.handleSubmit}>Sign In</Link>
					<Link to="/signup" className="btn btn-secondary">Sign Up</Link>
				</form>
				</div>
			</div>
		)
	}
}

export default SignIn; 