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

export default class addModal extends Component {

    render() {
        return (
            <div>
                <Modal
                    style={customStyles}
                    isOpen={this.props.isOpen}
                    ariaHideApp={false}
                >
                    <h3 style={{marginBottom:"10px"}}>Add Data</h3>
                    <form className="from-group">
                        <label style={{marginBottom:"0px"}}>Title</label>
                        <input style={{marginTop: "5px"}}name="title" className="form-control" onChange={this.props.onChange} value={this.props.addItem ? (this.props.addItem.title||"") : ""} type="text"></input>
                        <label style={{marginBottom:"0px"}}>Fakultas</label>
                        <input style={{marginTop: "5px"}}name="fakultas" className="form-control" onChange={this.props.onChange} value={this.props.addItem ? (this.props.addItem.fakultas||"") : ""} type="text"></input>
                        <label style={{marginBottom:"0px"}}>Departemen</label>
                        <input style={{marginTop: "5px"}}name="departemen" className="form-control" onChange={this.props.onChange} value={this.props.addItem ? (this.props.addItem.departemen||"") : ""} type="text"></input>
                        <label style={{marginBottom:"0px"}}>URL</label>
                        <input style={{marginTop: "5px"}}name="url" className="form-control" onChange={this.props.onChange} value={this.props.addItem ? (this.props.addItem.url||"") : ""} type="text"></input>
                        <label style={{marginBottom:"0px"}}>Nama File</label>
                        <input style={{marginTop: "5px"}}name="file_name" className="form-control" onChange={this.props.onChange} value={this.props.addItem ? (this.props.addItem.file_name||"") : ""} type="text"></input>
                    </form>
                    <div style={{marginTop:"10px",textAlign:"center", display:"inline-block", width:"100%"}}>
                        <button onClick={this.props.performAdd} className="btn btn-success col-sm-2">Add</button>
                        <button style={{marginLeft: "20px"}}onClick={this.props.toggleAdd} className="btn btn-danger col-sm-2">Cancel</button>
                    </div>
                </Modal>
            </div>
        )
    }
}
