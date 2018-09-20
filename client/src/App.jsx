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
    return <img className="pic" src={data.url_l} alt={data.title} title={data.title} />
  }
}

export default App;
