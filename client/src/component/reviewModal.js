import React, { Component } from 'react'
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '20%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default class reviewModal extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: undefined,
            loaded: false
        }
    }

    componentDidUpdate = async () => {
        if(this.props.isOpen && !this.state.loaded){
            var item =  await fetch('api/get/' + this.props.item.item._id, { method: "GET" })
            var jsonItem = await item.json()
            await this.setState({ data : jsonItem, loaded : true })
        }
    }

    componentWillReceiveProps(prevProps, prevState){
        if(prevProps !== this.props){
            this.setState({ data: undefined, loaded: false })
        }
    }

    getOldData = () => {
        if(!!this.state.data){
            return (
                <td>
                    <form className="form-group">
                        <label style={{ marginBottom: "0px" }}>Title</label>
                        <input style={{ marginTop: "5px" }} name="title" className="form-control" value={this.state.data.title} type="text" readOnly></input>
                        <label style={{ marginBottom: "0px" }}>Fakultas</label>
                        <input style={{ marginTop: "5px" }} name="fakultas" className="form-control" value={this.state.data.fakultas} type="text" readOnly></input>
                        <label style={{ marginBottom: "0px" }}>Departemen</label>
                        <input style={{ marginTop: "5px" }} name="departemen" className="form-control" value={this.state.data.departemen} type="text" readOnly></input>
                        <label style={{ marginBottom: "0px" }}>URL</label>
                        <input style={{ marginTop: "5px" }} name="url" className="form-control" value={this.state.data.url} type="text" readOnly></input>
                        <label style={{ marginBottom: "0px" }}>Nama File</label>
                        <input style={{ marginTop: "5px" }} name="file_name" className="form-control" value={this.state.data.file_name} type="text" readOnly></input>
                    </form>
                </td>
            )
        }
        else if(this.state.loaded){
            return(
                <td>Data not found!</td>
            )
        }
        else {
            return ('')
        }
    }

    render() {

    const Header = <thead className="thead-light"><tr><th><strong>New Data</strong></th><th><strong>Old Data</strong></th></tr></thead>

        return (
            <div>
                <Modal
                    style={customStyles}
                    isOpen={this.props.isOpen}
                    ariaHideApp={false}
                >
                    <div className="bg-warning" style={{margin:"-20px -20px 10px -20px", padding:"20px 20px 10px 25px"}}>
                        <h3 className="text-white"><strong>Review</strong></h3>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            {this.props.item.type !== "update" ? '' : Header}
                            <tbody>
                                <tr>
                                    <td>
                                        <form className="form-group">
                                            <label style={{ marginBottom: "0px" }}>Title</label>
                                            <input style={{ marginTop: "5px" }} name="title" className="form-control" value={this.props.item.item ? (this.props.item.item.title || "") : ""} type="text" readOnly></input>
                                            <label style={{ marginBottom: "0px" }}>Fakultas</label>
                                            <input style={{ marginTop: "5px" }} name="fakultas" className="form-control" value={this.props.item.item ? (this.props.item.item.fakultas || "") : ""} type="text" readOnly></input>
                                            <label style={{ marginBottom: "0px" }}>Departemen</label>
                                            <input style={{ marginTop: "5px" }} name="departemen" className="form-control" value={this.props.item.item ? (this.props.item.item.departemen || "") : ""} type="text" readOnly></input>
                                            <label style={{ marginBottom: "0px" }}>URL</label>
                                            <input style={{ marginTop: "5px" }} name="url" className="form-control" value={this.props.item.item ? (this.props.item.item.url || "") : ""} type="text" readOnly></input>
                                            <label style={{ marginBottom: "0px" }}>Nama File</label>
                                            <input style={{ marginTop: "5px" }} name="file_name" className="form-control" value={this.props.item.item ? (this.props.item.item.file_name || "") : ""} type="text" readOnly></input>
                                        </form>
                                    </td>
                                    {!this.state.loaded && this.props.item.type === "update" ? <td><i className="fa fa-spinner fa-spin" /> Loading Data.. </td> : ''}
                                    {this.props.item.type === "update" ? <this.getOldData></this.getOldData> : ''}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ marginTop: "10px", textAlign: "center", display: "inline-block", width: "100%" }}>
                        <button style={{ marginLeft: "20px" }} onClick={this.props.toggleReview} className="btn btn-success col-sm-2">Ok</button>
                    </div>
                </Modal>
            </div>
        )
    }
}
