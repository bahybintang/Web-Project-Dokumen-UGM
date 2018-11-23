import React, { Component } from 'react';
import ShowSearchData from './showSearchData';
import Select from 'react-select';
import '../css/home.css';
import config from '../search-config.json';
import Header from './header';

const fakultasOptions = config.fakultas;
const departemenOptions = config.departemen;

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      isOkay: false,
      fak: "",
      key: "",
      dep: ""
    };
    this.timeout = 0
    this.handleEvent = this.handleEvent.bind(this)
    this.searchData = this.searchData.bind(this)
    this.handleEventFak = this.handleEventFak.bind(this)
    this.handleEventDep = this.handleEventDep.bind(this)
    this.search = this.search.bind(this)
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

  handleEvent = async (e) => {
    await this.setState({ [e.target.name]: e.target.value });
    this.search();
  }

  handleEventFak = async (e) => {
    await this.setState({ fak: e.value });
    this.searchData();
  }

  handleEventDep = async (e) => {
    await this.setState({ dep: e.value });
    this.searchData();
  }

  search = () => {
    if(this.timeout){
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(this.searchData, 500);
  }

  async searchData() {
    var fetchString = 'api/search/?key=' + this.state.key + '&fak=' + this.state.fak + '&dep=' + this.state.dep;

    var res = await fetch(fetchString);
    var data = await res.json();
    if (data) {
      await this.setState({ response: data, isOkay: true });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <input name="key" className="search form-control col-sm-8" type="text" placeholder="Search" onChange={this.handleEvent} />

        <Select
          placeholder="Fakultas"
          value={this.state.fak.value}
          options={fakultasOptions}
          onChange={this.handleEventFak}
          className="search react-select col-sm-2"
          isSearchable={true}
        />

        <Select
          placeholder="Departemen"
          value={this.state.dep.value}
          options={departemenOptions[this.state.fak]}
          onChange={this.handleEventDep}
          className="search react-select col-sm-2"
          isSearchable={true}
        />

        <div className="table-responsive">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th style={{ width: "10%" }}>Fakultas</th>
                <th style={{ width: "40%" }}>Title</th>
                <th className="text-center" style={{ width: "10%" }}>File Type</th>
                <th className="text-center" style={{ width: "20%" }}>Download</th>
              </tr>
            </thead>
            <tbody>
              {this.state.isOkay ? <ShowSearchData data={this.state.response} /> : <tr><td colSpan="4" className="text-center">Loading data!</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default home;