import React, { Component } from 'react'
import ShowSearchDataUser from './showSearchDataUser'
import Select from 'react-select'
import '../css/home.css'
import config from '../search-config.json'
import Header from './header'
import { withAuthUser } from './utils/withAuth'
import UpdateModals from './updateModal'
import LoadingModals from './loadingModal'
import AddModals from './addModal'
import ApiService from './utils/ApiCall'
import Pagination from './pagination'

const Api = new ApiService()
const fakultasOptions = config.fakultas
const departemenOptions = config.departemen
const pageSizeOptions = config.pageSize

class user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pageItems: [],
      isOkay: false,
      fak: "",
      key: "",
      dep: "",
      update: false,
      updateItem: {},
      addItem: {
        fakultas: "",
        departemen: "",
        url: "",
        file_name: "",
        title: ""
      },
      add: false,
      pageSize: 10
    };
    this.timeout = 0
    this.handleEvent = this.handleEvent.bind(this)
    this.searchData = this.searchData.bind(this)
    this.handleEventFak = this.handleEventFak.bind(this)
    this.handleEventDep = this.handleEventDep.bind(this)
    this.toggleUpdate = this.toggleUpdate.bind(this)
    this.onChangeUpdate = this.onChangeUpdate.bind(this)
  }

  async componentWillMount() {
    await this.searchData()
  }

  handleEvent = async (e) => {
    await this.setState({ [e.target.name]: e.target.value });
    this.search();
  }

  handleEventFak = async (e) => {
    await this.setState({ fak: e.value, dep: "" });
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

  searchData = async () => {
    var fetchString = 'api/search/?key=' + this.state.key + '&fak=' + this.state.fak + '&dep=' + this.state.dep;

    var res = await fetch(fetchString);
    var data = await res.json();
    if (data) {
      await this.setState({ items: data, isOkay: true });
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

  performUpdate = async (e) => {
    e.preventDefault()
    if(window.confirm("Sure update data?")){
      await this.setState({ loading : true, loadingText : "Updating...", update : false })
      await Api.requestUpdateData(this.state.updateItem)
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

  performDelete = async(e) => {
    if(window.confirm("Sure delete data?")){
      await this.setState({ loading : true, loadingText : "Deleting..."})
      await Api.requestDeleteData(e) 
      await this.setState({ loading : false, loadingText : "" })
    }
  }

  performAdd = async (e) => {
    e.preventDefault()
    if(window.confirm("Sure add data?")){
      await this.setState({ loading : true, loadingText : "Adding...", add : false })
      await Api.requestAddData(this.state.addItem)
      await this.setState({ loading : false, loadingText : "" })
    }
  }

  onChangePage = async (pageItem) => {
    await this.setState({ pageItems: pageItem })
  }

  render() {
    return (
      <div>
        <LoadingModals text={this.state.loadingText} isOpen={this.state.loading}></LoadingModals>
        <UpdateModals performUpdate={this.performUpdate} onChange={this.onChangeUpdate} updateItem={this.state.updateItem} isOpen={this.state.update} toggleUpdate={this.toggleUpdate} />
        <AddModals performAdd={this.performAdd} onChange={this.onChangeAdd} addItem={this.state.addItem} isOpen={this.state.add} toggleAdd={this.toggleAdd} />
        <Header />
        <input name="key" className="search form-control col-sm-7" type="text" placeholder="Search" onChange={this.handleEvent} />

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

        <Select
          placeholder="Size"
          value={this.state.pageSize.value}
          options={pageSizeOptions}
          onChange={this.handleEventPageSize}
          className="search react-select col-sm-1"
          isSearchable={true}
        />

        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="thead-light">
              <tr>
                <th className="bg-primary text-white align-baseline" style={{ width: "10%" }}>Fakultas</th>
                <th className="bg-primary text-white align-baseline" style={{ width: "40%" }}>Title</th>
                <th className="text-center bg-primary text-white align-baseline" style={{ width: "10%" }}>File Type</th>
                <th className="text-center bg-primary text-white align-baseline" style={{ width: "20%" }}>Download</th>
                <th onClick={this.toggleAdd} colSpan="2" className="text-center bg-primary text-white align-baseline"><button className="addbutton btn btn-success btn-sm">Req. Add +</button></th>
              </tr>
            </thead>
            <tbody>
              {this.state.isOkay ? <ShowSearchDataUser performDelete={this.performDelete} openUpdate={this.toggleUpdate} data={this.state.pageItems} /> : <tr><td colSpan="6" className="text-center"><i className="fa fa-spinner fa-spin" /> Loading data!</td></tr>}
            </tbody>
          </table>
        </div>

        <Pagination items={this.state.items} onChangePage={this.onChangePage} pageSize={this.state.pageSize}></Pagination>
      </div>
    )
  }
}

export default withAuthUser(user)