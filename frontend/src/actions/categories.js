import React, { Component } from 'react';
import '../App.css';

function categories() {
    return (
      <div>
        <div className="categories">
            <button className="category">React</button>
            <button className="category">Redux</button>
            <button className="category">Udacity</button>
        </div>
        <div className="all">
            <button className="showAll">Show all</button>
        </div>
      </div>
    )
}


export default categories