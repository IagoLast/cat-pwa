import React, { Component } from 'react';
import { timingSafeEqual } from 'crypto';

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
      <React.Fragment>
        {this.state.pictures.map(this.renderPicture)}
      </React.Fragment>
    );
  }


  renderPicture(data) {
    return <img src={data.url_l} alt={data.title} title={data.title} />
  }
}

export default App;
