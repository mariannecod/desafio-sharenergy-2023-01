import React from 'react';

class ApiRandomDog extends React.Component {
  state = {
    data: null,
  };
  
  componentDidMount() {
    fetch("https://random.dog/woof.json?filter=mp4,webm")
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data.url
        });
      });
  }
  render() {
    return (
      <div className="App">

	<img src={this.state.data} alt="Dog" width="300" />
      
      </div>
    );
  }
}


export default ApiRandomDog;

