import React, { Component } from 'react';
import ShowSearchData from './showSearchData'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: [],
      isOkay: false
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res, isOkay: true }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('api/get');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  async handleChange(event){
    // this.setState({isOkay: false});
    // fetch('api/search/?key=' + event.target.value)
    //   .then(res => {
    //     //console.log(res);
    //     if(res){ 
    //       this.setState({response: res, isOkay: true});
    //       console.log(this.state.response);
    //     };
    //   }).catch(err => {
    //     console.log(err);
    //   })

    var res = await fetch('api/search/?key=' + event.target.value);
    var data = await res.json();
    if(data){
      this.setState({response : data, isOkay : true});
    }
  }

  render() {
    return (
      <div>
        <input className="search form-control" type="text" placeholder="Search" onChange={this.state.isOkay ? this.handleChange.bind(this) : function(){}}/>
        <div className="table-responsive">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th style={{width:"10%"}}>Fakultas</th>
                <th style={{width:"40%"}}>Title</th>
                <th className="text-center" style={{width:"10%"}}>File Type</th>
                <th className="text-center" style={{width:"20%"}}>Download</th>
              </tr>
            </thead>
            <tbody>
              {this.state.isOkay ? <ShowSearchData data={this.state.response}/> : <tr><td colSpan="4" className="text-center">Loading data!</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;