import React, { Component } from 'react'
import ShowSearchDataAdmin from './showSearchDataAdmin'
import Select from 'react-select'
import '../css/home.css'
import config from '../search-config.json'
import Header from './header'
import withAuthAdmin from './utils/withAuth'
import UpdateModals from './updateModal'
import LoadingModals from './loadingModal'
import AddModals from './addModal'
import ApiService from './utils/ApiCall'

const Api = new ApiService()
const fakultasOptions = config.fakultas
const departemenOptions = config.departemen

class admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      isOkay: false,
      fak: "",
      key: "",
      dep: "",
      update: false,
      updateItem: null,
      addItem: {
        fakultas: "",
        departemen: "",
        url: "",
        file_name: "",
        title: ""
      },
      add: false,
      loading: false,
      loadingText: ""
    };
    this.handleEvent = this.handleEvent.bind(this)
    this.searchData = this.searchData.bind(this)
    this.handleEventFak = this.handleEventFak.bind(this)
    this.handleEventDep = this.handleEventDep.bind(this)
    this.toggleUpdate = this.toggleUpdate.bind(this)
    this.onChangeUpdate = this.onChangeUpdate.bind(this)
  }

  componentDidMount = () => {
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
    this.searchData();
  }

  handleEventFak = async (e) => {
    await this.setState({ fak: e.value });
    this.searchData();
  }

  handleEventDep = async (e) => {
    await this.setState({ dep: e.value });
    this.searchData();
  }

  searchData = async () => {
    var fetchString = 'api/search/?key=' + this.state.key + '&fak=' + this.state.fak + '&dep=' + this.state.dep;

    var res = await fetch(fetchString);
    var data = await res.json();
    if (data) {
      await this.setState({ response: data, isOkay: true });
    }
  }

  // Update Data
  onChangeUpdate = async (e) => {
    e.persist()
    await this.setState(prevState => ({
      updateItem: {
        ...prevState.updateItem,
        [e.target.name]: e.target.value
      }
    }))
  }

  toggleUpdate = async (e) => {
    if(e.file_name) await this.setState({ update: !this.state.update, updateItem: e })
    else await this.setState({ update: !this.state.update })
  }

  performUpdate = async () => {
    if(window.confirm("Sure update data?")){
      await this.setState({ loading : true, loadingText : "Updating...", update : false })
      await Api.updateData(this.state.updateItem)
      await this.setState({ loading : false, loadingText : "" })
    }
  }

  // Add Data
  onChangeAdd = async (e) => {
    e.persist()
    await this.setState(prevState => ({
      addItem: {
        ...prevState.addItem,
        [e.target.name]: e.target.value
      }
    }))
  }

  toggleAdd = async () => {
    await this.setState({ add: !this.state.add })
  }

  performAdd = async () => {
    if(window.confirm("Sure add data?")){
      await this.setState({ loading : true, loadingText : "Adding...", add : false })
      await Api.addData(this.state.addItem)
      await this.setState({ loading : false, loadingText : "" })
    }
  }

  performDelete = async (e) => {
    if (window.confirm("Sure delete data?")){
      await this.setState({ loading : true, loadingText : "Deleting..." })
      await Api.deleteData(e._id) 
      await this.setState({ loading : false, loadingText : "" })
    }
  }

  render() {
    return (
      <div>
        <LoadingModals text={this.state.loadingText} isOpen={this.state.loading}></LoadingModals>
        <UpdateModals performUpdate={this.performUpdate} onChange={this.onChangeUpdate} updateItem={this.state.updateItem} isOpen={this.state.update} toggleUpdate={this.toggleUpdate} />
        <AddModals performAdd={this.performAdd} onChange={this.onChangeAdd} addItem={this.state.addItem} isOpen={this.state.add} toggleAdd={this.toggleAdd} />
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
                <th onClick={this.toggleAdd} colSpan="2" className="text-center"><button className="btn btn-success btn-sm">Add +</button></th>
              </tr>
            </thead>
            <tbody>
              {this.state.isOkay ? <ShowSearchDataAdmin performDelete={this.performDelete} openUpdate={this.toggleUpdate} data={this.state.response} /> : <tr><td colSpan="6" className="text-center">Loading data!</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default withAuthAdmin(admin)