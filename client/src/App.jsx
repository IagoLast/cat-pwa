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
        {this.state.pictures.map(this.renderPicture)}
        {this.state.fetching ? 'Loading...' : ''}
      </section>
    );
  }


  renderPicture(data, index) {
    return <figure key={index} className="pic">
      <img className="pic__img" src={data.url_s} alt={data.title} title={data.title} />
      <figcaption className="pic__caption">{data.title} by {data.ownername}</figcaption>
    </figure>
  }
}

export default App;
