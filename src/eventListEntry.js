import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
var axios = require ('axios');

class EventListEntry extends React.Component{
  constructor(props) {
  super(props);
   this.test = this.test.bind(this) ;
  }
  test(){
    this.props.click2(this.props.event);
  }
  render() {
    return(
      <div className ="video-list-entry">
        <li className="list-group-item" onClick={this.test}>
          {this.props.event}
        </li>
      </div>
    )}
}

export default EventListEntry;
