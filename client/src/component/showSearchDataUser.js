import React, { Component } from 'react';
import UtilService from './utils/util';
import ApiService from './utils/ApiCall';
const Util = new UtilService();
const Api = new ApiService();

class ShowSearchDataUser extends Component {
    constructor() {
        super()
        this.state = {
            updateData: {}
        }
    }

    render() {
        if (this.props.data.length) {
            return (
                this.props.data.map((item) => {
                    return (
                        <tr key={item._id}>
                            <td>{item.fakultas.toUpperCase()}</td>
                            <td>{item.title}</td>
                            <td className="text-center">{Util.iconGenerate(item.file_name.split('.')[item.title.split('.').length])}</td>
                            <td className="text-center"><a href={item.url}><img src={"/assets/images/download.png"} style={{ width: "20px", height: "20px" }} alt="download-button" /></a></td>
                            <td className="text-center"><button type="button" className="btn btn-primary btn-sm" onClick={async() => await this.props.openUpdate(item)}>Req. Update</button></td>
                            <td className="text-center"><button type="button" className="btn btn-danger btn-sm" onClick={() => { if (window.confirm("Want to request delete data?")) Api.requestDeleteData(item) }}>Req. Delete</button></td>
                        </tr>
                    )
                })
            )
        }
        else {
            return (<tr><td colSpan="4" className="text-center">Not Found!</td></tr>)
        }
    }
}

export default ShowSearchDataUser;