import React, { Component } from 'react';
import './lightbox.css';

export default class Lightbox extends Component {
  render() {
    return <div className="lightbox" onClick={this.props.handleClick}>
      <div className="lightbox__figure">
        <div className="lightbox__img" style={{ backgroundImage: `url("${this.props.data.url_l ||  this.props.data.url_m}")` }} ></div>
      </div>
      <div className="lightbox__caption">
        <p className="date">{this.props.data.datetaken}</p>
        <h1 className="title"> {this.props.data.title || 'Picture'} </h1>
        <h3 className="owner"> @{this.props.data.ownername}</h3>
        <p className="tags">{this.props.data.tags}</p>
      </div>
    </div>
  }
}
