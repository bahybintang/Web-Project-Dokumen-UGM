import React, { Component } from 'react';
import ShowSearchData from './showSearchData';
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

  handleEventPageSize = async (e) => {
    await this.setState({ pageSize: Number(e.value) });
  }

  search = () => {
    if (this.timeout) {
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
    if (this.state.stop) {
      return
    }
    await this.setState({ page: this.state.page + 1, loading: true })
    var fetchString = 'api/search/?key=' + this.state.key + '&fak=' + this.state.fak + '&dep=' + this.state.dep + '&_page=' + this.state.page + '&_page_len=' + this.state.pageSize
    var res = await fetch(fetchString);
    var data = await res.json();

    if (data.length) {
      var tmp = this.state.items
      data.map(element => {
        return (
          tmp.push(element)
        )
      });
      await this.setState({ items: tmp, loading: false })
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

        <div className="tab-bar form-row">
          <div className="md-form col-lg-8 col-md-8 col-sm-8 col-xs-8">
            <input name="key" type="text" id="form1" className="form-control" onChange={this.handleEvent} />
            <label htmlFor="form1" className="mr2 col-form-label-sm">Search</label>
          </div>

          <div className="my-select col-lg-2 col-md-2 col-sm-2 col-xs-2">
            <select name="fak" onChange={this.handleEvent} className="browser-default custom-select">
              <option value="" disabled selected>Fakultas</option>
              {fakultasOptions.map(el => {
                return (
                  <option key={el.value} value={el.value}>{el.label}</option>
                )
              })}
            </select>
          </div>
          
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 ">
          <select name="dep" onChange={this.handleEvent} className="browser-default custom-select">
            <option value="" disabled selected>Departemen</option>
            {departemenOptions[this.state.fak].map(el => {
              return (
                <option key={el.value} value={el.value}>{el.label}</option>
              )
            })}
          </select>
          </div>
        </div>

        {/* Test Select */}
        


        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="thead-light">
              <tr>
                <th className="bg-primary text-white" style={{ width: "10%" }}>Fakultas</th>
                <th className="bg-primary text-white" style={{ width: "40%" }}>Title</th>
                <th className="text-center bg-primary text-white" style={{ width: "10%" }}>File Type</th>
                <th className="text-center bg-primary text-white" style={{ width: "20%" }}>Download</th>
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