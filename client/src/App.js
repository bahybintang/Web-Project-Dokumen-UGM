import React, { Component } from 'react';
import ShowSearchData from './showSearchData'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: [],
      isOkay: false,
      filter: "",
      key: ""
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

  handleEventKey = async(event) => {
    await this.setState({key: event.target.value});
    this.searchData();
  }

  handleEventFilter = async(event) => {
    await this.setState({filter: event.target.value});
    this.searchData();
  }

  async searchData(){
    var fetchString = 'api/search/?key=' + this.state.key + '&filter=' + this.state.filter;

    var res = await fetch(fetchString);
    var data = await res.json();
    if(data){
      this.setState({response : data, isOkay : true});
    }
  }

  render() {
    return (
      <div>
        <input className="search search-right form-control col-sm-10" type="text" placeholder="Search" onChange={this.state.isOkay ? this.handleEventKey.bind(this) : function(){}}/>
        <select className="search search-left form-control col-sm-3" onChange={this.state.isOkay ? this.handleEventFilter.bind(this) : function(){}}>
          <option defaultValue="Fakultas" selected disabled hidden>Fakultas</option>
          <option value="">Any</option>
          <option value="mipa">MIPA</option>
          <option value="teknik">Teknik</option>
          <option value="FKKMK">FKKMK</option>
          <option value="Kehutanan">Kehutanan</option>
        </select>
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