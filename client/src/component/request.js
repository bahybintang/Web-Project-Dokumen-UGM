import React, { Component } from 'react'
import ShowRequest from './showRequest'
import Select from 'react-select'
import '../css/home.css'
import config from '../search-config.json'
import Header from './header'
import withAuthAdmin from './utils/withAuth'
import ReviewModals from './reviewModal'
import LoadingModals from './loadingModal'
import ApiService from './utils/ApiCall'

const Api = new ApiService()
const fakultasOptions = config.fakultas
const departemenOptions = config.departemen

class request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      isOkay: false,
      fak: "",
      key: "",
      dep: "",
      review: false,
      item: {
        item: {}
      },
      loading : false,
      loadingText: ""
    };
    this.timeout = 0
    this.handleEvent = this.handleEvent.bind(this)
    this.searchData = this.searchData.bind(this)
    this.handleEventFak = this.handleEventFak.bind(this)
    this.handleEventDep = this.handleEventDep.bind(this)
    this.toggleReview = this.toggleReview.bind(this)
  }

  componentDidMount = () => {
    this.callApi()
      .then(res => this.setState({ response: res, isOkay: true }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('api/request/get');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleEvent = async (e) => {
    await this.setState({ [e.target.name]: e.target.value });
    this.search(e);
  }

  handleEventFak = async (e) => {
    await this.setState({ fak: e.value })
    this.searchData(e)
  }

  handleEventDep = async (e) => {
    await this.setState({ dep: e.value })
    this.searchData(e)
  }

  searchData = async (e) => {
    var fetchString = 'api/request/search/?key=' + this.state.key + '&fak=' + this.state.fak + '&dep=' + this.state.dep;

    var res = await fetch(fetchString);
    var data = await res.json();
    if (data) {
      await this.setState({ response: data, isOkay: true });
    }
  }

  search = () => {
    if(this.timeout){
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(this.searchData, 500);
  }


  toggleReview = async (e) => {
    if (e.item) await this.setState({ review: !this.state.review, item: e })
    else await this.setState({ review: !this.state.review })
  }

  acceptReview = async (e) => {
    if (window.confirm("Sure accept request?")) {
      await this.setState({ loading : true, loadingText : "Loading..." })
      if (e.type === "update") {
        if (await Api.updateData(e.item)) {
          await Api.deleteRequestData(e._id)
        }
      }
      else if (e.type === "delete") {
        if (await Api.deleteData(e.item._id)) {
          await Api.deleteRequestData(e._id)
        }
      }
      else if (e.type === "add") {
        if (await Api.addData(e.item)) {
          await Api.deleteRequestData(e._id)
        }
      }
      await this.setState({ loading : false, loadingText : "" })
    }
  }

  declineRequest = async (e) => {
    if(window.confirm("Sure delete request?")){
      await this.setState({ loading : true, loadingText : "Deleting..." })
      await Api.deleteRequestData(e._id)
      await this.setState({ loading : false, loadingText : "" })
    }
  }

  render() {
    return (
      <div>
        <LoadingModals isOpen={this.state.loading} text={this.state.loadingText}></LoadingModals>
        <ReviewModals item={this.state.item.item} isOpen={this.state.review} toggleReview={this.toggleReview} />
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
                <th className="col-md-auto">Fakultas</th>
                <th className="col-md-auto">Title</th>
                <th className="text-center col-md-auto">User</th>
                <th className="text-center col-md-auto">Date Requested</th>
                <th className="text-center col-md-auto">Time Requested</th>
                <th className="text-center col-md-auto">Request Type</th>
                <th className="col-md-auto"></th>
                <th className="col-md-auto"></th>
                <th className="col-md-auto"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.isOkay ? <ShowRequest declineRequest={this.declineRequest} acceptReview={this.acceptReview} openReview={this.toggleReview} data={this.state.response} /> : <tr><td colSpan="7" className="text-center">Loading data!</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default withAuthAdmin(request)