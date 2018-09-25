import React, { Component } from 'react';
import apiClient from './services/api-client';
import ImageObserver from './services/ImageObserver';
import './App.css';
import Figure from './components/Figure/Figure';
import Lightbox from './components/Lightbox/Lightbox';

const SCROLL_PERCENTAGE_FETCH = 0.8;

class App extends Component {
  constructor(props) {
    super(props);
    this._imageObserver = new ImageObserver();
    this._galleryElement = React.createRef();
    /**
     * pictures: Array with the pic info from the api.
     * fetching: Boolean flag to know the app status.
     * page: Pagination info.
     * active: Used to show the lightbox when the user clicks in some picture.
     */
    this.state = { pictures: [], fetching: false, page: 1, active: -1 };
  }

  componentDidMount() {
    this.fetchPictures();
    this.observeScroll();
  }

  componentDidUpdate() {
    this.observeImages();
  }

  /**
   * Use the ImageObserver to lazy-load images
   */
  observeImages() {
    const images = this._galleryElement.current.querySelectorAll('img[data-src]');
    this._imageObserver.addImages(images);
  }

  /**
   * Setup an scroll listener to fetch new pictures when the user scrolls the page
   */
  observeScroll() {
    this._galleryElement.current.addEventListener('scroll', () => {
      if (!this.state.fetching && this._galleryElement.current.scrollTop > (SCROLL_PERCENTAGE_FETCH * this._galleryElement.current.scrollHeight)) {
        this.fetchPictures();
      }
    });
  }

  /**
   * Use the ApiClient to get new pictures from the API
   */
  fetchPictures() {
    this.setState({ fetching: true });
    apiClient.getPictures(this.state.page).then(this.onPicturesFetched.bind(this)).catch(this.onPicturesFetchError.bind(this))
  }

  /**
   * Update the state with the new picures, pagination and fetching status
   */
  onPicturesFetched(pictures) {
    const newArray = this.state.pictures.concat(pictures);
    this.setState({ pictures: newArray, fetching: false, page: this.state.page + 1 });
  }

  onPicturesFetchError() {
    this.setState({ fetching: false, error: true });
  }

  render() {
    if (this.state.error) {
      return this.renderError();
    }
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

  renderError() {
    return (
      <section ref={this._galleryElement} className="gallery">
        <h1>Some error happened, try again later :(</h1>
      </section>)
  }

  /**
   * When a figure is clicked its index will be stored in the state as the "active figure".
   * If the "Active figure" was clicked set to -1 (no active figure).
   */
  onFigureClick(index) {
    if (this.state.active === index) {
      return this.setState({ active: -1 });
    }
    return this.setState({ active: index });
  }
}

export default App;
