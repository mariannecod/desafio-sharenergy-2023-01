import React from 'react';
import CardPeople from "../../components/Cards/card-people"

class ApiUserRandom extends React.Component {
  state = {
    data: null,
    filter: ""
  };
  componentDidMount() {
    fetch("https://randomuser.me/api/?results=2")
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data.results
        });
      });
  }
  render() {
    return (
      <div className="App">
        <input
          type="search"
          value={this.state.filter}
          onChange={e => {
            this.setState({
              filter: e.target.value
            });
          }}
        />

        {this.state.data &&
          this.state.data
            .filter((user:any)  => user.email.includes(this.state.filter) || user.login.username.includes(this.state.filter) )
            .map((user:any) => (
 <CardPeople key={user.login.uuid} imgsrc={user.picture.large} name={user.name.first +" "+ user.name.last} email={user.email} user={user.login.username} age={user.dob.age}  />

            ))}
      </div>
    );
  }
}


export default ApiUserRandom;

