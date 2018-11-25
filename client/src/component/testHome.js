import React, { Component } from 'react';
import ShowSearchData from './showSearchData';
import Select from 'react-select';
import '../css/home.css';
import config from '../search-config.json';
import Header from './header';

const fakultasOptions = config.fakultas
const departemenOptions = config.departemen

class testhome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pageItems: [],
      isOkay: false,
      fak: "",
      key: "",
      dep: "",
      page: 1,
      pageSize: 10,
      stop: false,
      loading: false
    };
    this.timeout = 0
    this.handleEvent = this.handleEvent.bind(this)
    this.searchData = this.searchData.bind(this)
    this.handleEventFak = this.handleEventFak.bind(this)
    this.handleEventDep = this.handleEventDep.bind(this)
    this.search = this.search.bind(this)
  }

  async componentWillMount() {
    await this.searchData()
  }

  componentDidMount() {
    document.addEventListener('scroll', this.loadMore);
  }
  
  componentWillUnmount() {
    document.removeEventListener('scroll', this.loadMore);
  }

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

  handleEventPageSize = async (e) => {
    await this.setState({ pageSize: Number(e.value) });
  }

  search = () => {
    if(this.timeout){
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(this.searchData, 500);
  }

  async searchData() {
    await this.setState({ page: 1 })
    var fetchString = 'api/search/?key=' + this.state.key + '&fak=' + this.state.fak + '&dep=' + this.state.dep + '&_page=' + this.state.page + '&_page_len=' + this.state.pageSize;

    var res = await fetch(fetchString);
    var data = await res.json();
    if (data) {
      await this.setState({ items: data, isOkay: true, stop: false });
    }
  }

  loadMore = async () => {
    if(this.state.stop){
        return
    }
    await this.setState({ page : this.state.page + 1, loading: true })
    var fetchString = 'api/search/?key=' + this.state.key + '&fak=' + this.state.fak + '&dep=' + this.state.dep + '&_page=' + this.state.page + '&_page_len=' + this.state.pageSize
    var res = await fetch(fetchString);
    var data = await res.json();

    if(data.length){
        var tmp = this.state.items
        data.map(element => {
            return(
                tmp.push(element)
                )
        });
        await this.setState({ items : tmp, loading: false })
    }
    else {
        await this.setState({ stop: true, loading: false })
    }
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    const Loading = <div className="text-center"><i className="fa fa-spinner fa-spin" />Loading...</div>
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
              {this.state.isOkay ? <ShowSearchData data={this.state.items} /> : <tr><td colSpan="4" className="text-center"><i className="fa fa-spinner fa-spin" /> Loading data!</td></tr>}
            </tbody>
          </table>
        </div>
        {this.state.loading ? Loading : ''}
      </div>
    );
  }
}

export default testhome;