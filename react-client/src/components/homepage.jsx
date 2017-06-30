import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Button from 'react-bootstrap/lib/Button';
import CarouselPage from './Carousel.jsx';
import Search from './Search.jsx';
import SignUp from './signUp.jsx';
import SearchList from './searchList.jsx';
import { Component } from 'react';
// import Login from './components/Login.jsx'
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Mount from './Mount.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Router, Switch, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

class homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsBar: [],
      loaded: false,
      location: 'san francisco'
    }
  }

  // componentDidMount() {
  //   const appKey = 'app_key=CwcF9Lt3qkKh4gWB';

  //   $.ajax({
  //     method: "GET",
  //     url: 'http://api.eventful.com/json/events/search?' + appKey + '&l=san+francisco&date=future',
  //     headers: {
  //       "Access-Control-Allow-Origin": "*"
  //     },
  //     dataType: 'jsonp',
  //     success: (data) => {
  //       this.setState({ eventsBar: data.events.event, loaded: true });

  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //   });
  // }

  changeLocation(location) {
    this.setState({
      location: location
    })
  }

  getEventful(category) {
    $.ajax({
      url: '/eventful',
      data: JSON.stringify({
        location: this.state.location,
        topic: category
      }),
      type: 'POST',
      contentType: 'application/json',

      success: (item) => {
        console.log('ajax was successful at post request from Eventful');
        var data = JSON.parse(item);
        this.setState({
          eventsBar: data.slice(0,10)
        })

        // console.log(this.state.location, this.state.eventsBar);
      },
      error: () => {
        console.log('ajax failed at post request from Eventful');
      }
    })
  }

  render() {
    return (
      <div className = 'pageContainer'>
        <div className='titleContainer'>
          <PageHeader className='title'>Event Planner
            <Button bsSize="small" className='login'>
                <Link to='/login'>Login</Link>
            </Button>
            <Button bsSize="small" className = 'signup'>
                <Link to='/signUP'>Sign Up</Link>
            </Button>
          </PageHeader>
        </div>
        <div>
          <CarouselPage />
        </div>
        <br></br>
        <div>
          <Search eventful={this.getEventful.bind(this)} changeLocation ={this.changeLocation.bind(this)} />
          <SearchList events={this.state.eventsBar} getEvents = {this.getEventful.bind(this)}/>
        </div>
      </div>
    );
  }
}
/* data: {
        location: 'san francisco',
        topic: 'music'
      },
      type: 'GET',
      dataType: 'jsonp',
*/

export default homepage;