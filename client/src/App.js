import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    response: []
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('api/get');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div className="App">
        <table>
          <tr>
            <th>Fakultas</th>
            <th>Title</th>
            <th>Download</th>
          </tr>
            {
            this.state.response.map(item => {
              return (
                <tr>
                  <td>{item.fakultas}</td>
                  <td>{item.title}</td>
                  <td><a href={item.url}>download</a></td>
                </tr>)
            })
            }
          </table>
      </div>
    );
  }
}

export default App;