import React, { Component } from 'react'
import Modal from 'react-modal'
import config from '../search-config.json';

const fakultasOptions = config.fakultas
const departemenOptions = config.departemen

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

export default class addModal extends Component {

    render() {
        return (
            <div>
                <Modal
                    style={customStyles}
                    isOpen={this.props.isOpen}
                    ariaHideApp={false}
                >
                    <div className="bg-success" style={{margin:"-20px -20px 10px -20px", padding:"20px 20px 10px 25px"}}>
                        <h3 className="text-white"><strong>Add Data</strong></h3>
                    </div>
                    
                    <form className="from-group" id="addForm">
                        <label style={{marginBottom:"0px"}}>Title</label>
                        <input style={{marginTop: "5px"}}name="title" className="form-control" onChange={this.props.onChange} value={this.props.addItem ? (this.props.addItem.title||"") : ""} type="text"></input>
                        <label style={{marginBottom:"0px"}}>Fakultas</label>                        
                        <select className="form-control" name="fakultas" form="addForm" onChange={this.props.onChange}>
                            <option value="" disabled selected>Choose</option>
                            {fakultasOptions.map(el => {
                                return(
                                    <option key={el.value} value={el.value}>{el.label}</option>
                                )
                            })}
                        </select>
                        <label style={{marginBottom:"0px"}}>Departemen</label>
                        <select className="form-control" name="departemen" form="addForm" onChange={this.props.onChange}>
                            <option value="" disabled selected>Choose</option>
                            {departemenOptions[this.props.addItem.fakultas || ""].map(el => {
                                return(
                                    <option key={el.value} value={el.value}>{el.label}</option>
                                )
                            })}
                        </select>
                        <label style={{marginBottom:"0px"}}>URL</label>
                        <input style={{marginTop: "5px"}}name="url" className="form-control" onChange={this.props.onChange} value={this.props.addItem ? (this.props.addItem.url||"") : ""} type="text"></input>
                        <label style={{marginBottom:"0px"}}>Nama File</label>
                        <input style={{marginTop: "5px"}}name="file_name" className="form-control" onChange={this.props.onChange} value={this.props.addItem ? (this.props.addItem.file_name||"") : ""} type="text"></input>
                    </form>
                    <div className="row" style={{marginTop:"10px",textAlign:"center", display:"inline-block", width:"100%"}}>
                        <button onClick={this.props.performAdd} className="btn btn-success col-sm-2">Add</button>
                        <button onClick={this.props.toggleAdd} className="btn btn-danger col-sm-2">Cancel</button>
                    </div>
                </Modal>
            </div>
        )
    }
}
