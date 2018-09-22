import React, { Component } from 'react';
import './lightbox.css';

export default class Lightbox extends Component {
  render() {
    return <div className="lightbox" onClick={this.props.handleClick}>
      <figure className="lightbox__figure">
        <img className="lightbox__img"
          width={this.props.data.width_l}
          height={this.props.data.height_l}
          data-src={this.props.data.url_l}
          alt={this.props.data.title}
          title={this.props.data.title} />
        <div className="lightbox__caption">
          <h1> {this.props.data.title} </h1>
          <h3>{this.props.data.ownername}</h3>
          <p>Date: {this.props.data.datetaken}</p>
          <p>{this.props.data.tags}</p>
        </div>
      </figure>
    </div>
  }
}
