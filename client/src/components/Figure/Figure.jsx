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
      <div>
        <h3 className="title">
          {this.props.data.title || 'Picture'}
        </h3>
        <p>by</p>
        <p className="owner">
          @{this.props.data.ownername}
        </p>
      </div>
    </figcaption>
  }
}
