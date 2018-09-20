import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: 'Loading...' };
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
      <pre>
        {JSON.stringify(this.state.pictures, '\t')}
      </pre>
    );
  }
}

export default App;
