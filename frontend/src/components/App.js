import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../App.css';
import Posts from './posts'
import Comments from './comments'
import { Route } from 'react-router-dom'

 class App extends Component {
    state = {
      currentParent: '',
    }

    displayComment = (data) => {
      this.setState(() => ({
        currentParent: data,
      }))

    }

   render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => {
            return <Posts 
              displayComment={this.displayComment}
              />
          }}
          />

        <Route path='/comments' render={() => {
            return <Comments 
              currentParent={this.state.currentParent}
            />
          }}/>
      </div>
    );
   }
}

export default connect()(App);





   