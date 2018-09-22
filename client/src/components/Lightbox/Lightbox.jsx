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
        <figcaption className="lightbox__caption">
          <p className="date">{this.props.data.datetaken}</p>
          <h1 className="title"> {this.props.data.title ||'Picture'} </h1>
          <h3 className="owner"> @{this.props.data.ownername}</h3>
          <p className="tags">{this.props.data.tags}</p>
        </figcaption>
      </figure>
    </div>
  }
}
