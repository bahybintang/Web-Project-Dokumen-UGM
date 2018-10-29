import React, { Component } from 'react';
import ShowSearchDataAdmin from './showSearchDataAdmin';
import Select from 'react-select';
import '../css/home.css';
import config from '../search-config.json';
import Header from './header';

const fakultasOptions = config.fakultas;
const departemenOptions = config.departemen;

class admin extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: [],
      isOkay: false,
      fak: null,
      key: "",
      dep: null
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

  handleEventFak = async(event) => {
    this.state.dep = {value: "", label: "Departemen"};
    await this.setState({fak: event});
    this.searchData();
  }

  handleEventDep = async(event) => {
    await this.setState({dep: event});
    this.searchData();
  }

  async searchData(){
    var fetchString = 'api/search/?key=' + this.state.key + '&fak=' + this.state.fak.value + '&dep=' + this.state.dep.value;

    var res = await fetch(fetchString);
    var data = await res.json();
    if(data){
      await this.setState({response : data, isOkay : true});
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <input className="search form-control col-sm-8" type="text" placeholder="Search" onChange={this.state.isOkay ? this.handleEventKey.bind(this) : function(){}}/>

        <Select 
          placeholder="Fakultas"
          value={this.state.fak}
          options={fakultasOptions}
          onChange={this.handleEventFak}
          className="search react-select col-sm-2"
          isSearchable={true}
        />

        <Select 
          placeholder="Departemen"
          value={this.state.dep}
          options={departemenOptions[this.state.fak !== null ? this.state.fak.value : {}]}
          onChange={this.handleEventDep}
          className="search react-select col-sm-2"
          isSearchable={true}
        />

        <div className="table-responsive">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th style={{width:"10%"}}>Fakultas</th>
                <th style={{width:"40%"}}>Title</th>
                <th className="text-center" style={{width:"10%"}}>File Type</th>
                <th className="text-center" style={{width:"20%"}}>Download</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.isOkay ? <ShowSearchDataAdmin data={this.state.response}/> : <tr><td colSpan="4" className="text-center">Loading data!</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default admin;