import React, { Component } from 'react';
import { timingSafeEqual } from 'crypto';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
  }

  componentWillMount() {
    fetch('http://localhost:3000/api/v1/pics')
      .then(raw => raw.json())
      .then(pictures => {
        this.setState({ pictures });
      })
  }

  render() {
    return (
      <section className="gallery">
        {this.state.pictures.map(this.renderPicture)}
      </section>
    );
  }


  renderPicture(data) {
    return <figure class="pic">
      <img className="pic__img" src={data.url_s} alt={data.title} title={data.title} />
      <figcaption className="pic__caption">{data.title} by {data.ownername}</figcaption>
    </figure>
  }
}

export default App;
