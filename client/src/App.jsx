import React, { Component } from 'react';
import apiClient from './services/api-client';
import ImageObserver from './services/ImageObserver';
import './App.css';
import Figure from './components/Figure/Figure';
import Lightbox from './components/Lightbox/Lightbox';

class App extends Component {
  constructor(props) {
    super(props);
    this._imageObserver = new ImageObserver();
    this._galleryElement = React.createRef();
    this.state = { pictures: [], fetching: false, page: 1 };
  }

  componentWillMount() {
    this.fetchPictures();
  }

  componentDidMount() {
    this._galleryElement.current.addEventListener('scroll', () => {
      if (this._galleryElement.current.scrollTop > 0.8 * this._galleryElement.current.scrollHeight && !this.state.fetching) {
        this.fetchPictures();
      }
    });
  }

  componentDidUpdate() {
    const images = document.querySelectorAll('img[data-src]');
    this._imageObserver.addImages(images);
  }

  fetchPictures() {
    this.setState({ fetching: true });
    apiClient.getPictures(this.state.page).then(this._onPicturesFetched.bind(this));
  }

  _onPicturesFetched(pictures) {
    const newArray = this.state.pictures.concat(pictures);
    this.setState({ pictures: newArray, fetching: false, page: this.state.page + 1 });
  }

  render() {
    return (
      <section ref={this._galleryElement} className="gallery">
        {this.state.pictures.map(this.renderFigure.bind(this))}
        {this.renderLoading()}
        {this.renderLightbox()}
      </section>
    );
  }

  renderFigure(data, index) {
    return <Figure handleClick={this.onFigureClick.bind(this)} index={index} key={index} data={data}></Figure>
  }

  renderLoading() {
    return this.state.fetching ? <div className="loader">Loading...</div> : '';
  }

  renderLightbox() {
    if (this.state.active >= 0) {
      return <Lightbox handleClick={() => this.setState({ active: -1 })} data={this.state.pictures[this.state.active]}></Lightbox>;
    }
  }

  onFigureClick(index) {
    if (this.state.active === index) {
      return this.setState({ active: -1 });
    }
    return this.setState({ active: index });
  }
}

export default App;
