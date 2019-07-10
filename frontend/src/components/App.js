import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../App.css';
import * as api from '../utils/postsAPI'
import Nav from './nav'
import Categories from './categories'
import Posts from './posts'
import Post from './post'

import { fetchPost, displayPost, addPost, removePost, updatePost } from '../actions/posts';

 class App extends Component {

   render() {
    console.log(this.props)
    return (
      <div className="App">
        <Nav />
        <div className="content">
          <div className="categories">
            <button className="category" onClick={this.showPosts}>React</button>
            <button className="category" onClick={this.editPost}>Redux</button>
            <button className="category" onClick={this.removePost}>Udacity</button>
          </div>
          <div className="all">
            <button className="showAll">Show all</button>
          </div>
          <div className="select">
            <select className="select-item">
              <option>Sort By</option>
              <option>Sort By</option>
              <option>Sort By</option>
              <option>Sort By</option>
              <option>Sort By</option>
            </select>
          </div>
          <Posts />
          <Post />
        </div>
      </div>
    );
   }
}

export default connect()(App);
