import React, { Component } from 'react';
import './figure.css';

export default class Figure extends Component {
  render() {
    return <figure onClick={() => this.props.handleClick(this.props.index)} className="fig" >
      {this.renderImg()}
      {this.renderCaption()}
    </figure>
  }

  renderImg() {
    return <img className="fig__img"
      width={this.props.data.width_s}
      height={this.props.data.height_s}
      data-src={this.props.data.url_s}
      alt={this.props.data.title}
      title={this.props.data.title} />
  }

  renderCaption() {
    return <figcaption className="fig__caption">
      {this.props.data.title} by {this.props.data.ownername}
    </figcaption>
  }
}
