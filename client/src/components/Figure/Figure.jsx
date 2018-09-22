import React, { Component } from 'react';
import './figure.css';

export default class Figure extends Component {
  render() {
    return <figure onClick={() => this.props.handleClick(this.props.index)} className={this.props.active ? 'fig active' : 'fig'} >
      {this.renderImg()}
      {this.renderCaption()}
    </figure>
  }

  renderImg() {
    return <img className="fig__img"
      width={this.props.data.width_s}
      height={this.props.data.height_s}
      data-src={this.props.active ? this.props.data.url_l : this.props.data.url_s}
      alt={this.props.data.title}
      title={this.props.data.title} />
  }

  renderCaption() {
    if (!this.props.active) {
      return <figcaption className="fig__caption">
        {this.props.data.title} by {this.props.data.ownername}
      </figcaption>
    }
    return <figcaption className="fig__caption">
      <h1> {this.props.data.title} </h1>
      <h3>{this.props.data.ownername}</h3>
      <p>Date: {this.props.data.datetaken}</p>
      <pre>{this.props.data.tags}</pre>
    </figcaption>
  }
}
