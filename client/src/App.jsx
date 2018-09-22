import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [], fetching: false, page: 1 };
  }

  componentWillMount() {
    this.setState({ fetching: true });
    fetch(`http://localhost:3000/api/v1/pics/${this.state.page}`)
      .then(raw => raw.json())
      .then(pictures => {
        this.setState({ pictures, fetching: false, page: this.state.page + 1 });
      });
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 0.8 * document.body.scrollHeight) {
        this.fetchPictures();
      }
    });
  }

  componentDidUpdate() {
    const images = document.querySelectorAll('img');
    const config = {
      rootMargin: '0px 300px',
      threshold: 0.01
    }

    // The observer for the images on the page
    let observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {
        // Are we in viewport?
        if (entry.intersectionRatio > 0) {

          // Stop watching and load the image
          observer.unobserve(entry.target);
          entry.target.setAttribute('src', entry.target.getAttribute('data-src'));
          console.log(entry);
        }
      });
    }, config);
    images.forEach(image => {
      observer.observe(image);
    });
  }

  fetchPictures() {
    if (this.state.fetching) {
      return;
    }
    this.setState({ fetching: true });
    return fetch(`http://localhost:3000/api/v1/pics/${this.state.page}`)
      .then(raw => raw.json())
      .then(pictures => {
        const newArray = this.state.pictures.concat(pictures);
        this.setState({ pictures: newArray, fetching: false, page: this.state.page + 1 });
      });
  }

  render() {
    return (
      <section className="gallery">
        {this.state.pictures.map(this.renderPicture.bind(this))}
        {this.state.fetching ? 'Loading...' : ''}
      </section>
    );
  }


  renderPicture(data, index) {
    return <figure onClick={() => this.onImageClick(index)} key={index} className={this.state.active === index ? 'pic active' : 'pic'} >
      <img width={data.width_s} height={data.height_s} className="pic__img" data-src={this.state.active === index ? data.url_l : data.url_s} alt={data.title} title={data.title} />
      <figcaption className="pic__caption">
        {this.renderCaption(index, data)}
      </figcaption>
    </figure>
  }

  renderCaption(index, data) {
    if (this.state.active !== index) {
      return `${data.title} by ${data.ownername}`;
    }
    return <React.Fragment>
      <h1> {data.title} </h1>
      <h3>{data.ownername}</h3>
      <p>Date: {data.datetaken}</p>
      <pre>{data.tags}</pre>
    </React.Fragment>
  }

  onImageClick(index) {
    if (this.state.active === index) {
      return this.setState({ active: -1 });
    }
    return this.setState({ active: index });
  }
}

export default App;
